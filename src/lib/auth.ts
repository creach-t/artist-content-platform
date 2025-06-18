import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/database'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import EmailProvider from 'next-auth/providers/email'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
      }
      return session
    },
    async signIn({ user, account, profile }) {
      // Vérifier si l'utilisateur existe déjà
      if (account?.provider === 'google' || account?.provider === 'github') {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        })

        // Si l'utilisateur n'existe pas, créer ses paramètres par défaut
        if (!existingUser && user.email) {
          // L'utilisateur sera créé par l'adapter Prisma
          // On créera les paramètres par défaut après la première connexion
        }
      }
      return true
    },
  },
  events: {
    async createUser({ user }) {
      // Créer les paramètres par défaut pour le nouvel utilisateur
      await prisma.userSettings.create({
        data: {
          userId: user.id,
          defaultHashtags: ['#art', '#artist', '#creative'],
          autoSchedule: false,
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

      // Créer les groupes de hashtags par défaut
      await prisma.hashtagGroup.create({
        data: {
          userId: user.id,
          name: 'Art Général',
          hashtags: ['#art', '#artist', '#creative', '#artwork', '#design'],
          description: 'Hashtags généraux pour vos créations artistiques',
          category: 'art',
          isDefault: true,
        },
      })
    },
  },
  debug: process.env.NODE_ENV === 'development',
}