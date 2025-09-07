import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'

async function getPost(id: string) {
  const post = await prisma.posts.findUnique({
    where: { id: BigInt(id) },
    include: {
      users: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
      post_categories: {
        include: {
          categories: true,
        },
      },
    },
  })

  if (!post || !post.published) {
    notFound()
  }

  return post
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await getPost(id)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="py-10">
          <Link
            href="/blog"
            className="text-indigo-600 hover:text-indigo-500"
          >
            ← Back to Blog
          </Link>

          <article className="mt-8">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900">{post.title}</h1>

              <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
                <span>
                  By {post.users.first_name} {post.users.last_name}
                </span>
                <span>•</span>
                <span>
                  {new Date(post.created_at!).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>

              {post.post_categories.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.post_categories.map((pc) => (
                    <span
                      key={pc.category_id}
                      className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800"
                    >
                      {pc.categories.name}
                    </span>
                  ))}
                </div>
              )}
            </header>

            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap text-gray-700">
                {post.content}
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const posts = await prisma.posts.findMany({
    where: { published: true },
    select: { id: true },
  })

  return posts.map((post) => ({
    id: post.id.toString(),
  }))
}
