import { PostCard } from './post-card'
import { Spinner } from '@/features/ui/components/spinner'
import type { PostWithAuthor } from '@/types'

interface PostGridProps {
  posts: PostWithAuthor[]
  loading?: boolean
  emptyMessage?: string
}

export function PostGrid({ 
  posts, 
  loading = false, 
  emptyMessage = "No posts found." 
}: PostGridProps) {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="text-center space-y-4">
          <Spinner size="lg" />
          <p className="text-muted-foreground">Loading posts...</p>
        </div>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id.toString()} post={post} />
      ))}
    </div>
  )
}
