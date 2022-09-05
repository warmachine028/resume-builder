import { useState } from "react"

import { Alert, Navbar as BootstrapNavbar, Container, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Navbar = () => {
	const [error, setError] = useState("")
	const navigate = useNavigate()
	const { logOut, currentUser } = useAuth()
	const handleLogout = async () => {
		setError("")
		try {
			await logOut()
			navigate("/signin")
		} catch {
			setError("Failed to log out")
		}
	}

	return (
		<>
			<BootstrapNavbar bg="dark" variant="dark" style={{ position: "fixed", width: "100%", zIndex: 999, top: 0 }}>
				<Container>
					<BootstrapNavbar.Brand href="/">Resume Builder</BootstrapNavbar.Brand>
					{/* <Nav className="me-auto"></Nav> */}
					{currentUser && <Button onClick={handleLogout}>LOGOUT</Button>}
				</Container>
			</BootstrapNavbar>
			<Alert variant="danger" style={{ display: error ? "block" : "none" }}>
				{error}
			</Alert>
		</>
	)
}

export default Navbar
