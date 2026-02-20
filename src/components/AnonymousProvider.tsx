'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

type AnonymousContextType = {
    anonymousId: string | null
}

const AnonymousContext = createContext<AnonymousContextType>({ anonymousId: null })

export const useAnonymous = () => useContext(AnonymousContext)

export const AnonymousProvider = ({ children }: { children: React.ReactNode }) => {
    const [anonymousId, setAnonymousId] = useState<string | null>(null)

    useEffect(() => {
        let id = localStorage.getItem('ihug_anon_id')
        if (!id) {
            id = uuidv4()
            localStorage.setItem('ihug_anon_id', id)
        }
        setAnonymousId(id)

        // Set a cookie for server-side access if needed
        document.cookie = `ihug_anon_id=${id}; path=/; max-age=31536000; SameSite=Lax`
    }, [])

    return (
        <AnonymousContext.Provider value={{ anonymousId }}>
            {children}
        </AnonymousContext.Provider>
    )
}
