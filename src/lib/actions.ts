'use server'

import { prisma } from "@/lib/prisma"
import { nanoid } from "nanoid"
import { auth } from "@/auth"
import { cookies } from "next/headers"
import { CreateHugParams } from "./types"

export async function createHug(params: CreateHugParams) {
    const session = await auth()
    const cookieStore = await cookies()
    const anonymousId = cookieStore.get('ihug_anon_id')?.value

    if (!anonymousId && !session?.user) {
        throw new Error("Missing identification")
    }

    // Find or create user
    let user = null
    if (session?.user?.id) {
        user = await prisma.user.findUnique({ where: { id: session.user.id } })
    } else if (anonymousId) {
        user = await prisma.user.findUnique({ where: { anonymousId } })
        if (!user) {
            user = await prisma.user.create({
                data: {
                    anonymousId,
                    name: params.senderName || 'Anonymous'
                }
            })
        }
    }

    if (!user) throw new Error("Could not find or create user")

    const slug = nanoid(10)

    const hug = await prisma.hug.create({
        data: {
            slug,
            type: params.type,
            senderName: params.senderName || 'Anonymous',
            targetName: params.targetName,
            ownerId: user.id
        }
    })

    return { slug }
}

export async function returnHug(slug: string) {
    const hug = await prisma.hug.findUnique({ where: { slug } })
    if (!hug) throw new Error("Hug not found")

    await prisma.hug.update({
        where: { slug },
        data: { isReturned: true }
    })

    return { success: true }
}

export async function trackVisit(slug: string) {
    const hug = await prisma.hug.findUnique({ where: { slug } })
    if (!hug) return

    await prisma.visit.create({
        data: {
            hugId: hug.id
        }
    })

    await prisma.hug.update({
        where: { slug },
        data: { viewsCount: { increment: 1 } }
    })
}

export async function syncAnonymousHugs() {
    const session = await auth()
    const cookieStore = await cookies()
    const anonymousId = cookieStore.get('ihug_anon_id')?.value

    if (!session?.user?.id || !anonymousId) return

    // Check if there are hugs for this anonymousId that don't belong to this user yet
    const anonymousUser = await prisma.user.findUnique({ where: { anonymousId } })

    if (anonymousUser && anonymousUser.id !== session.user.id) {
        // Move hugs to the logged-in user
        await prisma.hug.updateMany({
            where: { ownerId: anonymousUser.id },
            data: { ownerId: session.user.id }
        })
    }
}
