import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Heart } from "lucide-react"
import { returnHug, trackVisit } from "@/lib/actions"
import { Navbar } from "@/components/Navbar"
import HugView from "@/components/HugView"

type PageProps = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params
    const hug = await prisma.hug.findUnique({ where: { slug } })
    if (!hug) return {}

    const title = hug.type === 'GLOBAL'
        ? "You've been hugged!"
        : `A special hug for ${hug.targetName}!`

    return {
        title: `ihug.you | ${title}`,
        openGraph: {
            title: title,
            description: `Click to receive your digital hug from ${hug.senderName}.`,
        },
        robots: {
            index: false, // Privacy: noindex as requested
        }
    }
}

export default async function HugPage({ params }: PageProps) {
    const { slug } = await params
    const hug = await prisma.hug.findUnique({ where: { slug } })

    if (!hug) notFound()

    // Track visit on the server
    // Wait, trackVisit is an async function that updates DB.
    // We can call it here.
    await trackVisit(slug)

    return (
        <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <HugView hug={hug} />
        </main>
    )
}
