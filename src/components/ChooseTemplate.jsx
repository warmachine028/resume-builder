import { useState, useEffect } from "react"
import { Container, Row, Button, Card, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import templates from "../data/templates"
import "../styles/ChooseTemplate.css"

const level = {
	0: "jobseekers",
	1: "Less than 3 Years",
	2: "3-5 Years",
	3: "5-10 Years",
	4: "10+ Years",
}

const ChooseTemplate = () => {
	document.title = "Choose Template"
	const userObject = JSON.parse(localStorage.getItem("user"))
	const experience = userObject?.experience
	const [selected, setSelected] = useState(0)
	const navigate = useNavigate()

	useEffect(() => {
		if (userObject.country === null) {
			navigate("/selectcountry")
		}
		if (userObject.template !== undefined) {
			navigate("/select-resume")
		}
	}, [userObject.country, userObject.template, navigate])
	
	const handleSubmit = () => {
		userObject.template = selected
		localStorage.setItem("user", JSON.stringify(userObject))
		navigate("/select-resume")
	}

	return (
		<div>
			<Container style={{ marginTop: 20 }}>
				<div style={{ marginTop: 40 }}>
					<Row style={{ textAlign: "center" }}>
						<h3 style={{ fontWeight: 300, fontSize: 35, color: "#0772f9", marginBottom: 10 }}>
							Choose from our <strong style={{ fontWeight: 500 }}>best templates</strong> for {level[experience]}{" "}
							<strong style={{ fontWeight: 500 }}>{experience > 1 ? "of experience" : "with little experience"}</strong>
						</h3>
						<h4 style={{ fontWeight: 400, fontSize: 24, marginBottom: 20, color: "#363636" }}>You can always change your template later.</h4>
					</Row>
					<Row xs={1} md={3} xl={3} className="g-4">
						{templates.map(({ id, preview, name, recommended }) => {
							const isSelected = selected === id

							return (
								<Col key={id}>
									<Card style={{ border: "none", position: "relative" }} onClick={() => setSelected(id)}>
										<span
											style={{
												height: 25,
												width: 25,
												backgroundColor: "#0772f9",
												borderRadius: "50%",
												color: "white",
												position: "absolute",
												top: 15,
												right: 15,
												display: isSelected ? "flex" : "none",
												justifyContent: "center",
											}}
										>
											✓
										</span>
										<Card.Img
											className="template"
											variant="top"
											src={preview}
											id={id}
											style={{
												
												height: "100%",
												boxShadow: "2px 3px 8px #9b9b9b",
												border: isSelected && "solid #0772f9 3px",
											}}
										/>
										<Card.Body id={id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 1 }}>
											<Card.Title style={{ fontWeight: 500, fontStyle: "italic", color: "gray", fontSize: 15, marginBottom: 0, textTransform: "capitalize", }}>{name}</Card.Title>
											{recommended && <label style={{ fontWeight: 600, color: "#ea9a04", fontSize: 15 }}>RECOMMENDED</label>}
										</Card.Body>
									</Card>
								</Col>
							)
						})}
					</Row>
				</div>
			</Container>
			<div
				style={{
					position: "fixed", //
					bottom: 0,
					width: "100%",
					height: 70,
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "white",
					boxShadow: "0.4px -2px 2px 0px #9b9b9b",
				}}
			>
				<Button type="submit" variant="outline-primary" className="rounded-0 p-2" style={{ width: 180, margin: 10 }} href="/select-resume">
					CHOOSE LATER
				</Button>
				<Button type="submit" className="rounded-0 p-2" style={{ width: 180, margin: 10, backgroundColor: "#e24546", border: "none" }} onClick={handleSubmit}>
					CHOOSE TEMPLATE
				</Button>
			</div>
		</div>
	)
}

export default ChooseTemplate
