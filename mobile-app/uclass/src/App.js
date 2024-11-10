import React, { useState, useEffect } from "react"

import { AppState } from "react-native"

import supabase from "./scripts/supabase"

import AuthScreen from "./screens/Auth"
import HomeScreen from "./screens/Home"

const App = () => {
    const [session, setSession] = useState(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    
        supabase.auth.onAuthStateChange((_, session) => setSession(session))

        AppState.addEventListener("change", (state) => {
            if (state == "active") supabase.auth.startAutoRefresh()
            else supabase.auth.stopAutoRefresh()
        })
    }, [])

    return session ? <HomeScreen session={session} /> : <AuthScreen />
}

export default App