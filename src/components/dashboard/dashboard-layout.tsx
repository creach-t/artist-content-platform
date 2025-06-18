'use client'

import { ReactNode, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  LayoutDashboard, 
  Plus, 
  Calendar, 
  BarChart3, 
  Settings, 
  Image, 
  Hash,
  Menu,
  X,
  Palette,
  LogOut,
  User
} from 'lucide-react'
import { cn, getInitials } from '@/lib/utils'
import { UserWithSettings } from '@/types'
import { toast } from 'sonner'

interface DashboardLayoutProps {
  children: ReactNode
  user: UserWithSettings
}

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Créer un post',
    href: '/dashboard/create',
    icon: Plus,
  },
  {
    name: 'Planificateur',
    href: '/dashboard/scheduler',
    icon: Calendar,
  },
  {
    name: 'Mes posts',
    href: '/dashboard/posts',
    icon: Image,
  },
  {
    name: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3,
  },
  {
    name: 'Bibliothèque',
    href: '/dashboard/library',
    icon: Hash,
  },
  {
    name: 'Paramètres',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

export function DashboardLayout({ children, user }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: '/' })
    } catch (error) {
      toast.error('Erreur lors de la déconnexion')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Palette className="h-8 w-8 text-artist-purple-600" />
              <span className="text-xl font-bold gradient-text">ArtistPlatform</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                  'text-gray-700 hover:bg-artist-purple-50 hover:text-artist-purple-600',
                  'group'
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="h-5 w-5 mr-3 text-gray-400 group-hover:text-artist-purple-600" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User menu */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-artist-purple-100 rounded-full flex items-center justify-center">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || ''}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <span className="text-sm font-medium text-artist-purple-600">
                    {getInitials(user.name || user.email || 'U')}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.name || 'Utilisateur'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                asChild
              >
                <Link href="/dashboard/profile">
                  <User className="h-4 w-4 mr-2" />
                  Profil
                </Link>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Palette className="h-6 w-6 text-artist-purple-600" />
              <span className="font-bold gradient-text">ArtistPlatform</span>
            </Link>
            
            <div className="w-8 h-8 bg-artist-purple-100 rounded-full flex items-center justify-center">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || ''}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <span className="text-xs font-medium text-artist-purple-600">
                  {getInitials(user.name || user.email || 'U')}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}