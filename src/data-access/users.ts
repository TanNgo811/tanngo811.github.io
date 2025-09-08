import { prisma } from '@/lib/prisma'
import type { User } from '@/types'

export async function getUserById(id: string): Promise<User | null> {
  try {
    const user = await prisma.public_users.findUnique({
      where: { id },
    })
    
    return user
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}

export async function createUser(userData: {
  id: string
  email: string
  first_name: string
  last_name: string
}) {
  try {
    const user = await prisma.public_users.create({
      data: userData,
    })
    
    return user
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

export async function updateUser(id: string, userData: Partial<User>) {
  try {
    const user = await prisma.public_users.update({
      where: { id },
      data: userData,
    })
    
    return user
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
}
