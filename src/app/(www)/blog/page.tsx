import { prisma } from '@/lib/prisma'
import Link from 'next/link'

async function getPublishedPosts() {
  return await prisma.posts.findMany({
    where: { published: true },
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
    orderBy: {
      created_at: 'desc',
    },
  })
}

export default async function Blog() {
  const posts = await getPublishedPosts()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Blog</h1>
            <p className="mt-4 text-lg text-gray-600">
              Discover amazing stories and insights
            </p>
          </div>

          <div className="mt-12">
            {posts.length === 0 ? (
              <div className="text-center">
                <p className="text-gray-500">No posts published yet.</p>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="rounded-lg border bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>
                        {post.users.first_name} {post.users.last_name}
                      </span>
                      <span>•</span>
                      <span>
                        {new Date(post.created_at!).toLocaleDateString()}
                      </span>
                    </div>

                    <h2 className="mt-2 text-xl font-semibold text-gray-900">
                      <Link
                        href={`/blog/${post.slug}-${post.id}`}
                        className="hover:text-indigo-600"
                      >
                        {post.title}
                      </Link>
                    </h2>

                    <p className="mt-3 text-gray-600">
                      {post.content?.substring(0, 150)}...
                    </p>

                    <div className="mt-4">
                      <Link
                        href={`/blog/${post.slug}-${post.id}`}
                        className="text-indigo-600 hover:text-indigo-500"
                      >
                        Read more →
                      </Link>
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
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
