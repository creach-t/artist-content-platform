'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Palette, Calendar, BarChart3, Zap, Shield, Globe } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const features = [
  {
    icon: Palette,
    title: 'Création Intuitive',
    description: 'Interface dédiée aux artistes avec prévisualisation en temps réel pour Instagram et Pinterest.',
  },
  {
    icon: Calendar,
    title: 'Planification Intelligente',
    description: 'Programmez vos publications aux moments optimaux avec notre IA de recommandation.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Détaillés',
    description: 'Suivez vos performances et optimisez votre stratégie avec des métriques précises.',
  },
  {
    icon: Zap,
    title: 'Automatisation',
    description: 'Gagnez du temps avec la publication automatique sur plusieurs plateformes.',
  },
  {
    icon: Shield,
    title: 'Sécurisé',
    description: 'Vos données et tokens d\'accès sont chiffrés et protégés selon les standards de sécurité.',
  },
  {
    icon: Globe,
    title: 'Multi-plateformes',
    description: 'Instagram, Pinterest, et bientôt TikTok, YouTube Shorts et plus encore.',
  },
]

const stats = [
  { value: '1500+', label: 'Artistes actifs' },
  { value: '50K+', label: 'Posts publiés' },
  { value: '98%', label: 'Taux de satisfaction' },
  { value: '3x', label: 'Gain de temps moyen' },
]

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-artist-purple-50/30">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Palette className="h-8 w-8 text-artist-purple-600" />
              <span className="text-xl font-bold gradient-text">ArtistPlatform</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-artist-purple-600 transition-colors">
                Fonctionnalités
              </Link>
              <Link href="#pricing" className="text-gray-600 hover:text-artist-purple-600 transition-colors">
                Tarifs
              </Link>
              <Link href="#contact" className="text-gray-600 hover:text-artist-purple-600 transition-colors">
                Contact
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/auth/signin">Connexion</Link>
              </Button>
              <Button variant="gradient" asChild>
                <Link href="/auth/signup">
                  Commencer gratuitement
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Transformez votre{' '}
              <span className="gradient-text">art en contenu viral</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              La première plateforme conçue spécialement pour les artistes. 
              Créez, planifiez et publiez votre contenu sur Instagram et Pinterest 
              avec une simplicité déconcertante.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="xl" variant="gradient" asChild>
                <Link href="/auth/signup">
                  Essayer gratuitement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="xl" variant="outline">
                Voir la démo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-artist-purple-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des outils pensés par et pour les artistes, pour maximiser 
              votre impact sur les réseaux sociaux.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-artist-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-artist-purple-600" />
                    </div>
                    <CardTitle className="text-xl">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-artist-purple-600 to-artist-gold-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Prêt à faire décoller votre art ?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers d'artistes qui ont déjà transformé 
              leur présence sur les réseaux sociaux.
            </p>
            <Button size="xl" variant="secondary" asChild>
              <Link href="/auth/signup">
                Commencer maintenant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Palette className="h-6 w-6 text-artist-purple-400" />
                <span className="text-lg font-bold">ArtistPlatform</span>
              </div>
              <p className="text-gray-400">
                La plateforme qui révolutionne la façon dont les artistes 
                partagent leur travail sur les réseaux sociaux.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Produit</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Fonctionnalités</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Tarifs</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">API</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Guides</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Légal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Confidentialité</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Conditions</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Cookies</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ArtistPlatform. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}