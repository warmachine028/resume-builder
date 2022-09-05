import "react-phone-number-input/style.css"
import PhoneInput from "react-phone-number-input"
import { useState } from "react"
import { Card, Form, Button, Alert, Container } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const SignIn = () => {
	const [number, setNumber] = useState("")
	const [OTP, setOTP] = useState("")
	const [showOTPForm, setShowOTP] = useState(false)
	const [confirmObj, setConfirmObj] = useState("")
	const navigate = useNavigate()
	const { setupRecaptcha } = useAuth()
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)

	const handleSubmit = async event => {
		event.preventDefault()
		// Validate
		if (!number || number === undefined) {
			return setError("Please enter a valid phone no.")
		}

		setError()
		try {
			setLoading(true)
			const response = await setupRecaptcha(number)
			setConfirmObj(response)
			setShowOTP(true)
		} catch (error) {
			setError(error.message)
		}
		setLoading(false)
	}
	const verifyOTP = async event => {
		event.preventDefault()
		// Validate
		if (!OTP) {
			return setError("Please enter yout OTP")
		}
		setError()
		try {
			setLoading(true)
			await confirmObj.confirm(OTP)
			navigate("/")
		} catch (error) {
			setError(error.message)
		}
		setLoading(false)
	}

	return (
		<Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
			<div className="w-100" style={{ maxWidth: 400 }}>
				<Card>
					<Card.Body
						style={{
							boxShadow: "#afafaf 1px 2px 9px 2px",
						}}
					>
						<h2 className="text-center mb-4">SIGN IN</h2>
						<Alert variant="danger" style={{ display: error ? "block" : "none" }}>
							{error}
						</Alert>
						<Form onSubmit={handleSubmit} style={{ display: showOTPForm ? "none" : "block" }}>
							<Form.Group id="tel" className="mb-3" controlId="formBasicPhoneNumber">
								<PhoneInput default="IN" value={number} onChange={setNumber} palceholder="Enter Phone Number"></PhoneInput>
							</Form.Group>
							<div id="recaptcha-container" />
							<Link to="/">
								<Button variant="secondary" className="w-100 mt-2">
									CANCEL
								</Button>
							</Link>
							<Button type="submit" className="w-100 mt-2" variant="success" disabled={loading}>
								SEND OTP
							</Button>
						</Form>

						<Form onSubmit={verifyOTP} style={{ display: showOTPForm ? "block" : "none" }}>
							<Form.Group id="tel" className="mb-3 mt-3" controlId="formBasicOtp">
								<Form.Control type="text" placeholder="Enter OTP" onChange={e => setOTP(e.target.value)}></Form.Control>
							</Form.Group>
							<div id="recaptcha-container" />
							<Link to="/">
								<Button variant="secondary" className="w-100 mt-2">
									CANCEL
								</Button>
							</Link>
							<Button type="submit" className="w-100 mt-2" variant="success" disabled={loading}>
								VERIFY OTP
							</Button>
						</Form>
					</Card.Body>
				</Card>
			</div>
		</Container>
	)
}

export default SignIn
