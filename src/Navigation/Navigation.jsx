import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navigation.css'

export default function Navigation() {
    const patientId = localStorage.getItem("patientId")
    const isAdmin = localStorage.getItem("isAdmin")
    console.log("admin info", isAdmin)
    const navigate = useNavigate()
    function logout() {
        localStorage.removeItem("patientId")
        localStorage.removeItem("isAdmin")
        navigate("/")
    }
    return (
        <div className='navbar'>
            <Link to="/">Home</Link>
            {
                isAdmin === "admin" ? (
                    <div>
                        <Link to="/manage-appointments">Manage Appointments</Link>
                        <Link onClick={logout}>Logout</Link>
                    </div>
                ) : (
                    <div>
                        {
                            patientId ? (
                                <div>
                                    <Link onClick={logout}>Logout</Link>
                                </div>
                            ) : (
                                <div>

                                    <Link to="/register">Register</Link>
                                    <Link to="/login">Login</Link>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}
