import React,{useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export default function Login() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate()
    function handleLogin(e){
        e.preventDefault()
        axios.post("https://hospital-mern-2644.onrender.com/api/patients/login",{email,password})
            .then((res)=>{
                console.log(res)
                if(res.status===200){
                    alert("Login successful")
                    localStorage.setItem("patientId",res.data.patientid)
                    navigate("/")
                }
            })
            .catch((error)=>{
                //console.log(error)
                if(error.status===400)
                    alert("Incorrect password")
                else if(error.status===404)
                    alert("User not found")
            })
    }
    return (
        <div className='container mt-4 '>
            <div className='row d-flex justify-content-center'>
                <form className='col-12 col-md-5' onSubmit={handleLogin}>
                    <div className='mb-2'>
                        <h2 className='text-center'>Login</h2>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" placeholder='ex:sivaram@gmail.com' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" placeholder='*****' className="form-control" id="exampleInputPassword1" onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}
