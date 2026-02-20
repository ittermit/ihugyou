'use client'

import { Navbar } from "@/components/Navbar"
import { motion } from "framer-motion"
import { Heart, Share2, UserPlus } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { createHug } from "@/lib/actions"
import CopyButton from "@/components/CopyButton"

export default function Home() {
  const [senderName, setSenderName] = useState("")
  const [targetName, setTargetName] = useState("")
  const [loading, setLoading] = useState(false)
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
    } catch (error) {
      console.error(error)
      alert("Something went wrong!")
    } finally {
      setLoading(false)
    }
  }

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''

  if (createdSlug) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <section style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card"
            style={{ padding: '60px', textAlign: 'center', maxWidth: '500px', width: '100%' }}
          >
            <div style={{ marginBottom: '30px' }}>
              <Heart size={64} color="var(--primary)" fill="var(--primary)" />
            </div>
            <h2 style={{ marginBottom: '10px' }}>Hug Created!</h2>
            <p style={{ opacity: 0.7, marginBottom: '30px' }}>
              Sharing is caring. Copy the link below and send it to your friend!
            </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CopyButton text={`${baseUrl}/${createdSlug}`} />
            </div>
            <button
              onClick={() => { setCreatedSlug(null); setTargetName(""); }}
              style={{ marginTop: '30px', opacity: 0.5, textDecoration: 'underline' }}
            >
              Create another one
            </button>
          </motion.div>
        </section>
      </main>
    )
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <section style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">Give a Digital Hug</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto 40px' }}>
            Sometimes a little hug is all someone needs. Send a personalized hug link to your friends and spread the warmth!
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          width: '100%',
          maxWidth: '1000px'
        }}>
          {/* Global Hug Card */}
          <motion.div
            className="glass-card"
            whileHover={{ scale: 1.02 }}
            style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}
          >
            <div style={{ background: 'rgba(255, 118, 117, 0.1)', padding: '20px', borderRadius: '50%' }}>
              <Heart size={48} color="var(--primary)" fill="var(--primary)" />
            </div>
            <h2>Global Hug</h2>
            <p style={{ opacity: 0.7 }}>A universal hug for everyone. Perfect for sharing on your social media bio!</p>
            <button className="btn-primary" style={{ marginTop: 'auto', width: '100%' }}
              onClick={() => handleCreate('GLOBAL')}
              disabled={loading}
            >
              {loading ? "Creating..." : "Get Global Link"}
            </button>
          </motion.div>

          {/* Personal Hug Card */}
          <motion.div
            className="glass-card"
            whileHover={{ scale: 1.02 }}
            style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}
          >
            <div style={{ background: 'rgba(108, 92, 231, 0.1)', padding: '20px', borderRadius: '50%' }}>
              <UserPlus size={48} color="var(--secondary)" />
            </div>
            <h2>Personalized Hug</h2>
            <p style={{ opacity: 0.7 }}>Make it special. Add their name and yours for a more intimate touch.</p>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                type="text"
                placeholder="Recipient's Name"
                value={targetName}
                onChange={(e) => setTargetName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid var(--glass-border)',
                  background: 'rgba(255,255,255,0.5)'
                }}
              />
              <input
                type="text"
                placeholder="Your Name (optional)"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid var(--glass-border)',
                  background: 'rgba(255,255,255,0.5)'
                }}
              />
            </div>

            <button className="btn-primary" style={{
              width: '100%',
              background: 'linear-gradient(to right, #6c5ce7, #a29bfe)',
              boxShadow: '0 4px 15px rgba(108, 92, 231, 0.4)'
            }}
              onClick={() => handleCreate('PERSONAL')}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Personal Hug"}
            </button>
          </motion.div>
        </div>
      </section>

      <footer style={{ padding: '40px', textAlign: 'center', opacity: 0.6 }}>
        <p>© 2026 ihug.you • Made with ❤️</p>
      </footer>
    </main>
  );
}
