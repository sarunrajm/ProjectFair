import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../Components/ProjectCard'
import { Link } from 'react-router-dom'
import { homeProject } from '../Services/allAPI'

function Home() {
  const [loggedin,setLogedin]=useState(false)
  const [homePrjects,setHomeProjects] = useState([])
  // api calling
  const getHomeProjects = async()=>{
    const result = await homeProject()
    if(result.status===200){
      setHomeProjects(result.data)
    }else{
      console.log(result);
      console.log(result.response.data);
    }
  }

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
    setLogedin(true)
    }else{
      setLogedin(false)
    }
    // api call
    getHomeProjects()
  })
  return (
    <>
    {/* landing section */}
      <div style={{width:'100%',height:'100vh'}} className='container-fluid rounded bg-info'>
        <Row className='align-items-center p-5'>
          <Col sm={12} md={6}>
            <h1 style={{fontSize:'80px'}} className='fw-bolder text-dark'>Project Fair</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse atque, quaerat laborum excepturi error provident officia doloremque id beatae perferendis maxime vitae qui? Iure deleniti voluptatem eos labore doloremque qui!</p>


            {loggedin?
              <button className='btn btn-primary'><Link style={{textDecoration:"none",color:"white"}} to={'/dashboard'}>Manage your projects</Link></button>:
              <button className='btn btn-primary'><Link style={{textDecoration:"none",color:"white"}} to={'/login'}>Start to Explore</Link></button>
       }

          </Col>
          <Col sm={12} md={6}>
            <img style={{marginTop:'100px'}} src="https://media3.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif" alt="" className='w-75' />
          </Col>
        </Row>
      </div>

    {/*all projects  */}

    <div className='bg-secondary'>
      <h1 className="text-center mb-5">Explore our Projects</h1>
    <marquee scrollAmount={25}>
      <div className='d-flex justify-content-between'>
       { homePrjects?.length>0?homePrjects.map(projects=>(
        <div style={{width:'500px'}}>
        <ProjectCard project={projects}/>
      </div>
       )):null
        }
       
      </div>
    </marquee>
    <div className='text-center mt-5'>
      <Link to={"/projects"}>View More Projects</Link>
    </div>
    </div>
    </>
  )
}

export default Home
