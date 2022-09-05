import { useState } from "react"
import { Container, Row, Button, Modal } from "react-bootstrap"
import UploadIcon from "../images/upload.png"
import AcceptedIcon from "../images/accepted.jpg"
import RejectedIcon from "../images/rejected.jpg"
import { useNavigate } from "react-router-dom"

const SelectResume = () => {
	document.title = "Resume Option"

	const initialFile = { file: null, fileName: "" }
	const userObject = JSON.parse(localStorage.getItem("user"))
	const [rejected, setRejected] = useState(false)
	const [upload, setUpload] = useState(false)
	const [dragging, setDragging] = useState(false)
	const [file, setFile] = useState(initialFile)
	const navigate = useNavigate()
	const [show, setShow] = useState(false)

	const handleUpload = () => setUpload(prev => !prev)

	const handleBack = () => {
		if (upload) {
			return setUpload(false)
		}
		userObject.template = undefined
		localStorage.setItem("user", JSON.stringify(userObject))
		navigate("/choose-template")
	}
	const uploadFile = e => {
		setRejected(false)
		const validFiles = [
			"application/msword", //
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			"application/pdf",
			"text/html",
			"text/plain",
		]
		const file = e.dataTransfer?.files[0] || e.target.files[0]
		if (!validFiles.includes(file.type)) {
			setRejected(true)
		}
		setFile({ file: file, fileName: file.name })
	}
	const fileDrop = e => {
		e.preventDefault()
		setDragging(false)
		uploadFile(e)
	}
	const handleCancel = () => {
		userObject.file = file.file
		localStorage.setItem("user", JSON.stringify(userObject))
		navigate("/cntc")
	}
	const handleNewResume = () => {
		navigate("/cntc")
	}

	return (
		<Container style={{ marginTop: 50, display: "flex", flexDirection: "column" }}>
			<Overlay show={show} setShow={setShow} handleCancel={handleCancel} handleNewResume={handleNewResume} />
			<div>
				<Row style={{ textAlign: "center" }}>
					<h3 style={{ fontWeight: 300, fontSize: 28, color: "#0772f9" }}>How do you want to start?</h3>
				</Row>
				<div style={{ display: "flex", justifyContent: upload ? "center" : "space-between", padding: "0 90px", marginTop: 40 }}>
					<div
						style={{
							cursor: "pointer",
							textAlign: "center",
							flexDirection: "column",
							alignItems: "center",
							border: "1px solid #0772f9",
							height: 220,
							justifyContent: "center",
							width: 350,
							padding: "0 44px",
							display: upload ? "none" : "flex",
						}}
						onClick={setShow}
					>
						<img height="100" alt="create" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROjjZPFjCS9dic82Bc-q-o2jxgvBhou31DN2vqD-CXuA&s" />
						<label>CREATE A NEW RESUME</label>
						<p>We will help you create a resume step-by-step.</p>
					</div>
					<div
						style={{
							cursor: "pointer",
							textAlign: "center",
							flexDirection: "column",
							alignItems: "center",
							border: "1px solid #e8ecf0",
							boxShadow: "0 0 6px rgb(88 88 95 / 11%)",
							height: 220,
							justifyContent: "center",
							width: 350,
							padding: "0 44px",
							display: upload ? "none" : "flex",
						}}
						onClick={handleUpload}
					>
						<img height="100" src={UploadIcon} alt="upload" />
						<label>I ALREADY HAVE A RESUME</label>
						<p>We will help you create a resume step-by-step.</p>
					</div>
					<div
						style={{
							cursor: "pointer",
							textAlign: "center",
							flexDirection: "column",
							alignItems: "center",
							border: dragging ? "5px dashed #656566" : "1px solid #0772f9",
							borderRadius: dragging ? 5 : 0,
							boxShadow: "0 0 6px rgb(88 88 95 / 11%)",
							height: 290,
							justifyContent: "center",
							width: 400,
							padding: "0 44px",
							display: upload ? "flex" : "none",
							position: "relative",
						}}
						onDragEnter={() => setDragging(true)}
						onDragOver={e => e.preventDefault()}
						onDrop={fileDrop}
					>
						<span
							onDragEnter={() => setDragging(true)}
							onDragLeave={() => setDragging(false)}
							onDragOver={e => e.preventDefault()}
							onDrop={fileDrop}
							style={{
								height: "100%",
								width: "100%",
								backgroundColor: "#f4f4f4ba",
								position: "absolute",
								zIndex: 10,
								display: dragging ? "flex" : "none",
								justifyContent: "center",
							}}
						/>
						<div style={{ position: "absolute", top: 7, right: 10 }} onClick={handleUpload}>
							❌
						</div>
						<label style={{ fontSize: 20 }}>UPLOAD MY RESUME</label>
						<div style={{ display: file.file ? "none" : "block" }}>
							<img height="100" src={UploadIcon} alt="upload" />
							<input type="file" style={{ display: "none" }} multiple={false} id="upload" onChange={uploadFile} accept=".doc,.docx,.pdf,.htm,.rtf,.txt" />
							<Button className="rounded-0 p-2" style={{ width: 270 }} onClick={() => document.getElementById("upload").click()}>
								BROWSE
							</Button>
							<p style={{ fontSize: 13, marginBottom: 0 }}>
								or drag and drop your file into this box.
								<br />
							</p>
						</div>
						<div style={{ display: file.file ? "flex" : "none", flexDirection: "column", alignItems: "center" }}>
							<img height="60" src={rejected ? RejectedIcon : AcceptedIcon} alt="icon" />
							<h6 style={{ fontWeight: 400, fontSize: 15, color: "grey" }}>{file.fileName}</h6>
							<div style={{ display: "flex" }}>
								<Button
									type="submit"
									className="rounded-0 p-2"
									style={{
										width: "auto",
										display: rejected ? "block" : "none",
										backgroundColor: "#e24546",
										border: "none",
										margin: rejected ? "19px 39px 19px 3px" : "19px 0",
									}}
									onClick={() => document.getElementById("upload").click()}
								>
									BROWSE
								</Button>
								<Button variant="outline-dark" className="rounded-0 p-2" style={{ width: "auto", margin: "19px 0" }} onClick={() => setFile(initialFile)}>
									CHANGE
								</Button>
							</div>
						</div>
						<p style={{ fontSize: 13, marginBottom: 0 }}>
							<strong>Accepted file types:</strong>
							<br />
							DOC, DOCX, PDF, HTM, RTF, TXT
						</p>
					</div>
				</div>

				<div style={{ display: "flex", justifyContent: "space-between", padding: "0 90px", marginTop: 40 }}>
					<Button type="submit" variant="outline-primary" className="rounded-0 p-2" style={{ width: 180, margin: 10 }} onClick={handleBack}>
						BACK
					</Button>

					<Button type="submit" className="rounded-0 p-2" style={{ width: 180, margin: 10, backgroundColor: "#e24546", border: "none" }} onClick={setShow}>
						NEXT
					</Button>
				</div>
			</div>
		</Container>
	)
}

