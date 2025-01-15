import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mobile, setMobile] = useState('')
    const [disease, setDisease] = useState('')
    const navigate = useNavigate
    function handleRegister(e){
        e.preventDefault()
        axios.post("https://hospital-mern-2644.onrender.com/api/patients/addpatient",{name, email, password, mobile, disease})
        .then((res)=>{
            console.log(res)
            if(res.status===201){
                alert("Patient Registration successful")
                navigate("/login")
            }
        })
        .catch((error)=>{
            console.log(error.status);
        })
    }
  return (
    <div>
        <div className="container mt-5 col-12 col-sm-7 col-md-5 col-lg-5">
        <form onSubmit={handleRegister}>
            <div className="form-group">
                <label htmlFor="firstname">Name</label>
                <input type="text" className="form-control" id="firstname" placeholder="John" onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="mobile">Mobile</label>
                <input type="text" className="form-control" id="mobile" placeholder="Enter your 10-digit phone number" onChange={(e)=>setMobile(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" id="email" placeholder="@gmail.com" onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="first name">Disease</label>
                <input type="text" className="form-control" id="disease" placeholder="Ex: Cold, Fever..." onChange={(e)=>setDisease(e.target.value)}/>
            </div>
            <div className="form-group">
                <div className="col-sm-10">
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </div>
            </div>


        </form>




    </div>
      
    </div>
  )
}
