import React, { useState, useEffect } from "react"

import supabase from "../scripts/supabase"

const AuthPage = () => {
    const [hasAccount, setHasAccount] = useState(false)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const toggleHasAccount = () => setHasAccount(!hasAccount)

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const credentials = { email, password }

    const login = () => {
        supabase.auth.signInWithPassword(credentials).then(({ data, error }) => {
            if (error) return alert(error.message)

            console.log({ data })
        })
    }

    const signup = () => {
        supabase.auth.signUp(credentials).then(({ data, error }) => {
            if (error) return alert(error.message)

            // TODO: may need a manual signin call here since this doesnt actually refresh session

            console.log({ data })
        })
    }

    return (
        <div>
            Hello Auth Page
            <hr />
            Email: <input type={"text"} value={email} onChange={handleEmailChange} />
            <br />
            Password: <input type={"password"} value={password} onChange={handlePasswordChange} />
            <br />
            <button onClick={hasAccount ? login : signup}>
                {
                    hasAccount ? "Login" : "Signup"
                }
            </button>
            <hr />
            <span onClick={toggleHasAccount}>
                {
                    hasAccount ? "Don't have an account? Signup" : "Already have an account? Login"
                }
            </span>
        </div>
    )
}

export default AuthPage