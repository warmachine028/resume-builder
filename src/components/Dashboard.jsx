import React, { useEffect } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import resume from "../images/resume.png"

const Dashboard = () => {
	document.title = "Start Here"
	const userObject = JSON.parse(localStorage.getItem("user"))

	const navigate = useNavigate()

	useEffect(() => {
		if (userObject && userObject.experience !== null) {
			navigate("/selectcountry")
		}
	}, [userObject?.experience, navigate, userObject])

	return (
		<Container className="w-400" style={{ marginTop: 300 }}>
			<Row>
				<Col style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
					<h1 style={{ fontWeight: 300, fontSize: 43 }}>
						Just three <span style={{ color: "#0772f9", fontWeight: 400 }}>simple</span> steps
					</h1>
					<ol style={{ display: "grid", rowGap: 10, color: "#5b5a5a", margin: "36px 5px" }}>
						<li>Select a template from our library of professional designs</li>
						<li>Build your resume with our industry-specific bullet points</li>
						<li>Download your resume, print it out and get it ready to send!</li>
					</ol>
				</Col>
				<Col style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
					<img src={resume} alt="resume" width="300" />
					<Button type="submit" className="rounded-0 mt-5" href="/experience-level" style={{ width: 288 }}>
						CREATE MY RESUME
					</Button>
				</Col>
			</Row>
		</Container>
	)
}

export default Dashboard
