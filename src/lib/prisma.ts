import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Modify DATABASE_URL to include connection parameters for serverless environments
const databaseUrl = process.env.DATABASE_URL
const modifiedUrl = databaseUrl ? `${databaseUrl}?pgbouncer=true&connect_timeout=15&prepareThreshold=0` : databaseUrl

export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  datasources: {
    db: {
      url: modifiedUrl,
    },
  },
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Ensure proper cleanup in serverless environments
if (typeof window === 'undefined') {
  // Disconnect on process termination
  process.on('beforeExit', async () => {
    await prisma.$disconnect()
  })

  // Handle uncaught exceptions
  process.on('uncaughtException', async () => {
    await prisma.$disconnect()
    process.exit(1)
  })

  // Handle unhandled promise rejections
  process.on('unhandledRejection', async () => {
    await prisma.$disconnect()
    process.exit(1)
  })
}
