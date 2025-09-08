import { prisma } from '@/lib/prisma'
import { PostGrid } from '@/components/blog/post-grid'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, TrendingUp } from 'lucide-react'

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

async function getTopCategories() {
  const categories = await prisma.categories.findMany({
    include: {
      _count: {
        select: {
          post_categories: true,
        },
      },
    },
    orderBy: {
      post_categories: {
        _count: 'desc',
      },
    },
  })
  
  return categories
}

export default async function BlogPage() {
  const [posts, topCategories] = await Promise.all([
    getPublishedPosts(),
    getTopCategories(),
  ])

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Badge variant="secondary" className="gap-2">
              <TrendingUp className="h-3 w-3" />
              Latest Stories
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover Amazing Stories
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Explore insights, tutorials, and stories from our community of writers. 
            Find content that inspires and educates.
          </p>
          
          {/* Search and Filter (placeholder for future implementation) */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled
              />
            </div>
            <Button variant="outline" disabled className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Categories */}
        {topCategories.length > 0 && (
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular Categories</h2>
            <div className="flex flex-wrap gap-2">
              {topCategories.map((category) => (
                <Badge key={category.id.toString()} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                  {category.name} ({category._count.post_categories})
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Posts Grid */}
        <PostGrid 
          posts={posts} 
          emptyMessage="No posts published yet. Be the first to share your story!"
        />

        {/* Load More (placeholder for future pagination) */}
        {posts.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" disabled>
              Load More Posts
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
