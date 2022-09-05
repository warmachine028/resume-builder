import { useEffect, useRef } from "react"
import { Container, Row, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const SelectCountry = () => {
	document.title = "Select Country"
	const userObject = JSON.parse(localStorage.getItem("user"))
	const country = useRef("")

	const navigate = useNavigate()

	const handleSubmit = () => {
		userObject.country = country.current.value
		localStorage.setItem("user", JSON.stringify(userObject))
		navigate("/choose-template")
	}

	useEffect(() => {
		if (!userObject || userObject.experience === null) {
			navigate("/experience-level")
		}
		if (userObject?.country) {
			navigate("/choose-template")
		}
	}, [userObject, userObject?.experience, userObject?.country, navigate])

	return (
		<Container style={{ marginTop: 150, width: 550 }}>
			<div style={{ marginTop: 40 }}>
				<Row style={{ textAlign: "center" }}>
					<h3 style={{ fontWeight: 300, fontSize: 25, color: "#0772f9", marginBottom: 10 }}>Where are you focussing your job search?</h3>
					<h4 style={{ fontWeight: 100, fontSize: 20, marginBottom: 20 }}>We'll recomment the right templates for your target country.</h4>
				</Row>
			</div>
			<div style={{ padding: "0 90px" }}>
				<label>Select a Country</label>
				<select className="form-select" ref={country}>
					<option value="Afghanistan">Afghanistan</option>
					<option value="Argentina">Argentina</option>
					<option value="Austrailia">Austrailia</option>
					<option value="Germany">Germany</option>
					<option value="India">India</option>
					<option value="Philipines">Philipines</option>
					<option value="USA">USA</option>
				</select>
				<Button
					type="submit"
					className="rounded-0"
					style={{
						backgroundColor: "#e24546",
						border: "none",
						fontWeight: 500,
						margin: "30px 5px",
						width: "-webkit-fill-available",
						padding: "10px 0",
					}}
					onClick={handleSubmit}
				>
					SEE TEMPLATES
				</Button>
			</div>
		</Container>
	)
}

export default SelectCountry
