import { prisma } from '@/lib/prisma'

export async function getCategories() {
  try {
    return await prisma.categories.findMany({
      orderBy: {
        name: 'asc',
      },
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export async function getPopularCategories(limit = 10) {
  try {
    return await prisma.categories.findMany({
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
      take: limit,
    })
  } catch (error) {
    console.error('Error fetching popular categories:', error)
    return []
  }
}

export async function createCategory(name: string) {
  try {
    const category = await prisma.categories.create({
      data: { name },
    })
    
    return category
  } catch (error) {
    console.error('Error creating category:', error)
    throw error
  }
}
