'use client'

import { motion } from "framer-motion"
import { User, Cloud } from "lucide-react"
import Link from "next/link"
import { useSession, signIn } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()

  return (
    <main className="main-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <h1 className="hero-title">Spread Some Warmth</h1>
        <p className="hero-subtitle">Send a digital hug</p>

        {/* Minimalist Illustration */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          style={{ marginBottom: '3.5rem', marginTop: '2rem' }}
        >
          <svg width="220" height="220" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="200" rx="40" fill="white" fillOpacity="0.1" />
            <path d="M100 40C90 40 80 45 75 50C70 45 60 40 50 40C30 40 15 55 15 75C15 110 50 140 100 175C150 140 185 110 185 75C185 55 170 40 150 40C140 40 130 45 125 50C120 45 110 40 100 40Z" fill="#FFAD99" fillOpacity="0.3" />
            <circle cx="85" cy="90" r="35" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
            <circle cx="115" cy="90" r="35" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
            <path d="M80 85C80 85 85 82 90 85" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M110 85C110 85 115 82 120 85" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>

        <Link href="/dashboard" className="btn-create">
          Create a Hug
        </Link>

        <div className="nav-links">
          <Link href="/dashboard" className="nav-link">
            <Cloud size={18} />
            My Hugs & Stats
          </Link>

          {!session ? (
            <button onClick={() => signIn('google')} className="nav-link">
              Login / Sign Up
              <User size={18} />
            </button>
          ) : (
            <Link href="/dashboard" className="nav-link">
              My Account
              <User size={18} />
            </Link>
          )}
        </div>
      </motion.div>

      <footer style={{ position: 'absolute', bottom: '40px', opacity: 0.5, fontSize: '0.85rem', fontWeight: 500 }}>
        ihug.you — © 2024
      </footer>

      {/* Subtle sparkle decoration */}
      <div style={{ position: 'absolute', bottom: '25px', right: '25px', opacity: 0.15 }}>
        <svg width="45" height="45" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25 0L30.6 19.4L50 25L30.6 30.6L25 50L19.4 30.6L0 25L19.4 19.4L25 0Z" fill="white" />
        </svg>
      </div>
    </main>
  );
}
