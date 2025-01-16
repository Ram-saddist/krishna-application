import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
export default function ManageAppointments() {
    const [appointments,setAppointments]=useState([])
    useEffect(()=>{
        fetchAppointments()
    },[])
    async function fetchAppointments(){
        await axios.get("https://hospital-mern-2644.onrender.com/api/appointments")
            .then((res)=>{
                console.log(res.data)
                setAppointments(res.data)
            })
    }
    async function confirmAppointment(id){
        console.log(id)
        await axios.put(`https://hospital-mern-2644.onrender.com/api/appointments/confirm/${id}`)
            .then((res)=>{
                console.log(res)
                if(res.status===204){
                    alert("Appointment booked")
                }
                fetchAppointments()
            })
    }
    async function cancelAppointment(id){
        console.log(id)
        await axios.put(`https://hospital-mern-2644.onrender.com/api/appointments/cancel/${id}`)
            .then((res)=>{
                console.log(res)
                if(res.status===204){
                    alert("Appointment cancelled")
                }
                fetchAppointments()
            })
    }
    return (
        <div className='container'>
            <div className="row">
                {
                    appointments.map((item)=>(
                    <div className="col-12 col-sm-2 col-md-4 g-4" key={item._id}>
                        <div className="card h-100">
                            <div className="card-body">
                            <h5 className="card-title">Patient Name: {item.patientId.name}</h5>
                            <p className="card-text">Patient Disease: {item.patientId.disease}</p>
                            <p className="card-text">Patient Contact: {item.patientId.mobile}</p>
                            <p className="card-text">Doctor Name:{item.doctorId.name}</p>
                            <p className="card-text">Doctor Contact:{item.doctorId.mobile}</p>
                            <p className="card-text">Designation:{item.doctorId.designation}</p>
                            <p className="card-text">Date:{new Date(item.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                            <div className='card-footer'>
                                {
                                    item.status==="Pending"?(
                                        <div>
                                                <button onClick={()=>confirmAppointment(item._id)} className="btn btn-success">Confirm</button>
                                                <button onClick={()=>cancelAppointment(item._id)} className="btn btn-danger float-end">Cancel</button>
                                        </div>
                                    ):(
                                        <div>
                                            Operation is done
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    ))
                }
            </div>
        </div>
    )
}