function Overlay({ show, setShow, handleCancel, handleNewResume }) {
	const handleClose = () => setShow(false)

	return (
		<Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show}>
			<div
				style={{
					height: 343,
					borderRadius: 0,
					border: "1px #0772f9 solid",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					posiiton: "relative",
					padding: 117,
				}}
			>
				<Modal.Header
					closeButton
					style={{
						position: "absolute",
						top: 0,
						right: 0,
					}}
					onClick={handleClose}
				/>
				<label
					style={{
						fontSize: 47,
						color: "#0772f9",
						fontWeight: 200,
					}}
				>
					Create New Resume?
				</label>
				<label
					style={{
						fontSize: 25,
						textAlign: "center",
						fontWeight: 400,
					}}
				>
					By Selecting Create New Resume, your content will be permanently deleted.
				</label>
				<div style={{ display: "flex", justifyContent: "space-between", padding: "0 90px", marginTop: 40 }}>
					<Button type="submit" variant="outline-primary" className="rounded-0 p-2" style={{ width: 180, margin: 10 }} onClick={handleCancel}>
						CANCEL
					</Button>

					<Button type="submit" className="rounded-0 p-2" style={{ width: 180, margin: 10, backgroundColor: "#e24546", border: "none" }} onClick={handleNewResume}>
						CREATE NEW RESUME
					</Button>
				</div>
			</div>
		</Modal>
	)
}

export default SelectResume
