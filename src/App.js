import React, { useState, useEffect } from 'react'
import NavBar from './components/navbar'
import { jwtDecode } from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { startGetUserAccount } from './actions/userAction'
import { Route, Routes } from 'react-router-dom'
import RegistrationForm from "./components/registrationForm"
import LoginForm from "./components/loginForm"
import AccountInfo from "./components/accountInfo"
import Home from "./components/home"
import FileUploadForm from './components/fileUpload'
import EmployeeList from './components/empList'
import { EmployeeProvider } from './components/empContext'
import EditEmployee from './components/empEdit'

import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [role, setRole] = useState('')
    const dispatch = useDispatch()

    const handleAuth = () => {
        setUserLoggedIn(!userLoggedIn) 
    }

    useEffect(() => {
        if(userLoggedIn) {
            const token = localStorage.getItem('token')
            const decoded = jwtDecode(token)
            const userRole = decoded.role
            setRole(userRole)
        }
    }, [ userLoggedIn ])

    useEffect(() => {
        if(localStorage.getItem('token')) {
            handleAuth()
            dispatch(startGetUserAccount())
        }
    }, [ dispatch ])

    return (
        <div>
            <NavBar userLoggedIn={userLoggedIn} handleAuth={handleAuth} role={role} />
            <EmployeeProvider>
              <div className="container mt-4">
                    <Routes>
                        <Route path="/" element={<Home />} exact={true} />
                        <Route path="/register" element={<RegistrationForm />} exact={true} />
                        <Route path="/login" element={<LoginForm handleAuth={handleAuth} />} exact={true} /> 
                        <Route path="/account" element={<AccountInfo />} exact={true} />
                        <Route path='/create-employee' element={<FileUploadForm />} exact={true} />
                        <Route path='/employees-list' element={<EmployeeList />} exact={true} /> 
                        <Route path='/edit/:id' element={<EditEmployee />} exact={true} />
                    </Routes>
                </div>
            </EmployeeProvider>
        </div>
    )
}

export default App
