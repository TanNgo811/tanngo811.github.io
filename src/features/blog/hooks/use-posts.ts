import { useState, useEffect } from 'react'
import type { PostWithAuthor, PaginatedResponse } from '@/types'

interface UsePosts {
  posts: PostWithAuthor[]
  loading: boolean
  error: string | null
  total: number
  currentPage: number
  totalPages: number
  fetchPosts: (page?: number, limit?: number) => Promise<void>
  createPost: (postData: {
    title: string
    content: string
    published: boolean
  }) => Promise<{ success: boolean; error?: string; post?: object }>
  updatePost: (id: string, postData: {
    title?: string
    content?: string
    published?: boolean
  }) => Promise<{ success: boolean; error?: string }>
  deletePost: (id: string) => Promise<{ success: boolean; error?: string }>
}

export function usePosts(): UsePosts {
  const [posts, setPosts] = useState<PostWithAuthor[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const fetchPosts = async (page = 1, limit = 10) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/posts?page=${page}&limit=${limit}`)
      
      if (response.ok) {
        const data: PaginatedResponse<PostWithAuthor> = await response.json()
        setPosts(data.data || [])
        setTotal(data.total)
        setCurrentPage(data.page)
        setTotalPages(data.totalPages)
      } else {
        setError('Failed to fetch posts')
      }
    } catch (err) {
      setError('An error occurred while fetching posts')
    } finally {
      setLoading(false)
    }
  }

  const createPost = async (postData: {
    title: string
    content: string
    published: boolean
  }) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      })

      if (response.ok) {
        const post = await response.json()
        setPosts(prev => [post, ...prev])
        return { success: true, post }
      } else {
        const { error } = await response.json()
        return { success: false, error }
      }
    } catch (error) {
      return { success: false, error: 'Failed to create post' }
    }
  }

  const updatePost = async (id: string, postData: {
    title?: string
    content?: string
    published?: boolean
  }) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      })

      if (response.ok) {
        const updatedPost = await response.json()
        setPosts(prev => prev.map(post => 
          post.id.toString() === id ? updatedPost : post
        ))
        return { success: true }
      } else {
        const { error } = await response.json()
        return { success: false, error }
      }
    } catch (error) {
      return { success: false, error: 'Failed to update post' }
    }
  }

  const deletePost = async (id: string) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setPosts(prev => prev.filter(post => post.id.toString() !== id))
        return { success: true }
      } else {
        const { error } = await response.json()
        return { success: false, error }
      }
    } catch (error) {
      return { success: false, error: 'Failed to delete post' }
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return {
    posts,
    loading,
    error,
    total,
    currentPage,
    totalPages,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
  }
}
