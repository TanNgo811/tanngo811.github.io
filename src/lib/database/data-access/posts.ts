import { prisma } from '@/lib/prisma'
import { transliterateVietnamese } from '@/lib/utils'

export async function getPublishedPosts() {
  try {
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
  } catch (error) {
    console.error('Error fetching published posts:', error)
    return []
  }
}

export async function getPostBySlugAndId(slug: string, id: string) {
  try {
    const post = await prisma.posts.findUnique({
      where: { 
        slug: slug,
        id: BigInt(id),
      },
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
      return null
    }

    return post
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export async function getUserPosts(userId: string) {
  try {
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
  } catch (error) {
    console.error('Error fetching user posts:', error)
    return []
  }
}

export async function createPost(postData: {
  title: string
  content: string
  published: boolean
  author_id: string
}) {
  try {
    const slug = transliterateVietnamese(postData.title)
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')

    const post = await prisma.posts.create({
      data: {
        ...postData,
        slug,
      },
    })

    return post
  } catch (error) {
    console.error('Error creating post:', error)
    throw error
  }
}

export async function updatePost(id: string, postData: {
  title?: string
  content?: string
  published?: boolean
}) {
  try {
    const updateData: {
      title?: string
      content?: string
      published?: boolean
      slug?: string
    } = { ...postData }
    
    if (postData.title) {
      updateData.slug = transliterateVietnamese(postData.title)
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
    }

    const post = await prisma.posts.update({
      where: { id: BigInt(id) },
      data: updateData,
    })

    return post
  } catch (error) {
    console.error('Error updating post:', error)
    throw error
  }
}

export async function deletePost(id: string) {
  try {
    await prisma.posts.delete({
      where: { id: BigInt(id) },
    })
    
    return true
  } catch (error) {
    console.error('Error deleting post:', error)
    throw error
  }
}
