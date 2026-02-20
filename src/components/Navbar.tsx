'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Heart, User, LogOut } from 'lucide-react'

export const Navbar = () => {
    const { data: session } = useSession()

    return (
        <nav style={{
            margin: '20px auto 40px',
            maxWidth: '1000px',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 100
        }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem', fontWeight: 800 }}>
                <Heart fill="var(--primary)" size={24} color="var(--primary)" />
                <span>ihug.you</span>
            </Link>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                {session ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <Link href="/dashboard" style={{ fontWeight: 600, fontSize: '0.9rem', opacity: 0.7 }}>Dashboard</Link>
                        <button onClick={() => signOut()} title="Sign Out" style={{ opacity: 0.5 }}>
                            <LogOut size={18} />
                        </button>
                        {session.user?.image && (
                            <img src={session.user.image} alt="Profile" style={{ width: '28px', height: '28px', borderRadius: '50%' }} />
                        )}
                    </div>
                ) : (
                    <Link href="/dashboard" style={{ fontWeight: 600, fontSize: '0.9rem', opacity: 0.7 }}>
                        My Stats
                    </Link>
                )}
            </div>
        </nav>
    )
}
