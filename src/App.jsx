import AuthProvider from "./context/AuthContext"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Navbar from "./components/Navbar"
import SignIn from "./components/SignIn"
import Dashboard from "./components/Dashboard"
import Experience from "./components/Experience"
import SelectCountry from "./components/SelectCountry"
import ChooseTemplate from "./components/ChooseTemplate"
import SelectResume from "./components/SelectResume"
import ContactInfo from "./components/ContactInfo"
// import Resume from './components/Resumes/resume1'

import PrivateRoute from "./components/PrivateRoute"
import AuthRoute from "./components/AuthRoute"

const App = () => {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Navbar />
				<div style={{ margin: '100px 0' }}>
					<Routes>
						<Route path="/signin" element={<AuthRoute component={<SignIn />} />} />
						<Route path="/" element={<PrivateRoute component={<Dashboard />} />} />
						<Route path="/experience-level" element={<PrivateRoute component={<Experience />} />} />
						<Route path="/selectcountry" element={<PrivateRoute component={<SelectCountry />} />} />
						<Route path="/choose-template" element={<PrivateRoute component={<ChooseTemplate />} />} />
						<Route path="/select-resume" element={<PrivateRoute component={<SelectResume />} />} />
						<Route path="/cntc" element={<PrivateRoute component={<ContactInfo />} />} />
						{/* <Route path="/resume" element={<PrivateRoute component={<Resume />} />} /> */}
					</Routes>
				</div>
			</BrowserRouter>
		</AuthProvider>
	)
}

export default App
