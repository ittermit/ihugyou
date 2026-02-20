'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, UserPlus, Eye, RefreshCcw, Share2, Plus, ArrowLeft } from 'lucide-react'
import { createHug } from '@/lib/actions'
import CopyButton from '@/components/CopyButton'

export default function DashboardContent({
    initialUser,
    session,
    baseUrl
}: {
    initialUser: any,
    session: any,
    baseUrl: string
}) {
    const [user, setUser] = useState(initialUser)
    const [showCreate, setShowCreate] = useState(false)
    const [loading, setLoading] = useState(false)
    const [senderName, setSenderName] = useState("")
    const [targetName, setTargetName] = useState("")
    const [createdSlug, setCreatedSlug] = useState<string | null>(null)

    const handleCreate = async (type: 'GLOBAL' | 'PERSONAL') => {
        if (type === 'PERSONAL' && !targetName) {
            alert("Please enter the recipient's name!")
            return
        }
        setLoading(true)
        try {
            const { slug } = await createHug({
                senderName,
                targetName: type === 'PERSONAL' ? targetName : undefined,
                type
            })
            setCreatedSlug(slug)
            // Refresh user data (simplified, in a real app would refetch)
            window.location.reload()
        } catch (error) {
            console.error(error)
            alert("Something went wrong!")
        } finally {
            setLoading(false)
        }
    }

    const globalHugs = user?.hugs?.filter((h: any) => h.type === 'GLOBAL') || []
    const personalHugs = user?.hugs?.filter((h: any) => h.type === 'PERSONAL') || []

    if (showCreate || createdSlug) {
        return (
            <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
                <button
                    onClick={() => { setShowCreate(false); setCreatedSlug(null); }}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', opacity: 0.6 }}
                >
                    <ArrowLeft size={20} />
                    Back to Dashboard
                </button>

                <AnimatePresence mode="wait">
                    {createdSlug ? (
                        <motion.div
                            key="success"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="glass-card"
                            style={{ padding: '60px', textAlign: 'center' }}
                        >
                            <Heart size={64} color="var(--primary)" fill="var(--primary)" style={{ margin: '0 auto 24px' }} />
                            <h2 style={{ marginBottom: '16px' }}>Hug Created!</h2>
                            <p style={{ opacity: 0.7, marginBottom: '32px' }}>
                                Your digital hug is ready to be sent.
                            </p>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <CopyButton text={`${baseUrl}/${createdSlug}`} />
                            </div>
                            <button
                                onClick={() => { setCreatedSlug(null); setTargetName(""); }}
                                style={{ marginTop: '32px', opacity: 0.5, textDecoration: 'underline' }}
                            >
                                Create another one
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="forms"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            style={{ display: 'grid', gap: '24px' }}
                        >
                            {/* Global Hug Card */}
                            <div className="glass-card" style={{ padding: '32px', textAlign: 'center' }}>
                                <Heart size={40} color="var(--primary)" fill="var(--primary)" style={{ margin: '0 auto 16px' }} />
                                <h3>Global Hug</h3>
                                <p style={{ opacity: 0.6, marginBottom: '24px', fontSize: '0.9rem' }}>A universal link for your bio.</p>
                                <button
                                    className="btn-create"
                                    style={{ padding: '12px 32px', fontSize: '1.1rem' }}
                                    onClick={() => handleCreate('GLOBAL')}
                                    disabled={loading}
                                >
                                    {loading ? "Creating..." : "Get Global Link"}
                                </button>
                            </div>

                            {/* Personal Hug Card */}
                            <div className="glass-card" style={{ padding: '32px', textAlign: 'center' }}>
                                <UserPlus size={40} color="var(--secondary)" style={{ margin: '0 auto 16px' }} />
                                <h3>Personalized Hug</h3>
                                <p style={{ opacity: 0.6, marginBottom: '24px', fontSize: '0.9rem' }}>Make it special for someone.</p>

                                <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
                                    <input
                                        type="text"
                                        placeholder="Recipient's Name"
                                        value={targetName}
                                        onChange={(e) => setTargetName(e.target.value)}
                                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.5)' }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Your Name (optional)"
                                        value={senderName}
                                        onChange={(e) => setSenderName(e.target.value)}
                                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.5)' }}
                                    />
                                </div>

                                <button
                                    className="btn-create"
                                    style={{ padding: '12px 32px', fontSize: '1.1rem', background: 'linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)' }}
                                    onClick={() => handleCreate('PERSONAL')}
                                    disabled={loading}
                                >
                                    {loading ? "Creating..." : "Create Personal Hug"}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        )
    }

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
            <header style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 className="hero-title" style={{ fontSize: '2.5rem' }}>Dashboard</h1>
                    <p style={{ opacity: 0.6 }}>Manage your digital hugs and warmth.</p>
                </div>
                <button onClick={() => setShowCreate(true)} className="btn-create" style={{ padding: '12px 24px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Plus size={20} />
                    Create New Hug
                </button>
            </header>

            {!session && (
                <div className="glass-card" style={{ padding: '20px 32px', marginBottom: '48px', background: 'rgba(253, 203, 110, 0.15)', borderColor: 'var(--accent)' }}>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 500 }}>
                        <span>💡</span>
                        Log in with Google to sync your hugs across all your devices and never lose them!
                    </p>
                </div>
            )}

            <div style={{ display: 'grid', gap: '48px' }}>
                <section>
                    <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Heart size={20} fill="var(--primary)" color="var(--primary)" />
                        Global Hug
                    </h3>
                    {globalHugs.length > 0 ? (
                        <div className="glass-card" style={{ padding: '32px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                                <div>
                                    <p style={{ fontWeight: 600, fontSize: '1.2rem' }}>Universal Link</p>
                                    <p style={{ opacity: 0.5, fontSize: '0.9rem' }}>{baseUrl}/{globalHugs[0].slug}</p>
                                </div>
                                <CopyButton text={`${baseUrl}/${globalHugs[0].slug}`} small />
                            </div>
                            <div style={{ display: 'flex', gap: '48px', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--glass-border)' }}>
                                <div>
                                    <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{globalHugs[0].viewsCount}</div>
                                    <div style={{ opacity: 0.5, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}><Eye size={14} /> Views</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p style={{ opacity: 0.5 }}>No global hug link yet.</p>
                    )}
                </section>

                <section>
                    <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Share2 size={20} color="var(--secondary)" />
                        Personal Hugs
                    </h3>
                    {personalHugs.length > 0 ? (
                        <div style={{ display: 'grid', gap: '16px' }}>
                            {personalHugs.map((hug: any) => (
                                <div key={hug.id} className="glass-card" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h4 style={{ fontWeight: 600 }}>To: {hug.targetName}</h4>
                                        <p style={{ opacity: 0.4, fontSize: '0.8rem' }}>{new Date(hug.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontWeight: 700 }}>{hug.viewsCount} <span style={{ opacity: 0.5, fontWeight: 400, fontSize: '0.8rem' }}>views</span></div>
                                            <div style={{ color: hug.isReturned ? '#2ecc71' : 'inherit', fontSize: '0.9rem', fontWeight: 600 }}>
                                                {hug.isReturned ? '❤️ Reciprocated' : 'Sent'}
                                            </div>
                                        </div>
                                        <CopyButton text={`${baseUrl}/${hug.slug}`} small />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ opacity: 0.5 }}>No personal hugs created yet.</p>
                    )}
                </section>
            </div>
        </div>
    )
}
