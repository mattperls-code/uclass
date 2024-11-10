import React, { useState } from "react"

import supabase from "../scripts/supabase"

import { colors, screen } from "../constants"

const AuthPage = () => {
    const [onWelcomeScreen, setOnWelcomeScreen] = useState(true)
    const [hasAccount, setHasAccount] = useState(true)

    const WelcomeComponent = () => {
        const goToSignup = () => {
            setOnWelcomeScreen(false)
            setHasAccount(false)
        }

        const goToLogin = () => {
            setOnWelcomeScreen(false)
            setHasAccount(true)
        }

        return (
            <React.Fragment>
                <div style={{ fontSize: 24, fontWeight: "700", marginBottom: 20, color: colors.black }}>Welcome to UClass!</div>
                <div onClick={goToSignup}>
                    <div style={{ width: screen.width - 40, height: 50, borderRadius: 10, alignContent: "center", justifyContent: "center", backgroundColor: colors.red }}>
                        <div style={{ textAlign: "center", color: colors.white, fontSize: 18 }}>Create Account</div>
                    </div>
                </div>
                <div style={{ height: 10 }} />
                <div onClick={goToLogin}>
                    <div style={{ width: screen.width - 40, height: 50, borderRadius: 10, alignContent: "center", justifyContent: "center", borderWidth: 2, borderColor: colors.red, borderStyle: "solid" }}>
                        <div style={{ textAlign: "center", color: colors.black, fontSize: 18 }}>Login</div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    const LoginComponent = () => {
        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")

        const credentials = { email, password }
        
        const login = () => {
            supabase.auth.signInWithPassword(credentials).then(({ data, error }) => {
                if (error) return alert(error.message)
            })
        }

        const goToSignup = () => {
            setHasAccount(false)
        }

        return (
            <React.Fragment>
                <div style={{ fontSize: 24, fontWeight: "700", marginBottom: 20, color: colors.black }}>Login to UClass</div>
                <input placeholder={"student@gmail.com"} value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: screen.width - 40 - 20, height: 40 - 20, borderRadius: 5, padding: 10, color: colors.black, fontSize: 12, backgroundColor: colors.grey, border: "none" }} />
                <div style={{ height: 10 }} />
                <input type={"password"} placeholder={"password"} value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: screen.width - 40 - 20, height: 40 - 20, borderRadius: 5, padding: 10, color: colors.black, fontSize: 12, backgroundColor: colors.grey, border: "none" }} />
                <div onClick={login}>
                    <div style={{ marginTop: 20, width: screen.width - 180, height: 50, borderRadius: 10, alignContent: "center", justifyContent: "center", backgroundColor: colors.red }}>
                        <div style={{ textAlign: "center", color: colors.white, fontSize: 18 }}>Login</div>
                    </div>
                </div>
                <div style={{ flexDirection: "row", marginTop: 20 }}>
                    <div style={{ display: "inline-block", marginRight: "0.5ch", fontSize: 12, color: colors.black }}>Don't have an account?</div>
                    <div onClick={goToSignup} style={{ display: "inline-block" }}>
                        <div style={{ fontSize: 12, color: colors.red }}>Create One</div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    const SignupComponent = () => {
        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")

        const credentials = { email, password }
        
        const signup = () => {
            supabase.auth.signUp(credentials).then(({ data, error }) => {
                if (error) return alert(error.message)
            })
        }

        const goToLogin = () => {
            setHasAccount(true)
        }
        
        return (
            <React.Fragment>
                <div style={{ fontSize: 24, fontWeight: "700", marginBottom: 20, color: colors.black }}>Create UClass Account</div>
                <input placeholder={"student@gmail.com"} value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: screen.width - 40 - 20, height: 40 - 20, borderRadius: 5, padding: 10, color: colors.black, fontSize: 12, backgroundColor: colors.grey, border: "none" }} />
                <div style={{ height: 10 }} />
                <input type={"password"} placeholder={"password"} value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: screen.width - 40 - 20, height: 40 - 20, borderRadius: 5, padding: 10, color: colors.black, fontSize: 12, backgroundColor: colors.grey, border: "none" }} />
                <div onClick={signup}>
                    <div style={{ marginTop: 20, width: screen.width - 180, height: 50, borderRadius: 10, alignContent: "center", justifyContent: "center", backgroundColor: colors.red }}>
                        <div style={{ textAlign: "center", color: colors.white, fontSize: 18 }}>Sign Up</div>
                    </div>
                </div>
                <div style={{ flexDirection: "row", marginTop: 20 }}>
                    <div style={{ display: "inline-block", marginRight: "0.5ch", fontSize: 12, color: colors.black }}>Already have an account? </div>
                    <div onClick={goToLogin} style={{ display: "inline-block" }}>
                        <div style={{ fontSize: 12, color: colors.red,  }}>Login</div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{ position: "relative", width: "100%", height: "17.5%", backgroundColor: colors.red, justifyContent: "space-between" }}>
                <svg style={{ position: "absolute", bottom: 0, backgroundColor: colors.white }} width={screen.width} height={0.1 * screen.width} viewBox={"0 0 100 10"}>
                    <path d={"M 0 0 L 100 0 50 10 0 0"} stroke={"transparent"} fill={colors.red} />
                </svg>
            </div>
            <div style={{ display: "flex", flex: 1, flexDirection: "column", backgroundColor: colors.white, alignItems: "center", justifyContent: "center" }}>
                {
                    onWelcomeScreen ? <WelcomeComponent /> : hasAccount ? <LoginComponent /> : <SignupComponent />
                }
            </div>
            <div style={{ width: "100%", height: "10%", backgroundColor: colors.white }} />
        </div>
    )
}

export default AuthPage