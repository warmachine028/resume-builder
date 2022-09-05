import { createContext, useContext, useState, useEffect } from "react"
import { RecaptchaVerifier, onAuthStateChanged, signInWithPhoneNumber, signOut } from "firebase/auth"
import { auth } from "../firebase"

const AuthContext = createContext()
export const useAuth = () => {
	return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState()
	const [loading, setLoading] = useState(true)

	const setupRecaptcha = number => {
		const recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {}, auth)
		recaptchaVerifier.render()
		return signInWithPhoneNumber(auth, number, recaptchaVerifier)
	}

	const logOut = () => {
		localStorage.removeItem("user")
		signOut(auth)
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			setCurrentUser(user)
			setLoading(false)
		})
		return unsubscribe
	}, [])

	const value = {
		currentUser,
		setupRecaptcha,
		logOut,
	}
	return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

export default AuthProvider
