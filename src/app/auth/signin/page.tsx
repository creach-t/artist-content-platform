'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Palette, ArrowLeft, Github, Mail } from 'lucide-react'
import { toast } from 'sonner'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const router = useRouter()

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn('email', {
        email,
        redirect: false,
      })

      if (result?.error) {
        toast.error('Erreur lors de l\'envoi de l\'email')
      } else {
        setIsEmailSent(true)
        toast.success('Email de connexion envoyé !')
      }
    } catch (error) {
      toast.error('Une erreur est survenue')
    } finally {
      setIsLoading(false)
    }
  }

  const handleProviderSignIn = async (provider: string) => {
    try {
      await signIn(provider, { callbackUrl: '/dashboard' })
    } catch (error) {
      toast.error('Erreur lors de la connexion')
    }
  }

  if (isEmailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-artist-purple-50/30 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-artist-purple-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-artist-purple-600" />
            </div>
            <CardTitle>Vérifiez votre email</CardTitle>
            <CardDescription>
              Nous avons envoyé un lien de connexion à <strong>{email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Cliquez sur le lien dans l'email pour vous connecter. 
              Vous pouvez fermer cette page.
            </p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setIsEmailSent(false)}
            >
              Utiliser une autre adresse
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-artist-purple-50/30 p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-artist-purple-600 transition-colors mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à l'accueil
          </Link>
          
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Palette className="h-8 w-8 text-artist-purple-600" />
            <span className="text-2xl font-bold gradient-text">ArtistPlatform</span>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Connexion
          </h1>
          <p className="text-muted-foreground">
            Accédez à votre espace créatif
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Se connecter</CardTitle>
            <CardDescription>
              Choisissez votre méthode de connexion préférée
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Social Sign In */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleProviderSignIn('google')}
              >
                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continuer avec Google
              </Button>
              
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleProviderSignIn('github')}
              >
                <Github className="h-4 w-4 mr-2" />
                Continuer avec GitHub
              </Button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Ou avec email
                </span>
              </div>
            </div>

            {/* Email Sign In */}
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <Input
                label="Adresse email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              
              <Button
                type="submit"
                className="w-full"
                variant="gradient"
                loading={isLoading}
                disabled={!email}
              >
                Envoyer le lien de connexion
              </Button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Pas encore de compte ? </span>
              <Link
                href="/auth/signup"
                className="text-artist-purple-600 hover:underline font-medium"
              >
                Créer un compte
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          En vous connectant, vous acceptez nos{' '}
          <Link href="/legal/terms" className="hover:underline">
            Conditions d'utilisation
          </Link>{' '}
          et notre{' '}
          <Link href="/legal/privacy" className="hover:underline">
            Politique de confidentialité
          </Link>
          .
        </p>
      </div>
    </div>
  )
}