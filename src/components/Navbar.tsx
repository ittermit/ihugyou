'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Heart, User, LogOut } from 'lucide-react'

export const Navbar = () => {
    const { data: session } = useSession()

    return (
        <nav className="glass-card" style={{
            margin: '20px auto',
            maxWidth: '1200px',
            width: '90%',
            padding: '12px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: '20px',
            zIndex: 100
        }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>
                <Heart fill="var(--primary)" size={32} />
                <span>ihug.you</span>
            </Link>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                {session ? (
                    <>
                        <Link href="/dashboard" style={{ fontWeight: 600 }}>Dashboard</Link>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {session.user?.image && (
                                <img src={session.user.image} alt="Profile" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                            )}
                            <button onClick={() => signOut()} title="Sign Out">
                                <LogOut size={20} />
                            </button>
                        </div>
                    </>
                ) : (
                    <button onClick={() => signIn('google')} className="btn-primary" style={{ padding: '8px 20px' }}>
                        Sign In
                    </button>
                )}
            </div>
        </nav>
    )
}
