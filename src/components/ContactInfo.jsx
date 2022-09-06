import { useRef, useState } from "react"
import { Container, Row, Button, Form } from "react-bootstrap"
import { savePDF } from "@progress/kendo-react-pdf"

import Resume from "./Resumes/resume1"

const ContactInfo = () => {
	document.title = "Contact Info"
	const userObject = JSON.parse(localStorage.getItem("user"))
	const resumeData = userObject.resumeData
	const contentArea = useRef(null)

	const initialState = {
		firstName: resumeData?.firstName || "",
		lastName: resumeData?.lastName || "",
		profession: resumeData?.profession || "",
		image: resumeData?.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
		city: resumeData?.city || "",
		country: resumeData?.country || "",
		pinCode: resumeData?.pinCode || "",
		phone: resumeData?.phone || "",
		email: resumeData?.email || "",
		gist: resumeData?.gist || "",
	}
	const download = () => savePDF(contentArea.current, { fileName: `RESUME_${initialState.firstName} ${initialState.lastName}` })
	const [formData, setFormData] = useState(initialState)
	const uploadFile = e => {
		const reader = new FileReader()
		const file = e.target.files[0]
		reader.readAsDataURL(file)
		reader.onloadend = () => {
			const data = { ...formData, [e.target.name]: reader.result }
			setFormData(data)
			userObject.resumeData = data
			localStorage.setItem("user", JSON.stringify(userObject))
		}
	}

	const handleChange = e => {
		const data = { ...formData, [e.target.name]: e.target.value }
		setFormData(data)
		userObject.resumeData = data
		localStorage.setItem("user", JSON.stringify(userObject))
	}

	return (
		<Container
			style={{
				marginTop: 50,
				display: "flex",
				flexDirection: "column",
				maxWidth: "100%",
				alignItems: "center",
			}}
		>
			<div>
				<Row style={{ textAlign: "left" }}>
					<h3 style={{ fontWeight: 300, fontSize: 28, color: "#0772f9" }}>What's the best way for employers to contact you?</h3>
					<h4 style={{ fontWeight: 350, fontSize: 21, marginBottom: 20, color: "#363636" }}>We suggest including an email and phone number.</h4>
				</Row>
				<Form>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							width: "100%",
						}}
					>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								flexWrap: "wrap",
								width: "150px",
								justifyContent: "flex-start",
								margin: "31px 20px 16px 14px",
							}}
						>
							<img
								alt="profile"
								style={{
									width: 144,
									height: 200,
									background: "#cbe3fe",
									objectFit: "cover",
								}}
								src={formData.image}
							/>
							<input name="image" type="file" id="photo" style={{ display: "none" }} multiple={false} onChange={uploadFile} accept="image/*" />
							<Button
								variant="outline-primary"
								className="rounded-0"
								style={{ width: 144, margin: 10, fontSize: 12, fontWeight: 500, height: 40 }}
								onClick={() => document.getElementById("photo").click()}
							>
								UPLOAD PHOTO
							</Button>
						</div>
						<div
							style={{
								margin: "0 46px",
								display: "flex",
								flexDirection: "column",
							}}
						>
							<div
								style={{
									width: 456,
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
								}}
							>
								<Form.Group style={{ width: "230px" }} className="mb-3 row input-group">
									<Form.Label style={{ fontWeight: 500, paddingLeft: 0 }}>First Name</Form.Label>
									<Form.Control type="text" placeholder="eg. John" onChange={handleChange} name="firstName" value={formData.firstName} />
								</Form.Group>
								<Form.Group style={{ width: "230px" }} className="mb-3 row input-group">
									<Form.Label style={{ fontWeight: 500, paddingLeft: 0 }}>Surname</Form.Label>
									<Form.Control type="text" placeholder="eg. Doe" onChange={handleChange} name="lastName" value={formData.lastName} />
								</Form.Group>
							</div>
							<div
								style={{
									width: 456,
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
								}}
							>
								<Form.Group style={{ width: "-webkit-fill-available" }} className="mb-3 row input-group">
									<Form.Label style={{ fontWeight: 500, paddingLeft: 0 }}>Profession</Form.Label>
									<Form.Control type="text" placeholder="eg. Software Engineer" onChange={handleChange} name="profession" value={formData.profession} />
								</Form.Group>
							</div>
							<div
								style={{
									width: 456,
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
								}}
							>
								<Form.Group style={{ width: "230px" }} className="mb-3 row input-group">
									<Form.Label style={{ fontWeight: 500, paddingLeft: 0 }}>City</Form.Label>
									<Form.Control className="" type="text" placeholder="eg. New Delhi" onChange={handleChange} name="city" value={formData.city} />
								</Form.Group>
								<Form.Group style={{ width: "230px" }} className="mb-3 row input-group" controlId="formBasicPassword">
									<Form.Label style={{ fontWeight: 500, paddingLeft: 0 }}>Country</Form.Label>
									<Form.Control className="" type="text" placeholder="eg. India" onChange={handleChange} name="country" value={formData.country} />
								</Form.Group>
							</div>
							<div
								style={{
									width: 456,
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
								}}
							>
								<Form.Group style={{ width: "230px" }} className="mb-3 row input-group" controlId="formBasicEmail">
									<Form.Label style={{ fontWeight: 500, paddingLeft: 0 }}>Pin Code</Form.Label>
									<Form.Control className="" type="text" placeholder="eg. 110034" onChange={handleChange} name="pinCode" value={formData.pinCode} />
								</Form.Group>
							</div>
							<div
								style={{
									width: 456,
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
								}}
							>
								<Form.Group style={{ width: "230px" }} className="mb-3 row input-group">
									<Form.Label style={{ fontWeight: 500, paddingLeft: 0 }}>Phone</Form.Label>
									<Form.Control className="" type="tel" placeholder="eg. +91 22 1234 5677" onChange={handleChange} name="phone" value={formData.phone} />
								</Form.Group>
								<Form.Group style={{ width: "230px" }} className="mb-3 row input-group">
									<Form.Label style={{ fontWeight: 500, paddingLeft: 0 }}>Email</Form.Label>
									<Form.Control className="" type="email" placeholder="eg. john.doe@email.com" onChange={handleChange} name="email" value={formData.email} />
								</Form.Group>
							</div>
							<div
								style={{
									width: 456,
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
								}}
							>
								<Form.Group style={{ width: "-webkit-fill-available" }} className="mb-3 row input-group">
									<Form.Label style={{ fontWeight: 500, paddingLeft: 0 }}>Brief Introduction</Form.Label>
									<Form.Control as="textarea" rows={5} type="text" placeholder="eg. Software Engineer" onChange={handleChange} name="gist" value={formData.gist} />
								</Form.Group>
							</div>
						</div>
						<div>
							<Resume data={formData} _ref={contentArea} />
						</div>
					</div>

					<div style={{ display: "flex", justifyContent: "space-between", marginTop: 40 }}>
						<Button variant="outline-primary" className="rounded-0" style={{ width: 120, margin: 10 }} href="/select-resume">
							BACK
						</Button>

						<Button className="rounded-0" style={{ width: "auto", margin: 10, backgroundColor: "#e24546", border: "none", padding: "10px 40px" }} onClick={download}>
							DOWNLOAD RESUME
						</Button>
					</div>
				</Form>
			</div>
		</Container>
	)
}

export default ContactInfo
