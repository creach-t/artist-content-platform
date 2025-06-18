import { PrismaClient, Platform, PostStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create demo user
  const demoUser = await prisma.user.upsert({
    where: { email: 'artist@demo.com' },
    update: {},
    create: {
      email: 'artist@demo.com',
      name: 'Demo Artist',
      username: 'demo_artist',
      bio: 'Digital artist passionate about creating beautiful content for social media',
      website: 'https://demo-artist.com',
      location: 'Paris, France',
    },
  })

  console.log('✅ Demo user created:', demoUser.name)

  // Create user settings
  await prisma.userSettings.upsert({
    where: { userId: demoUser.id },
    update: {},
    create: {
      userId: demoUser.id,
      defaultHashtags: ['#art', '#digitalart', '#artist', '#creative'],
      autoSchedule: true,
      preferredPostTimes: {
        monday: ['09:00', '17:00'],
        tuesday: ['09:00', '17:00'],
        wednesday: ['09:00', '17:00'],
        thursday: ['09:00', '17:00'],
        friday: ['09:00', '17:00'],
        saturday: ['10:00', '15:00'],
        sunday: ['10:00', '15:00'],
      },
      timezone: 'Europe/Paris',
      emailNotifications: true,
      pushNotifications: true,
      weeklyReports: true,
      defaultImageQuality: 'high',
      watermarkEnabled: false,
    },
  })

  // Create hashtag groups
  const hashtagGroups = [
    {
      name: 'Art Général',
      hashtags: ['#art', '#digitalart', '#artist', '#artwork', '#creative', '#design'],
      description: 'Hashtags généraux pour les œuvres artistiques',
      category: 'art',
      isDefault: true,
    },
    {
      name: 'Photographie',
      hashtags: ['#photography', '#photo', '#photographer', '#photooftheday', '#capture', '#moment'],
      description: 'Hashtags pour les publications photo',
      category: 'photography',
      isDefault: false,
    },
    {
      name: 'Digital & Tech',
      hashtags: ['#digitalart', '#3d', '#cgi', '#procreate', '#photoshop', '#digitalpainting'],
      description: 'Hashtags pour l\\'art numérique',
      category: 'digital',
      isDefault: false,
    },
  ]

  for (const group of hashtagGroups) {
    await prisma.hashtagGroup.upsert({
      where: { 
        userId_name: {
          userId: demoUser.id,
          name: group.name
        }
      },
      update: {},
      create: {
        userId: demoUser.id,
        ...group,
      },
    })
  }

  console.log('✅ Hashtag groups created')

  // Create content templates
  const templates = [
    {
      name: 'Nouvelle Œuvre',
      content: 'Nouvelle création ! 🎨\\n\\nQu\\'en pensez-vous ? \\n\\n#art #artist #creative',
      hashtags: ['#art', '#artist', '#creative', '#artwork'],
      category: 'art',
      platforms: [Platform.INSTAGRAM, Platform.PINTEREST],
    },
    {
      name: 'Work in Progress',
      content: 'Work in progress... 👨‍🎨\\n\\nEn cours de création !\\n\\n#wip #behindthescenes',
      hashtags: ['#wip', '#workinprogress', '#behindthescenes', '#process'],
      category: 'process',
      platforms: [Platform.INSTAGRAM],
    },
    {
      name: 'Tutorial',
      content: 'Petit tutoriel du jour ! 📚\\n\\nJ\\'espère que ça vous aidera !\\n\\n#tutorial #tips',
      hashtags: ['#tutorial', '#tips', '#howto', '#learn', '#art'],
      category: 'tutorial',
      platforms: [Platform.INSTAGRAM, Platform.PINTEREST],
    },
  ]

  for (const template of templates) {
    await prisma.contentTemplate.create({
      data: {
        userId: demoUser.id,
        ...template,
      },
    })
  }

  console.log('✅ Content templates created')

  // Create some demo posts
  const demoPosts = [
    {
      title: 'Paysage Digital Futuriste',
      content: 'Nouvelle création inspirée par la science-fiction ! 🚀\\n\\nQu\\'en pensez-vous ?',
      hashtags: ['#digitalart', '#scifi', '#futuristic', '#landscape', '#art'],
      mediaUrls: ['/demo/landscape-1.jpg'],
      status: PostStatus.PUBLISHED,
      category: 'digital',
      tags: ['landscape', 'sci-fi', 'digital'],
    },
    {
      title: 'Portrait Stylisé',
      content: 'Nouveau portrait avec une technique mixte ! 🎭',
      hashtags: ['#portrait', '#art', '#digitalart', '#character'],
      mediaUrls: ['/demo/portrait-1.jpg'],
      status: PostStatus.DRAFT,
      category: 'portrait',
      tags: ['portrait', 'character', 'digital'],
    },
    {
      title: 'Abstract Composition',
      content: 'Exploration de formes abstraites et de couleurs vives ! 🌈',
      hashtags: ['#abstract', '#colorful', '#art', '#composition'],
      mediaUrls: ['/demo/abstract-1.jpg'],
      status: PostStatus.SCHEDULED,
      scheduledFor: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      category: 'abstract',
      tags: ['abstract', 'colorful', 'experimental'],
    },
  ]

  for (const post of demoPosts) {
    await prisma.post.create({
      data: {
        userId: demoUser.id,
        ...post,
      },
    })
  }

  console.log('✅ Demo posts created')

  // Create some analytics data
  const today = new Date()
  const platforms = [Platform.INSTAGRAM, Platform.PINTEREST]
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    for (const platform of platforms) {
      await prisma.userAnalytics.create({
        data: {
          userId: demoUser.id,
          date: date,
          platform: platform,
          postsPublished: Math.floor(Math.random() * 3),
          totalLikes: Math.floor(Math.random() * 100) + 10,
          totalComments: Math.floor(Math.random() * 20) + 1,
          totalShares: Math.floor(Math.random() * 10),
          totalViews: Math.floor(Math.random() * 500) + 50,
          followersGained: Math.floor(Math.random() * 5),
          followersLost: Math.floor(Math.random() * 2),
          engagementRate: (Math.random() * 10) + 2, // 2-12%
        },
      })
    }
  }

  console.log('✅ Analytics data created')

  console.log('🎉 Database seed completed!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })