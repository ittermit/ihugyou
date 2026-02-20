'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function CopyButton({ text, small = false }: { text: string, small?: boolean }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <button
            onClick={handleCopy}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: small ? '8px 12px' : '12px 20px',
                borderRadius: '12px',
                background: copied ? '#00b894' : 'var(--glass)',
                color: copied ? 'white' : 'inherit',
                border: '1px solid var(--glass-border)',
                fontSize: small ? '0.8rem' : '1rem',
                fontWeight: 600,
                transition: 'all 0.2s',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}
        >
            {copied ? <Check size={small ? 14 : 18} /> : <Copy size={small ? 14 : 18} />}
            {copied ? 'Copied!' : small ? 'Copy Link' : 'Copy Digital Hug Link'}
        </button>
    )
}
