import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { LandingPage } from '@/components/landing/landing-page'

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  // Si l'utilisateur est connecté, le rediriger vers le dashboard
  if (session) {
    redirect('/dashboard')
  }

  // Sinon, afficher la landing page
  return <LandingPage />
}