import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer,toast } from 'react-toastify';
// import 'react-toastify/dist/react-toastify.css'
import { BASE_URL } from '../Services/baseURL';
import { editProjectAPI } from '../Services/allAPI';

function EditProject({project}) {

    const [projectDetails,setProjectDetails]=useState({
      id:project._id,title:project.title,languages:project.languages,overview:project.overview,github:project.github,website:project.website,projectImage:""
      })
    const [preview ,setPreview]=useState("")
    const [show, setShow] = useState(false);

    const handleClose = () => {
      setShow(false);
      setProjectDetails({
        id:project._id,title:project.title,languages:project.languages,overview:project.overview,github:project.github,website:project.website,projectImage:""
      })
      setPreview("")
    }

    const handleShow = () => setShow(true);

    useEffect(()=>{
      if(projectDetails.projectImage){
        setPreview(URL.createObjectURL(projectDetails.projectImage))
      }
    },[projectDetails.projectImage])

    const handleUpdate=async()=>{
      const{id,title,languages,github,website,overview,projectImage}=projectDetails
      if(!title||!languages || !github || !website ||!overview){
        toast.info("Please fill the form completely!!!")  
      }else{
          const reqBody=new FormData()
          reqBody.append("title",title)
          reqBody.append("languages",languages)
          reqBody.append("overview",overview)
          reqBody.append("github",github)
          reqBody.append("website",website)
          preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)
          const token=sessionStorage.getItem("token")
          if(preview){
              const reqHeader={
                  "Content-Type":"multipart/form-data",
                  "Authorization":`Bearer ${token}`
              }
              // api call
              const result =await editProjectAPI(id,reqBody,reqHeader)
              if(result.status===200){
                  handleClose()
                  
                  console.log(result.data);

              }else{
                  console.log(result);
                  toast.error(result.response.data)
              }
          }else{
              const reqHeader={
                  "Content-Type":"application/json",
                  "Authorization":`Bearer ${token}`
              }
          // api call
              const result =await editProjectAPI(id,reqBody,reqHeader)
              if(result.status===200){
                  handleClose()
              }else{
                  console.log(result);
                  toast.error(result.response.data)
              }
          }
        }
      }
  return (
    <>
    
    <button onClick={handleShow} className='btn'> <i class="fa-solid fa-pen-to-square fa-2x"></i></button>

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div className="row">
            <div className="col-lg-6 ">
               <div className='d-flex justify-content-center align-items-center'>
                    <label htmlFor="project">
                        <input id='project' type="file" style={{display:"none"}} onChange={e=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})}/>
                        <img height={"230px"} width={"400px"} src={preview?preview:`${BASE_URL}/Uploads/${project.projectImage}`} alt="" />
                    </label>
               </div>
            </div>
            <div className="col-lg-6">
                <div className='mb-3'>
                    <input value={projectDetails.title}  className='form-control' type="text"  placeholder='Project title' onChange={e=>setProjectDetails({...projectDetails,title:e.target.value})}/>
                </div>
                <div className='mb-3'>
                    <input  value={projectDetails.languages}  className='form-control' type="text"  placeholder='Language used' onChange={e=>setProjectDetails({...projectDetails,languages:e.target.value})}/>
                </div>
                <div className='mb-3'>
                    <input  value={projectDetails.github}  className='form-control' type="text"  placeholder='Github link' onChange={e=>setProjectDetails({...projectDetails,github:e.target.value})}/>
                </div>
                <div className='mb-3'>
                    <input  value={projectDetails.website}  className='form-control' type="text"  placeholder='Website link' onChange={e=>setProjectDetails({...projectDetails,website:e.target.value})}/>
                </div>
                <div className='mb-3'>
                    <input  value={projectDetails.overview}  className='form-control' type="text"  placeholder='Overview' onChange={e=>setProjectDetails({...projectDetails,overview:e.target.value})}/>
                </div>
                </div>
         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer/>
    </>
  )
}
export default EditProject