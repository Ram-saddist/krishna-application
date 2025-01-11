import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
export default function Navigation() {
    const patientId = localStorage.getItem("patientId")
    const navigate=useNavigate()
    function logout(){
        localStorage.removeItem("patientId")
        navigate("/")
    }
    return (
        <div>
            {
                patientId ? (
                    <div>
                        <Link to="/">Home</Link>
                        <Link onClick={logout}>Logout</Link>
                    </div>
                ) : (
                    <div>
                        <Link to="/">Home</Link>
                        <Link to="/register">Register</Link>
                        <Link to="/login">Login</Link>
                    </div>
                )
            }



        </div>
    )
}
