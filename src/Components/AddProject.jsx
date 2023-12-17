import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer,toast } from 'react-toastify';
// import 'react-toastify/dist/react-toastify.css'
import { addProjectAPI } from '../Services/allAPI';
import { addProjectResponseContext } from '../Contexts/ContextShare';

function AddProject() {
  const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)

  const [show, setShow] = useState(false);

  const [projectDetails,setProjectDetails]=useState({
    title:"",languages:"",overview:"",github:"",website:"",projectImage:""
  })
  const [preview ,setPreview]=useState("")
  const [token,setToken]=useState("")

  const handleClose = () =>{
    setShow(false)
    setProjectDetails(
      {
        title:"",languages:"",overview:"",github:"",website:"",projectImage:""
      }
    )
    setPreview("")
  }
  const handleShow = () => setShow(true);
  // console.log(projectDetails);


  useEffect(()=>{
    if(projectDetails.projectImage){
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
  },[projectDetails.projectImage])

useEffect(()=>{
  if(sessionStorage.getItem("token")){
    setToken(sessionStorage.getItem("token"))
  }else{
    setToken("")
  }
},[])

  const handleAdd=async(e)=>{
    e.preventDefault()
    const {title,languages,overview,projectImage,github,website}=projectDetails
    if(!title || !languages || !overview || !projectImage || !github || !website ){
      toast.info("Please fill the form completely ...!")
    }
    else{
      const reqBody=new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("overview",overview)
      reqBody.append("projectImage",projectImage)
      reqBody.append("github",github)
      reqBody.append("website",website)

if(token){
   const reqHeader = {
    "Content-Type":"multipart/form-data",
    "Authorization":`Bearer ${token}`
  }
const result= await addProjectAPI(reqBody,reqHeader)
if(result.status===200){
  console.log(result.data);
  handleClose()
  setAddProjectResponse(result.data)
}
else{
  console.log(result);
  console.log(result.response.data);
}
}
}
}

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Project
      </Button>

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
            <div className="col-lg-6">
               <div className='d-flex justify-content-center align-items-center'>
                    <label htmlFor="project">
                        <input onChange={(e)=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})} id='project' type="file" style={{display:"none"}} />
                        <img height={"250px"} width={"350px"} src={preview?preview:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAP8AAADFCAMAAACsN9QzAAAAMFBMVEXQ0NDw8PDX19fU1NTn5+fl5eXt7e3q6urY2Nju7u7Ozs7e3t7g4ODy8vLi4uLb29uNTQONAAAFDElEQVR4nO2d6YKqMAyFpaxeRN//ba+MIordkqbQmJyfQ1vznbZhaWFOJ9Gqjw7gYCm/bCm/bCm/bCm/bCm/bCm/bCm/bCm/bCm/bCm/bCm/bCm/bCm/bCm/bCm/bCm/bCm/bCm/bCm/bCm/bKXw12a4jeN4M4xNxIc+XJqummad++uNMKRdheT/V7d3+OqpuwXNQBvXXkLyj131qalqaQPbSSj+up2qL00dxzSAirmx4N8N6A11dPmF4b9a8WcD+I0ARMSjnX5Wy84AeMCmc3T/LHbnQTi/LffxzYHgeM3ZjX83YMwRZEaB+S+e7p9T4L8cUeYTmL/38lcTswkADbf247ObAFD+IcR/zRJmNkH5xxB/wysBQPn96Y9fAlR+mKSP/2D+a3+bX/r577R98LPlZ/YMAMzvuvl/quM1/OH8g7/7LzmCzCgwv/XZ39r9zC7/Eff/N08GYNf9mOdfVzd+w637Uc8/7Y9/59HPLPmfcPy1/RnA1LF7+odd/7CNgOnMcQkMN2HvJ4GtAyxXP/Drv0P/AV91zK57F+ET9q3pz3/L33f4nt15b1HS/ofb5dq21+vIceI/xe6ETSzlly3lly3lly3lly3lly3lly3lly3lly3lL1H7PU4skr/d72WSAvnnFeZpr5305fE/Ftj3MqA8/uf+gqnZ5deK439tr5h2yQGl8bdvq2p7GFAW/+fC8h7bKYri3+4t2iEJFsX/ta0gfw4oid+ysyy7AeXwWzeVZM8BxfC79hVmzgGl8Nt7P/8IKIXfiZ85BxTC3zrpZ2U0oAh+9+DPPgVK4Pdvqc5rQAn8gd5/GJDptwvgD/b+nwGZcsDh/HUTQZ9vChzNH0p9uQ04mD8eP5MBB/MD8PMkwWP5o1LfmwH0SfBIfsjgX0YAdby07ZkroD04fgYDSJszPSC+2BNfXgMoW5vfC4qPD9H7GQwgbKx+fBgpLj7M4H+K1AC6tpbvQkV1UAI+7Qgga8q8XoqLiC8Fn9YAqpZMD4kvCZ/UAKKG6g6ycJOIT2kATTv15ptw3vjSBj+xASTNmK8XYj3xUeDTGUDRiukB8dHgkxlA0IgN3x0fET6VAeltbOf+S7b4qHqfzIDkJtyfw7R8DpUSn8aA1Ba+U58nPlp8EgMSG7DPfUd81PgUBqTVd3wJwhEfOT6BAUnVnanPFh9971MYkFLb+yXgbXx58JMNSKjsn/uv+B5ngVz4qQbg68bhL/EFEsVhBqCrhuf+e3zZej/VAGxNU8UTTX3G3v/7AbwByIqxg38n4Q3A1fNd9R0itAGoaoX1/iysAZha9bmw3p+FNABRKeay5wDhDIDXGUqb+4tQBoCrFDj3F2H+/wq0Rh34/u2hQowAYIUiU98q+AiAlR/KTH2rwCMAVLzY1LcKagCkdKEnvk8BpwBkv0rZc38RzID4spA7vkMFMiC6aPGpbxXEgNiSjPBBBkQWZJH6VsUbEFeOzdxfFG1AVDFWg/+h2M8xx/AzxI8eARGFWOLHGhAuY3hc9nwryoBgEXapb1VMDgjxDyXf74cUYUCAnzV+zBTwH2ea+lYFDfAeNkeHn66QAb6jA9fM/65ADvDwM5/7i/wGuPl/BD8wBZyH/P/nmJV8BriO/EDqW+WZAg7+nxn8D7kNsPOzP+9v5TTAyv9z+O4cYPsr41setxwGWPkH84MaovklSfllS/llS/llS/llS/llS/llS/llS/llq/4Pyu5AznGi3bUAAAAASUVORK5CYII="} alt="" />
    
                    </label>
               </div>

            </div>
            <div className="col-lg-6">

                <div className='mb-3'>
                    <input value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})} className='form-control' type="text"  placeholder='Project title'/>
                </div>
                <div className='mb-3'>
                    <input  value={projectDetails.languages} onChange={(e)=>setProjectDetails({...projectDetails,languages:e.target.value})} className='form-control' type="text"  placeholder='Language used'/>
                </div>
                <div className='mb-3'>
                    <input  value={projectDetails.github} onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})} className='form-control' type="text"  placeholder='Github link'/>
                </div>
                <div className='mb-3'>
                    <input  value={projectDetails.website} onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})} className='form-control' type="text"  placeholder='Website link'/>
                </div>
                <div className='mb-3'>
                    <input  value={projectDetails.overview} onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})} className='form-control' type="text"  placeholder='Overview'/>
                </div>
                
                </div>
         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAdd} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer/>
    </>
  );
}

export default AddProject;