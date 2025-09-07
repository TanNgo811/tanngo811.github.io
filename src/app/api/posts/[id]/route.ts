import { createServerSupabaseClient } from '@/lib/supabase'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { transliterateVietnamese } from '@/lib/utils'

// Helper function to serialize objects with BigInt
function serialize(obj: any): any {
  return JSON.parse(JSON.stringify(obj, (key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  ))
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const post = await prisma.posts.findUnique({
      where: { id: BigInt(id) },
      include: {
        post_categories: {
          include: {
            categories: true,
          },
        },
        users: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
          },
        },
      },
    })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json(serialize(post))
  } catch (error) {
    console.error('Get post error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const { title, content, published } = await request.json()

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    // Check if post exists and belongs to user
    const existingPost = await prisma.posts.findUnique({
      where: { id: BigInt(id) },
    })

    if (!existingPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    if (existingPost.author_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const post = await prisma.posts.update({
      where: { id: BigInt(id) },
      data: {
        title,
        content,
        published,
        slug: transliterateVietnamese(title).toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
        updated_at: new Date(),
      },
    })

    return NextResponse.json(serialize(post))
  } catch (error) {
    console.error('Update post error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    // Check if post exists and belongs to user
    const existingPost = await prisma.posts.findUnique({
      where: { id: BigInt(id) },
    })

    if (!existingPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    if (existingPost.author_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await prisma.posts.delete({
      where: { id: BigInt(id) },
    })

    return NextResponse.json({ message: 'Post deleted successfully' })
  } catch (error) {
    console.error('Delete post error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}