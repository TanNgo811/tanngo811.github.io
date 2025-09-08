import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Calendar, Clock, User } from 'lucide-react'
import type { PostWithAuthor } from '@/types'

interface PostCardProps {
  post: PostWithAuthor
  showExcerpt?: boolean
}

export function PostCard({ post, showExcerpt = true }: PostCardProps) {
  const postUrl = `/blog/${post.slug}-${post.id}`
  const excerpt = showExcerpt ? post.content?.substring(0, 150) + '...' : ''
  
  return (
    <Card className="h-full hover:shadow-lg transition-all duration-200 group">
      <CardHeader className="space-y-4">
        {/* Author and Date */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs">
                {post.users.first_name?.[0]}{post.users.last_name?.[0]}
              </AvatarFallback>
            </Avatar>
            <span>
              {post.users.first_name} {post.users.last_name}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>
              {new Date(post.created_at!).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
        </div>

        {/* Title */}
        <div>
          <Link href={postUrl}>
            <h3 className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>
          </Link>
        </div>

        {/* Categories */}
        {post.post_categories.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {post.post_categories.slice(0, 3).map((pc, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {pc.categories.name}
              </Badge>
            ))}
            {post.post_categories.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{post.post_categories.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Excerpt */}
        {showExcerpt && excerpt && (
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
            {excerpt}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>5 min read</span>
          </div>

          <Link 
            href={postUrl}
            className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
          >
            Read more →
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
