import { useEffect, useMemo, useState } from "react"
import { Container, Row, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const Experience = () => {
	document.title = "Experience Level"
	const newUserObject = JSON.parse(localStorage.getItem("user"))
	const userObject = useMemo(() => {
		return { student: false, experience: 0 }
	}, [])
	const [experience, setExperience] = useState(null)
	const [studentcontainer, showStudentContainer] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		if (newUserObject !== null && newUserObject.experience !== null) {
			navigate("/selectcountry")
		}
	}, [navigate, newUserObject])

	useEffect(() => {
		if (experience !== null && experience < 2) {
			showStudentContainer(true)
		} else if (experience > 1) {
			userObject.experience = experience
			localStorage.setItem("user", JSON.stringify(userObject))
			navigate("/selectcountry")
		}
	}, [experience, navigate, userObject])

	const handleSubmit = event => {
		userObject.experience = experience
		userObject.student = event.target.value === "true"
		localStorage.setItem("user", JSON.stringify(userObject))
		navigate("/selectcountry")
	}

	return (
		<Container style={{ marginTop: 50 }}>
			<div>
				<Row style={{ textAlign: "center" }}>
					<h3 style={{ fontWeight: 300, fontSize: 30, color: "#0772f9" }}>How long have you been working?</h3>
					<h5 style={{ fontWeight: 100 }}>We'll find the best templates for your experience level.</h5>
				</Row>
				<Row style={{ display: "flex", justifyContent: "center" }}>
					<Button variant="outline-primary" className="rounded-0 p-3" style={{ width: 180, margin: 10 }} onClick={() => setExperience(0)}>
						No Experience
					</Button>
					<Button variant="outline-primary" className="rounded-0 p-3" style={{ width: 180, margin: 10 }} onClick={() => setExperience(1)}>
						Less than 3 years
					</Button>
					<Button type="submit" variant="outline-primary" className="rounded-0 p-3" style={{ width: 180, margin: 10 }} onClick={() => setExperience(2)}>
						3-5 Years
					</Button>
					<Button type="submit" variant="outline-primary" className="rounded-0 p-3" style={{ width: 180, margin: 10 }} onClick={() => setExperience(3)}>
						5-10 Years
					</Button>
					<Button type="submit" variant="outline-primary" className="rounded-0 p-3" style={{ width: 180, margin: 10 }} onClick={() => setExperience(4)}>
						10+ Years
					</Button>
				</Row>
			</div>
			<div style={{ marginTop: 40, display: studentcontainer ? "block" : "none" }}>
				<Row style={{ textAlign: "center" }}>
					<h3 style={{ fontWeight: 300, fontSize: 25, color: "#0772f9", marginBottom: 20 }}>Are you a student?</h3>
				</Row>
				<Row style={{ display: "flex", justifyContent: "center" }}>
					<Button type="submit" variant="outline-primary" className="rounded-0 p-3" style={{ width: 180, marginRight: 10 }} value={true} onClick={handleSubmit}>
						Yes
					</Button>
					<Button type="submit" variant="outline-primary" className="rounded-0 p-3" style={{ width: 180, marginRight: 10 }} value={false} onClick={handleSubmit}>
						No
					</Button>
				</Row>
			</div>
		</Container>
	)
}

export default Experience
