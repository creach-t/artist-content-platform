import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Helper functions pour les requêtes courantes
export const db = {
  // User operations
  async getUserWithSettings(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      include: {
        settings: true,
        platforms: true,
        _count: {
          select: {
            posts: true,
          },
        },
      },
    })
  },

  // Post operations
  async getPostsWithPublications(userId: string, limit = 10, offset = 0) {
    return prisma.post.findMany({
      where: { userId },
      include: {
        publications: true,
        _count: {
          select: {
            publications: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    })
  },

  async getScheduledPosts(userId: string) {
    return prisma.post.findMany({
      where: {
        userId,
        status: 'SCHEDULED',
        scheduledFor: {
          gte: new Date(),
        },
      },
      include: {
        publications: true,
      },
      orderBy: { scheduledFor: 'asc' },
    })
  },

  // Analytics operations
  async getUserAnalytics(userId: string, days = 30) {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    return prisma.userAnalytics.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
        },
      },
      orderBy: { date: 'asc' },
    })
  },

  // Platform operations
  async getConnectedPlatforms(userId: string) {
    return prisma.platformConnection.findMany({
      where: { userId, isActive: true },
      orderBy: { createdAt: 'asc' },
    })
  },

  // Content library operations
  async getHashtagGroups(userId: string) {
    return prisma.hashtagGroup.findMany({
      where: { userId },
      orderBy: [{ isDefault: 'desc' }, { name: 'asc' }],
    })
  },

  async getContentTemplates(userId: string) {
    return prisma.contentTemplate.findMany({
      where: { userId },
      orderBy: [{ usageCount: 'desc' }, { name: 'asc' }],
    })
  },

  // Media operations
  async getMediaAssets(userId: string, limit = 20, offset = 0) {
    return prisma.mediaAsset.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    })
  },
}