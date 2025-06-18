'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Calendar, 
  TrendingUp, 
  Users, 
  Eye,
  Heart,
  MessageCircle,
  Share,
  Clock,
  Zap
} from 'lucide-react'
import Link from 'next/link'
import { formatRelativeTime, formatDate } from '@/lib/utils'
import { UserWithSettings, PostWithPublications } from '@/types'
import { UserAnalytics, Platform } from '@prisma/client'

interface DashboardOverviewProps {
  user: UserWithSettings
  recentPosts: PostWithPublications[]
  scheduledPosts: PostWithPublications[]
  analytics: UserAnalytics[]
}

const platformColors = {
  INSTAGRAM: 'bg-gradient-to-r from-purple-500 to-pink-500',
  PINTEREST: 'bg-red-600',
  TIKTOK: 'bg-black',
  YOUTUBE_SHORTS: 'bg-red-600',
  TWITTER: 'bg-blue-500',
  LINKEDIN: 'bg-blue-700',
  BEHANCE: 'bg-blue-600',
}

export function DashboardOverview({ 
  user, 
  recentPosts, 
  scheduledPosts, 
  analytics 
}: DashboardOverviewProps) {
  // Calculer les statistiques
  const totalPosts = user._count.posts
  const connectedPlatforms = user.platforms.filter(p => p.isActive).length
  const totalScheduled = scheduledPosts.length
  
  // Analytics des 7 derniers jours
  const weeklyMetrics = analytics.reduce((acc, day) => {
    acc.likes += day.totalLikes
    acc.comments += day.totalComments
    acc.views += day.totalViews
    acc.posts += day.postsPublished
    return acc
  }, { likes: 0, comments: 0, views: 0, posts: 0 })

  const avgEngagement = analytics.length > 0 
    ? analytics.reduce((acc, day) => acc + day.engagementRate, 0) / analytics.length
    : 0

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Bonjour, {user.name || 'Artiste'} ! 👋
          </h1>
          <p className="text-gray-600">
            Voici un aperçu de votre activité créative
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0">
          <Button asChild>
            <Link href="/dashboard/create">
              <Plus className="h-4 w-4 mr-2" />
              Créer un post
            </Link>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Posts créés</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPosts}</div>
            <p className="text-xs text-muted-foreground">
              +{weeklyMetrics.posts} cette semaine
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Plateformes</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{connectedPlatforms}</div>
            <p className="text-xs text-muted-foreground">
              connectées et actives
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Programmés</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalScheduled}</div>
            <p className="text-xs text-muted-foreground">
              posts en attente
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgEngagement.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              taux moyen 7 jours
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Posts récents</CardTitle>
            <CardDescription>
              Vos dernières créations publiées
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentPosts.length > 0 ? (
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.id} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0">
                      {post.mediaUrls[0] && (
                        <img
                          src={post.mediaUrls[0]}
                          alt={post.title}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {post.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatRelativeTime(post.createdAt)}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {post.status}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {post._count.publications} plateformes
                      </span>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/posts">
                    Voir tous les posts
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500 mb-4">Aucun post créé pour le moment</p>
                <Button asChild>
                  <Link href="/dashboard/create">
                    <Plus className="h-4 w-4 mr-2" />
                    Créer votre premier post
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Scheduled Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Prochaines publications</CardTitle>
            <CardDescription>
              Posts programmés à venir
            </CardDescription>
          </CardHeader>
          <CardContent>
            {scheduledPosts.length > 0 ? (
              <div className="space-y-4">
                {scheduledPosts.slice(0, 5).map((post) => (
                  <div key={post.id} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0">
                      {post.mediaUrls[0] && (
                        <img
                          src={post.mediaUrls[0]}
                          alt={post.title}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {post.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {post.scheduledFor && formatDate(post.scheduledFor)}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      {post.publications.map((pub) => (
                        <div
                          key={pub.platform}
                          className={`w-4 h-4 rounded-full ${platformColors[pub.platform] || 'bg-gray-400'}`}
                          title={pub.platform}
                        />
                      ))}
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/scheduler">
                    <Calendar className="h-4 w-4 mr-2" />
                    Voir le planificateur
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="text-center py-6">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">Aucune publication programmée</p>
                <Button variant="outline" asChild>
                  <Link href="/dashboard/scheduler">
                    Programmer un post
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Weekly Analytics */}
      {analytics.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Performance de la semaine</CardTitle>
            <CardDescription>
              Vos métriques des 7 derniers jours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Heart className="h-5 w-5 text-red-500 mr-2" />
                  <span className="text-2xl font-bold">{weeklyMetrics.likes}</span>
                </div>
                <p className="text-sm text-gray-600">J'aime</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <MessageCircle className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-2xl font-bold">{weeklyMetrics.comments}</span>
                </div>
                <p className="text-sm text-gray-600">Commentaires</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Eye className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-2xl font-bold">{weeklyMetrics.views}</span>
                </div>
                <p className="text-sm text-gray-600">Vues</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-5 w-5 text-artist-purple-500 mr-2" />
                  <span className="text-2xl font-bold">{avgEngagement.toFixed(1)}%</span>
                </div>
                <p className="text-sm text-gray-600">Engagement</p>
              </div>
            </div>
            
            <div className="mt-4">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/analytics">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Voir les analytics détaillés
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Platform Connections */}
      <Card>
        <CardHeader>
          <CardTitle>Plateformes connectées</CardTitle>
          <CardDescription>
            Gérez vos connexions aux réseaux sociaux
          </CardDescription>
        </CardHeader>
        <CardContent>
          {user.platforms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.platforms.map((platform) => (
                <div
                  key={platform.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full ${platformColors[platform.platform] || 'bg-gray-400'}`} />
                    <div>
                      <p className="font-medium">{platform.platform}</p>
                      <p className="text-sm text-gray-500">
                        {platform.username || 'Connecté'}
                      </p>
                    </div>
                  </div>
                  
                  <Badge variant={platform.isActive ? "default" : "secondary"}>
                    {platform.isActive ? 'Actif' : 'Inactif'}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Aucune plateforme connectée</p>
              <Button asChild>
                <Link href="/dashboard/settings">
                  Connecter des plateformes
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}