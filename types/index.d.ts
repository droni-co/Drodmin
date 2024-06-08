
export {};
declare global {
  export interface AppiToken {
    type: string
    name: string
    token: string
    abilities: string[]
    lastUsedAt: string
    expiresAt: string
  }
  export interface Me {
    user: User
    enrollments: Enrollment[]
  }
  
  export interface User {
    id: string
    name: string
    username: string
    avatar: string
    email: string
    lang: string
    provider: string
    createdAt: string
    updatedAt: string
  }
  
  export interface Enrollment {
    id: number
    siteId: string
    userId: string
    role: string
    createdAt: string
    updatedAt: string
    site: Site
  }
  
  export interface Site {
    id: string
    name: string
    domain: string
    description: string
    logo: string | null
    props: any
    createdAt: string
    updatedAt: string
  }

  export interface Pagination<T extends Iterable<any>> {
    meta?: MetaPagination
    data: T
  }
  
  export interface MetaPagination {
    total: number
    perPage: number
    currentPage: any
    lastPage: number
    firstPage: number
  }
  
  export interface Post {
    id?: number
    siteId?: string
    userId?: string
    name: string
    slug: string
    description?: string | null
    image?: string | null
    content?: string
    format: 'html' | 'markdown'
    active: boolean
    props?: any[]
    lang: 'es' | 'en'
    createdAt?: string
    updatedAt?: string
    user?: User
  }
  
  export interface User {
    id: string
    name: string
    username: string
    avatar: string
    email: string
    lang: string
    provider: string
    createdAt: string
    updatedAt: string
  }

  export interface Attachment {
    id: number
    siteId: string
    userId: string
    name: string
    path: string
    size: number
    mime: string
    url: string
    createdAt: string
  }

  export interface Toast {
    active: boolean
    type: 'success' | 'error' | 'warning' | 'info'
    message: string
  }
  
}
