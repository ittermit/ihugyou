// Basic types for when Prisma client is not yet fully generated
export type HugType = 'GLOBAL' | 'PERSONAL'

export interface Hug {
    id: number
    slug: string
    type: HugType
    senderName: string
    targetName?: string | null
    ownerId: string
    isReturned: boolean
    viewsCount: number
    createdAt: Date
}

export interface Visit {
    id: number
    hugId: number
    viewedAt: Date
}

export type HugWithLogs = Hug & {
    logs: Visit[]
}

export type CreateHugParams = {
    senderName: string
    targetName?: string
    type: HugType
}
