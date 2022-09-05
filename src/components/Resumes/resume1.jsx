import React from "react"
import { Container } from "react-bootstrap"

const Resume = ({ _ref, data }) => {
	const initialState = {
		name: "Your Name",
		profession: "Profession",
		image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
		address: "City, Country, Pin Code",
		phone: "Phone Number ",
		email: "email ID",
		gist: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati a aliquid quo repellendus omnis quibusdam vero id sint similique placeat, delectus odio sapiente. Soluta natus dolores explicabo earum consectetur laudantium!, Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat quidem error mollitia, numquam ipsum illo debitis ab odit ullam consequatur",
	}
	return (
		<Container
			ref={_ref}
			style={{
				position: "relative",
				width: "21cm",
				height: "29.7cm",
				display: "flex",
				justifyContent: "center",
				border: "1px solid #b3b3b3",
				boxShadow: "2px 0px 7px 2px #adadad",
			}}
		>
			<div
				style={{
					margin: "10mm 13mm",
					width: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<div
					style={{
						width: "100%",
						display: " flex",
						justifyContent: "space-between",
						alignSelf: "flex-start",
					}}
				>
					<div
						style={{
							color: "#787878",
							alignSelf: "flex-start",
						}}
					>
						{data.firstName && data.lastName ? (
							<h1>
								{`${data.firstName}   ${data.lastName}`}
							</h1>
						) : (
							<h1>{data.firstName || data.lastName || initialState.name}</h1>
						)}
						<p>{data.profession || initialState.profession}</p>
						<div>
							<div
								style={{
									display: "flex",
									alignItems: "center",
								}}
							>
								<img src="https://img.icons8.com/arcade/344/experimental-marker-arcade.png" alt="location" width="25" style={{ marginRight: 5 }} />
								{data.city && data.country && data.pinCode ? `${data.city}, ${data.country}, ${data.pinCode}` : `${data.city}` || `${data.country}` || initialState.address}
							</div>
							<div
								style={{
									display: "flex",
									alignItems: "center",
								}}
							>
								<img src="https://img.icons8.com/fluency/344/phone-disconnected.png" alt="location" width="25" style={{ marginRight: 5, transform: "rotate(271deg)" }} />
								{data.phone || initialState.phone}
							</div>
							<div
								style={{
									display: "flex",
									alignItems: "center",
								}}
							>
								<img src="https://img.icons8.com/fluency/344/mail.png" width="25" style={{ marginRight: 5 }} alt="email" />
								{data.email || initialState.email}
							</div>
						</div>
					</div>
					<img
						alt="profile"
						style={{
							width: 144,
							height: 180,
							background: "#cbe3fe",
							objectFit: "cover",
						}}
						src={data.image || initialState.image}
					/>
				</div>
				<div
					style={{
						fontSize: 14,
						textAlign: "justify",
						marginTop: 10,
						color: "#5b5b5b",
					}}
				>
					{data.gist || initialState.gist}
				</div>
			</div>
		</Container>
	)
}

export default Resume
