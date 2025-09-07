import { createServerSupabaseClient } from '@/lib/supabase'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { transliterateVietnamese } from '@/lib/utils'

// Helper function to serialize objects with BigInt
function serialize(obj: object): string {
  return JSON.parse(JSON.stringify(obj, (key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  ))
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, content, published } = await request.json()

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    const post = await prisma.posts.create({
      data: {
        title,
        content,
        published: published || false,
        author_id: user.id,
        slug: transliterateVietnamese(title).toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
      },
    })

    return NextResponse.json(serialize(post), { status: 201 })
  } catch (error) {
    console.error('Create post error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published')

    const posts = await prisma.posts.findMany({
      where: published === 'true' ? { published: true } : undefined,
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
      orderBy: {
        created_at: 'desc',
      },
    })

    return NextResponse.json(serialize(posts))
  } catch (error) {
    console.error('Get posts error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}