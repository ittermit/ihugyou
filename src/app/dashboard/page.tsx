import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { Navbar } from "@/components/Navbar"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { Heart, Eye, RefreshCcw, Copy, Share2 } from "lucide-react"
import Link from "next/link"
import { syncAnonymousHugs } from "@/lib/actions"
import CopyButton from "@/components/CopyButton"

export default async function DashboardPage() {
    await syncAnonymousHugs()
    const session = await auth()
    const cookieStore = await cookies()
    const anonymousId = cookieStore.get('ihug_anon_id')?.value

    // We allow access even if anonymous, but we show a "Login to save" badge
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

    if (!user) {
        // If no user found and no session, we might want to redirect to login or just show empty
        // But since we want "Anonymous first", we should probably have created a user on First Hug.
        // If they just go to dashboard without creating anything:
        return (
            <main>
                <Navbar />
                <div style={{ padding: '80px 20px', textAlign: 'center' }}>
                    <h1 className="hero-title">Your Dashboard</h1>
                    <p>You haven't sent any hugs yet. Start spreading the love!</p>
                    <Link href="/" className="btn-primary" style={{ display: 'inline-block', marginTop: '20px' }}>Create a Hug</Link>
                </div>
            </main>
        )
    }

    const globalHugs = user.hugs.filter((h: any) => h.type === 'GLOBAL')
    const personalHugs = user.hugs.filter((h: any) => h.type === 'PERSONAL')

    return (
        <main style={{ minHeight: '100vh' }}>
            <Navbar />

            <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
                <header style={{ marginBottom: '40px' }}>
                    <h1 className="hero-title">Dashboard</h1>
                    {!session && (
                        <div className="glass-card" style={{ padding: '15px 25px', background: 'rgba(253, 203, 110, 0.2)', border: '1px solid var(--accent)' }}>
                            <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ fontSize: '1.2rem' }}>💡</span>
                                <span>Log in with Google to sync your hugs across all your devices!</span>
                            </p>
                        </div>
                    )}
                </header>

                <section style={{ marginBottom: '60px' }}>
                    <h2 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Heart size={24} fill="var(--primary)" color="var(--primary)" />
                        Global Hug
                    </h2>
                    {globalHugs.length > 0 ? (
                        <div className="glass-card" style={{ padding: '30px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                                <div>
                                    <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>Your Universal Link</p>
                                    <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>Share this anywhere – it's for everyone!</p>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <CopyButton text={`${process.env.NEXTAUTH_URL}/${globalHugs[0].slug}`} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '40px', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid var(--glass-border)' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{globalHugs[0].viewsCount}</div>
                                    <div style={{ opacity: 0.6, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}><Eye size={12} /> Views</div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{globalHugs[0].isReturned ? personalHugs.filter((h: any) => h.isReturned).length : 0}</div>
                                    <div style={{ opacity: 0.6, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}><RefreshCcw size={12} /> Returned</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p style={{ opacity: 0.6 }}>You haven't created a global hug link yet.</p>
                    )}
                </section>

                <section>
                    <h2 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Share2 size={24} color="var(--secondary)" />
                        Personal Hugs
                    </h2>
                    {personalHugs.length > 0 ? (
                        <div style={{ display: 'grid', gap: '20px' }}>
                            {personalHugs.map((hug: any) => (
                                <div key={hug.id} className="glass-card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.1rem' }}>To: {hug.targetName}</h3>
                                        <p style={{ opacity: 0.5, fontSize: '0.8rem' }}>Created on {new Date(hug.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontWeight: 700 }}>{hug.viewsCount} <span style={{ opacity: 0.5, fontWeight: 400, fontSize: '0.8rem' }}>views</span></div>
                                            <div style={{ color: hug.isReturned ? 'var(--primary)' : 'inherit', fontSize: '0.9rem' }}>
                                                {hug.isReturned ? '✓ Hugged Back' : 'Waiting...'}
                                            </div>
                                        </div>
                                        <CopyButton text={`${process.env.NEXTAUTH_URL}/${hug.slug}`} small />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ opacity: 0.6 }}>No personal hugs created yet.</p>
                    )}
                </section>
            </div>
        </main>
    )
}
