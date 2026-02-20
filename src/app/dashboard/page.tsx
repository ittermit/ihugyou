import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { Navbar } from "@/components/Navbar"
import { cookies } from "next/headers"
import { syncAnonymousHugs } from "@/lib/actions"
import DashboardContent from "@/components/DashboardContent"
import Link from "next/link"

export default async function DashboardPage() {
    await syncAnonymousHugs()
    const session = await auth()
    const cookieStore = await cookies()
    const anonymousId = cookieStore.get('ihug_anon_id')?.value

    let user = null
    if (session?.user?.id) {
        user = await prisma.user.findUnique({
            where: { id: session.user.id },
            include: { hugs: { orderBy: { createdAt: 'desc' } } }
        })
    } else if (anonymousId) {
        user = await prisma.user.findUnique({
            where: { anonymousId },
            include: { hugs: { orderBy: { createdAt: 'desc' } } }
        })
    }

    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

    return (
        <main style={{ minHeight: '100vh', padding: '0 24px 80px' }}>
            <Navbar />
            <DashboardContent
                initialUser={user}
                session={session}
                baseUrl={baseUrl}
            />
        </main>
    )
}
