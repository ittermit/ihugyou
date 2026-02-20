'use client'

import { motion } from "framer-motion"
import Link from "next/link"

export default function Home() {
  return (
    <main className="main-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <h1 className="hero-title">You have been</h1>
        <h2 className="hero-subtitle">hugged!</h2>

        {/* Minimalist Illustration from Screenshot */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="illustration-box"
        >
          <svg width="250" height="250" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Minimalist line art hug illustration inspired by screenshot */}
            <path d="M75 160C75 160 55 140 55 110C55 80 75 60 100 60C125 60 145 80 145 110C145 140 125 160 125 160" stroke="#34495e" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M100 160V175" stroke="#34495e" strokeWidth="1.5" />
            <path d="M60 170H140" stroke="#34495e" strokeWidth="1.5" />

            {/* Two heads */}
            <circle cx="85" cy="85" r="25" fill="#FAD1A6" fillOpacity="0.4" stroke="#34495e" strokeWidth="1" />
            <circle cx="115" cy="85" r="25" fill="#FFAD99" fillOpacity="0.4" stroke="#34495e" strokeWidth="1" />

            {/* Eyes */}
            <path d="M80 85C80 85 83 83 86 85" stroke="#34495e" strokeWidth="1" />
            <path d="M114 85C114 85 117 83 120 85" stroke="#34495e" strokeWidth="1" />

            {/* Hearts around */}
            <path d="M50 70L52 74L56 72L54 78L58 82L52 82L50 88L48 82L42 82L46 78L44 72L48 74L50 70Z" fill="#FFA38E" fillOpacity="0.6" />
            <path d="M150 70L152 74L156 72L154 78L158 82L152 82L150 88L148 82L142 82L146 78L144 72L148 74L150 70Z" fill="#FFA38E" fillOpacity="0.6" />
            <path d="M100 40C100 40 102 35 105 40C108 35 110 40 110 40C110 45 105 50 100 55C95 50 90 45 90 40C90 35 92 40 95 40" fill="#FFA38E" fillOpacity="0.3" />
          </svg>
        </motion.div>

        <Link href="/dashboard" className="btn-create">
          Create a Hug
        </Link>
      </motion.div>

      {/* Subtle sparkle decoration */}
      <div style={{ position: 'absolute', bottom: '30px', right: '30px', opacity: 0.3 }}>
        <svg width="60" height="60" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25 0L32 18L50 25L32 32L25 50L18 32L0 25L18 18L25 0Z" fill="white" />
        </svg>
      </div>
    </main>
  );
}
