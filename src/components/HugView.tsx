'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, RefreshCw } from 'lucide-react'
import { returnHug } from '@/lib/actions'
import Link from 'next/link'

export default function HugView({ hug }: { hug: any }) {
    const [returned, setReturned] = useState(hug.isReturned)
    const [loading, setLoading] = useState(false)

    const handleHugBack = async () => {
        setLoading(true)
        try {
            await returnHug(hug.slug)
            setReturned(true)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
            textAlign: 'center'
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
                <h1 className="hero-title">You have been</h1>
                <h2 className="hero-subtitle">hugged!</h2>

                <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="illustration-box"
                >
                    <svg width="220" height="220" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M75 160C75 160 55 140 55 110C55 80 75 60 100 60C125 60 145 80 145 110C145 140 125 160 125 160" stroke="#34495e" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M100 160V175" stroke="#34495e" strokeWidth="1.5" />
                        <path d="M60 170H140" stroke="#34495e" strokeWidth="1.5" />

                        <circle cx="85" cy="85" r="25" fill="#FAD1A6" fillOpacity="0.4" stroke="#34495e" strokeWidth="1" />
                        <circle cx="115" cy="85" r="25" fill="#FFAD99" fillOpacity="0.4" stroke="#34495e" strokeWidth="1" />

                        <path d="M80 85C80 85 83 83 86 85" stroke="#34495e" strokeWidth="1" />
                        <path d="M114 85C114 85 117 83 120 85" stroke="#34495e" strokeWidth="1" />
                    </svg>
                </motion.div>

                <AnimatePresence mode="wait">
                    {!returned ? (
                        <motion.button
                            key="hug-back"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleHugBack}
                            disabled={loading}
                            className="btn-create"
                            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 60px', fontSize: '1.5rem', cursor: 'pointer', border: 'none' }}
                        >
                            <RefreshCw size={24} className={loading ? 'animate-spin' : ''} />
                            {loading ? 'Sending...' : 'Hug Back'}
                        </motion.button>
                    ) : (
                        <motion.div
                            key="hugged-back"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            style={{ color: '#34495e', fontWeight: 700, fontSize: '1.5rem' }}
                        >
                            You hugged back! ❤️
                        </motion.div>
                    )}
                </AnimatePresence>

                <Link href="/dashboard" style={{ marginTop: '40px', opacity: 0.6, textDecoration: 'underline', color: '#34495e' }}>
                    Create my own hug
                </Link>
            </motion.div>
        </div>
    )
}
