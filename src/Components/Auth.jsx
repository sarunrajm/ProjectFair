import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { loginAPI, registerAPI } from '../Services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';



function Auth({register}) {
const [userdata,setUserdata]=useState({
  username:"",
  email:"",
  password:""
})

    const isRegisterForm = register?true:false
    const navigate=useNavigate()


const handleRegister= async (e)=>{

 e.preventDefault()
 const {username,email,password}=userdata

 if(!username || !email || !password){
  toast.info("Please fill the form completely!!!")
 }
 else{
  const result=await registerAPI(userdata)
  if(result.status===200){
    toast.success(`${result.data.username} has registered successfully!!!`)
    setUserdata({
      username:"",
      email:"",
      password:""

    })
    navigate('/login')
  }
  else{
    toast.warning(result.response.data)
    console.log(result);
  }
 }

}
const handleLogin=async (e)=>{
  e.preventDefault()
  const {email,password}=userdata

  if(!email || !password){
    toast.info("Please fill the form completely!!!")
   }
   else{
    const result=await loginAPI(userdata)
    if(result.status===200){
sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
sessionStorage.setItem("token",result.data.token)

      setUserdata({
        email:"",
        password:""
  
      })
      navigate('/')
    }
    else{
      toast.warning(result.response.data)
      console.log(result);
    }
   }
}

  return (
    <div
      style={{ width: "100%", height: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <div className="w-75 container">
        <Link to={"/"} style={{ textDecoration: "none", color: "blue" }}>
         Back to Home
        </Link>
        <div className="card shadow p-5 bg-info">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img src="https://png.pngtree.com/png-vector/20191003/ourmid/pngtree-user-login-or-authenticate-icon-on-gray-background-flat-icon-ve-png-image_1786166.jpg" className="rounded-start w-100" alt="" />
            </div>
            <div className="col-lg-6">
              <div className="d-flex align-items-center flex-column">
                <h1 className="fw-bolder text-light mt-2">Project Fair</h1>
                <h5 className="fw-bolder mt-2 pb-3 text-light">
                  {isRegisterForm
                    ? "Sign up to your Account"
                    : "Sign In to your Account"}
                </h5>
                <Form classtext-light w-100>
                  {isRegisterForm && (
                    <Form.Group className="mb-3" controlId="formBasicName">
                      <Form.Control
                        type="text"
                        placeholder="Enter the Username"
                        value={userdata.username}
                        onChange={(e)=>setUserdata({...userdata,username:e.target.value})}
                      />
                    </Form.Group>
                  )}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      type="text"
                      placeholder="Enter the Email Address"
                      value={userdata.email}
                      onChange={(e)=>setUserdata({...userdata,email:e.target.value})}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="fromBasicPassword">
                    <Form.Control
                      type="password"
                      placeholder="Enter the Password"
                      value={userdata.password}
                      onChange={(e)=>setUserdata({...userdata,password:e.target.value})}
                    />
                  </Form.Group>
                  {
                    isRegisterForm ? 
                    <div>
                        <button onClick={handleRegister}  className='btn btn-primary mb-2'>Register</button>
                        <p>Already have Account? Click here to <Link to={'/login'}>Login</Link></p>
                    </div>:
                    <div>
                        <button onClick={handleLogin} className='btn btn-primary mb-2'>Login</button>
                        <p>New User? Click here to <Link to={'/register'}>Register</Link></p>
                    </div>
                  }
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Auth
