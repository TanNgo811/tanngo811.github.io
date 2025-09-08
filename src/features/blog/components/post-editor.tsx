'use client'

import { useState } from 'react'
import { Button } from '@/features/ui/components/button'
import { Input } from '@/features/ui/components/input'
import { Label } from '@/features/ui/components/label'
import { Textarea } from '@/features/ui/components/textarea'
import { Switch } from '@/features/ui/components/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/features/ui/components/card'
import { Badge } from '@/features/ui/components/badge'
import { Spinner } from '@/features/ui/components/spinner'
import { X, Plus } from 'lucide-react'
import type { PostForm } from '@/types'

interface PostEditorProps {
  initialData?: Partial<PostForm>
  onSubmit: (data: PostForm) => Promise<{ success: boolean; error?: string }>
  submitLabel?: string
  loading?: boolean
}

export function PostEditor({ 
  initialData = {}, 
  onSubmit, 
  submitLabel = 'Save Post',
  loading = false 
}: PostEditorProps) {
  const [formData, setFormData] = useState<PostForm>({
    title: initialData.title || '',
    content: initialData.content || '',
    published: initialData.published || false,
    categories: initialData.categories || [],
  })
  
  const [newCategory, setNewCategory] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.content.trim()) {
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
    } finally {
      setIsSubmitting(false)
    }
  }

  const addCategory = () => {
    if (newCategory.trim() && !formData.categories.includes(newCategory.trim())) {
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, newCategory.trim()]
      }))
      setNewCategory('')
    }
  }

  const removeCategory = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c !== category)
    }))
  }

  const isDisabled = loading || isSubmitting || !formData.title.trim() || !formData.content.trim()

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Post Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter post title..."
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              disabled={isDisabled}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Write your post content..."
              className="min-h-[300px]"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              disabled={isDisabled}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="published"
              checked={formData.published}
              onCheckedChange={(checked: boolean) => setFormData(prev => ({ ...prev, published: checked }))}
              disabled={isDisabled}
            />
            <Label htmlFor="published">Publish immediately</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Add a category..."
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCategory())}
              disabled={isDisabled}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={addCategory}
              disabled={isDisabled || !newCategory.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {formData.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.categories.map((category) => (
                <Badge key={category} variant="secondary" className="gap-1">
                  {category}
                  <button
                    type="button"
                    onClick={() => removeCategory(category)}
                    className="hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5"
                    disabled={isDisabled}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2">
        <Button
          type="submit"
          disabled={isDisabled}
          className="gap-2"
        >
          {isSubmitting && <Spinner size="sm" />}
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
