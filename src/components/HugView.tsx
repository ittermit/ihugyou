'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, RefreshCw } from 'lucide-react'
import { returnHug } from '@/lib/actions'

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
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="glass-card"
                style={{ padding: '60px', maxWidth: '600px', width: '100%', position: 'relative', overflow: 'hidden' }}
            >
                <div style={{ position: 'absolute', top: -20, left: -20, opacity: 0.1 }}>
                    <Heart size={200} fill="var(--primary)" />
                </div>

                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{ marginBottom: '30px' }}
                >
                    <Heart size={80} color="var(--primary)" fill="var(--primary)" />
                </motion.div>

                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                    {hug.type === 'GLOBAL' ? "You've been hugged!" : `Hi ${hug.targetName}!`}
                </h1>

                <p style={{ fontSize: '1.2rem', marginBottom: '40px', opacity: 0.8 }}>
                    {hug.type === 'GLOBAL'
                        ? "Sending you a digital embrace to brighten your day!"
                        : `${hug.senderName} has sent you a special hug!`}
                </p>

                <AnimatePresence mode="wait">
                    {!returned ? (
                        <motion.button
                            key="hug-back"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleHugBack}
                            disabled={loading}
                            className="btn-primary"
                            style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 auto' }}
                        >
                            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                            {loading ? 'Sending...' : 'Hug Back'}
                        </motion.button>
                    ) : (
                        <motion.div
                            key="hugged-back"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1.1rem' }}
                        >
                            You hugged back! ❤️
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <div style={{ marginTop: '40px' }}>
                <p style={{ opacity: 0.6 }}>Want to send a hug to someone else?</p>
                <a href="/" className="btn-primary" style={{ display: 'inline-block', marginTop: '10px', background: 'transparent', border: '2px solid var(--primary)', color: 'var(--primary)', boxShadow: 'none' }}>
                    Create My Own Hug
                </a>
            </div>
        </div>
    )
}
