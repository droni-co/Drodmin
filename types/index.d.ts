
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
    meta: MetaPagination
    data: T
  }
  
  export interface MetaPagination {
    total: number
    perPage: number
    currentPage: any
    lastPage: number
    firstPage: number
    firstPageUrl: string
    lastPageUrl: string
    nextPageUrl: any
    previousPageUrl: any
  }
  
  export interface Post {
    id: number
    siteId: string
    userId: string
    name: string
    slug: string
    description: any
    image: any
    format: string
    active: number
    props: any
    lang: string
    createdAt: string
    updatedAt: string
  }
  
  
}
