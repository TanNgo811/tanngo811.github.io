import { createServerSupabaseClient } from '@/lib/supabase'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'

async function getUserPosts(userId: string) {
  return await prisma.posts.findMany({
    where: { author_id: userId },
    include: {
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

export default async function Dashboard() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const posts = await getUserPosts(user.id)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard/posts/new"
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
              >
                New Post
              </Link>
              <button
                onClick={async () => {
                  await fetch('/api/auth/logout', { method: 'POST' })
                  window.location.href = '/'
                }}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900">Your Posts</h2>
            <div className="mt-4">
              {posts.length === 0 ? (
                <p className="text-gray-500">No posts yet. Create your first post!</p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="rounded-lg border bg-white p-6 shadow-sm"
                    >
                      <h3 className="text-lg font-medium text-gray-900">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-600">
                        {post.content?.substring(0, 100)}...
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            post.published
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                        <div className="flex space-x-2">
                          <Link
                            href={`/dashboard/posts/${post.id}/edit`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={async () => {
                              if (confirm('Are you sure you want to delete this post?')) {
                                await fetch(`/api/posts/${post.id}`, { method: 'DELETE' })
                                window.location.reload()
                              }
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
