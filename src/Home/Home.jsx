import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
export default function Home() {
  const [doctorsList, setDoctorsList] = useState([])
  const [selectedDoctorId,setSelectedDoctorId]=useState(false)
  const [date,setDate]=useState(null)
  const [time,setTime]=useState(null)
  const patientId=localStorage.getItem("patientId")
  useEffect(() => {
    fetchDoctors()
  }, [])
  async function addAppointment(){
    if(patientId){
      const newAppointment={
        doctorId:selectedDoctorId,
        patientId,date,time
      }
      console.log("new appointment ",newAppointment)
      await axios.post("https://hospital-mern-2644.onrender.com/api/appointments/add",newAppointment)
        .then((res)=>{
          console.log(res)
          if(res.status===201){
            Swal.fire({
              title: "Booked",
              text: "Your appointment is booked. wait for confirmation through email",
              icon: "success"
            });
            setSelectedDoctorId(null)
          }
        })
        .catch((e)=>{
          Swal.fire({
            icon: "error",
            title: "Contact hospital team",
            text: "Unable to book an appointment!"
          });
        })
    }
    else{
      Swal.fire({
        icon: "error",
        title: "Login needed",
        text: "You need to login first then only you can book an appointment!"
      });
    }
  }
  async function fetchDoctors() {
    await axios.get("https://hospital-mern-2644.onrender.com/api/doctors")
      .then((res) => {
        console.log(res)
        setDoctorsList(res.data)
      })
      .catch((e) => {
        alert("Something went wrong")
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!"
        });
      })
  }
  return (
    <div className='container'>
      <div className="row">
        {
          doctorsList.map((item) => (
            <div className="col-12 col-sm-2 col-md-4 g-4" key={item._id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{item.specializaton}</h5>
                  <p className="card-text">Doctor Name:{item.name}</p>
                  <p className="card-text">Doctor Contact:{item.mobile}</p>
                  <p className="card-text">Designation:{item.designation}</p>
                  
                </div>
                <div className='card-footer text-center'>
                  <button onClick={()=>setSelectedDoctorId(item._id)} className="btn btn-outline-primary btn-lg">Book Appointment</button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      {
        selectedDoctorId && <div className="modal show d-block" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" role="modal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Appointment Slot Booking</h1>
              <button onClick={()=>setSelectedDoctorId(null)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="appointmentime" className="col-form-label">Appointment Time:</label>
                  <input onChange={(e)=>setTime(e.target.value)} type="time" className="form-control" id="appointmentime"/>
                </div>
                <div className="mb-3">
                  <label htmlFor="appointmendate" className="col-form-label">Appointment Date:</label>
                  <input onChange={(e)=>setDate(e.target.value)} type="date" className="form-control" id="appointmendate"/>
                </div>
              </form>
             
              <button type="button" className="btn btn-primary" onClick={addAppointment}>Book</button>
              <button onClick={()=>setSelectedDoctorId(false)} type="button" className="btn btn-secondary float-end" data-bs-dismiss="modal">Close</button>
            </div>
            <div className="modal-footer">
             
            </div>
          </div>
        </div>
      </div>
      }
    </div>
  )
}
