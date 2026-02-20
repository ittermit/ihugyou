'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Heart, User, LogOut } from 'lucide-react'

export const Navbar = () => {
    const { data: session } = useSession()

    return (
        <nav style={{
            margin: '20px auto 20px',
            maxWidth: '1000px',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 20px',
            zIndex: 100
        }}>
            <Link href="/" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '1.1rem',
                fontWeight: 600,
                color: '#34495e',
                textDecoration: 'none'
            }}>
                <Heart fill="#FFA38E" size={20} color="#FFA38E" />
                <span>ihug.you</span>
            </Link>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                {session ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <Link href="/dashboard" style={{ fontWeight: 600, fontSize: '0.9rem', opacity: 0.7, color: '#34495e', textDecoration: 'none' }}>Dashboard</Link>
                        <button onClick={() => signOut()} title="Sign Out" style={{ opacity: 0.5, background: 'none', border: 'none', cursor: 'pointer' }}>
                            <LogOut size={18} color="#34495e" />
                        </button>
                    </div>
                ) : (
                    <Link href="/dashboard" style={{ fontWeight: 600, fontSize: '0.9rem', opacity: 0.7, color: '#34495e', textDecoration: 'none' }}>
                        Login / Stats
                    </Link>
                )}
            </div>
        </nav>
    )
}
