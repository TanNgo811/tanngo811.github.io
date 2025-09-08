import { createServerSupabaseClient } from '@/lib/supabase'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Edit, 
  Eye, 
  Calendar, 
  FileText,
  BarChart3
} from 'lucide-react'
import DeleteButton from '@/components/ui/delete-button'

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

async function getUserStats(userId: string) {
  const [totalPosts, publishedPosts, draftPosts] = await Promise.all([
    prisma.posts.count({
      where: { author_id: userId },
    }),
    prisma.posts.count({
      where: { author_id: userId, published: true },
    }),
    prisma.posts.count({
      where: { author_id: userId, published: false },
    }),
  ])

  return {
    totalPosts,
    publishedPosts,
    draftPosts,
    views: 0, // Placeholder for future implementation
  }
}

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const [posts, stats] = await Promise.all([
    getUserPosts(user.id),
    getUserStats(user.id),
  ])

  const statCards = [
    {
      title: 'Total Posts',
      value: stats.totalPosts,
      icon: FileText,
      description: 'All your blog posts',
    },
    {
      title: 'Published',
      value: stats.publishedPosts,
      icon: Eye,
      description: 'Live on your blog',
    },
    {
      title: 'Drafts',
      value: stats.draftPosts,
      icon: Edit,
      description: 'Work in progress',
    },
    {
      title: 'Total Views',
      value: stats.views,
      icon: BarChart3,
      description: 'Coming soon',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome back! Here&apos;s what&apos;s happening with your blog.
            </p>
          </div>
          <Link href="/dashboard/posts/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Post
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your Posts</CardTitle>
                <CardDescription>
                  Manage and track your blog posts
                </CardDescription>
              </div>
              {posts.length > 0 && (
                <Link href="/dashboard/posts">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No posts yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Get started by creating your first blog post.
                </p>
                <Link href="/dashboard/posts/new">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Post
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.slice(0, 5).map((post) => (
                  <div
                    key={post.id.toString()}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {post.title}
                        </h3>
                        <Badge
                          variant={post.published ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {post.published ? 'Published' : 'Draft'}
                        </Badge>
                      </div>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(post.created_at!).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                        {post.post_categories.length > 0 && (
                          <>
                            <span className="mx-2">•</span>
                            <span>
                              {post.post_categories.length} {post.post_categories.length === 1 ? 'category' : 'categories'}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {post.published && (
                        <Link href={`/blog/${post.slug}-${post.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                      <Link href={`/dashboard/posts/${post.id}/edit`}>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <DeleteButton postId={post.id.toString()} />
                    </div>
                  </div>
                ))}
                
                {posts.length > 5 && (
                  <div className="text-center pt-4 border-t">
                    <Link href="/dashboard/posts">
                      <Button variant="outline">
                        View All {posts.length} Posts
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
