import React, { useContext,useEffect, useState } from 'react'
import AddProject from './AddProject'
import { deleteProjectAPI, userProjectsAPI } from '../Services/allAPI'
import { addProjectResponseContext } from '../Contexts/ContextShare'
import { ToastContainer,toast } from 'react-toastify';
// import 'react-toastify/dist/react-toastify.css'
import EditProject from './EditProject'


function MyProject() {
  const {editProjectResponse,setEditProjectResponse} = useContext(editProjectResponse)
  const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)
  const [userProjects,setUserProjects] = useState([])

    const getUserProjects = async ()=>{
        if(sessionStorage.getItem("token")){
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Content-Type":"multipart/form-data",
                "Authorization":`Bearer ${token}`
              }
              const result = await userProjectsAPI(reqHeader)
              if(result.status===200){
                setUserProjects(result.data)
              }else{
                console.log(result);
                console.log(result.response.data);
              }
        }
    }

    useEffect(()=>{
        getUserProjects()
    },[addProjectResponse,editProjectResponse])

    const handleDelete = async(id)=>{
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      const result = await deleteProjectAPI(id,reqHeader)
              if(result.status===200){
                // page reload
                getUserProjects()
              }else{
                toast.error(result.response.data);
              }

    }
  return (
    <div className='card shadow mt-2 p-3'>
        <div className='d-flex'>
            <h2>My Projects</h2>
            <div className='ms-auto'><AddProject/></div>
        </div>
        <div className='mt-2'>
            {/* collection of user projects */}
            {userProjects?.length>0?userProjects.map(project=>(
                 <div className='d-flex align-items-center border rounded p-3'>
                 <h3 className='text-success'>{project.title}</h3>
                 <div className='d-flex justify-content-evenly m-1 ms-auto'>
            <EditProject project={project}/>
                     <a href={`${project.github}`} target='_blank' className='btn'> <i class="fa-brands fa-github fa-2x"></i></a>
                     <button onClick={()=>handleDelete(project.id)} className='btn'> <i class="fa-solid fa-trash fa-2x"></i></button>
                 </div>
                 </div>
            )):
            <p className='text-danger'>No Projects!!</p>
            }
            
        </div>
        <ToastContainer/>
    </div>
  )
}

export default MyProject