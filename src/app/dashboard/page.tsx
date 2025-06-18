import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { DashboardOverview } from '@/components/dashboard/dashboard-overview'
import { db } from '@/lib/database'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  // Récupérer les données du dashboard
  const [user, recentPosts, scheduledPosts, analytics] = await Promise.all([
    db.getUserWithSettings(session.user.id),
    db.getPostsWithPublications(session.user.id, 5),
    db.getScheduledPosts(session.user.id),
    db.getUserAnalytics(session.user.id, 7),
  ])

  if (!user) {
    redirect('/auth/signin')
  }

  return (
    <DashboardLayout user={user}>
      <DashboardOverview
        user={user}
        recentPosts={recentPosts}
        scheduledPosts={scheduledPosts}
        analytics={analytics}
      />
    </DashboardLayout>
  )
}