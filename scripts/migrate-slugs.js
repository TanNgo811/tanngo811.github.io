// migrate new column slug in table Posts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.posts.findMany();

  for (const post of posts) {
    const slug = post.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    await prisma.posts.update({
      where: { id: post.id },
      data: { slug },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });   

  