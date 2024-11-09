import React, { useState, useEffect } from "react"

import AuthPage from "./pages/Auth"
import UploadPage from "./pages/Upload"

import supabase from "./scripts/supabase"

import "./styles.scss"

const App = () => {
    const [session, setSession] = useState(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => setSession(session))

        const listener = supabase.auth.onAuthStateChange((_, session) => setSession(session))

        return () => listener.data.subscription.unsubscribe()
    }, [])

    return session ? <UploadPage /> : <AuthPage />
}

export default App