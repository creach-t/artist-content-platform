import { User, Post, Platform, PostStatus, PublicationStatus, UserSettings, PlatformConnection, Publication } from '@prisma/client'

// Extended types with relations
export type UserWithSettings = User & {
  settings: UserSettings | null
  platforms: PlatformConnection[]
  _count: {
    posts: number
  }
}

export type PostWithPublications = Post & {
  publications: Publication[]
  _count: {
    publications: number
  }
}

// Form types
export interface CreatePostData {
  title: string
  content: string
  mediaUrls: string[]
  hashtags: string[]
  platforms: Platform[]
  scheduledFor?: Date
  isTemplate?: boolean
  category?: string
  tags?: string[]
}

export interface UpdatePostData extends Partial<CreatePostData> {
  id: string
}

// Platform specific types
export interface PlatformConfig {
  name: string
  color: string
  icon: string
  maxCharacters: number
  maxImages: number
  supportsVideo: boolean
  supportsCarousel: boolean
  supportsStories: boolean
}

export interface PlatformAuth {
  authUrl: string
  scope: string[]
  redirectUri: string
}

// Analytics types
export interface AnalyticsData {
  date: string
  platform: Platform
  metrics: {
    posts: number
    likes: number
    comments: number
    shares: number
    views: number
    engagementRate: number
  }
}

export interface DashboardStats {
  totalPosts: number
  scheduledPosts: number
  connectedPlatforms: number
  avgEngagementRate: number
  weeklyGrowth: {
    posts: number
    engagement: number
  }
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    hasMore: boolean
  }
}

// Upload types
export interface UploadedFile {
  url: string
  name: string
  size: number
  type: string
  width?: number
  height?: number
}

// Form validation types
export interface FormErrors {
  [key: string]: string | undefined
}

// Component prop types
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

// Theme types
export type Theme = 'light' | 'dark' | 'system'

// Navigation types
export interface NavItem {
  title: string
  href: string
  icon?: string
  disabled?: boolean
  external?: boolean
  badge?: string
}

// Modal types
export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

// Toast types
export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastMessage {
  id: string
  type: ToastType
  title: string
  description?: string
  duration?: number
}

// Search and filter types
export interface SearchFilters {
  query?: string
  status?: PostStatus[]
  platforms?: Platform[]
  dateRange?: {
    from: Date
    to: Date
  }
  category?: string
  tags?: string[]
}

// Schedule types
export interface ScheduleSlot {
  day: string
  times: string[]
}

export interface PostingSchedule {
  [key: string]: string[] // day -> times
}

// Export Prisma types for convenience
export {
  User,
  Post,
  Platform,
  PostStatus,
  PublicationStatus,
  UserSettings,
  PlatformConnection,
  Publication,
} from '@prisma/client'