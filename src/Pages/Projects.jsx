import React from 'react'
import ProjectCard from '../Components/ProjectCard'
import Header from '../Components/Header'
import { Col, Row } from 'react-bootstrap'

function Projects() {
  return (
    <div>
       <Header/>
      <h1 className='text-center mt-4'>All Projects</h1>
<div className='d-flex justify-content-center mt-5'>
  <div className='d-flex justify-content-center w-50'>
          <input className='form-control' type="text" placeholder='Search projects by technologies' /> <button className='btn btn-dark'>Search</button>
    
  </div>
</div>    
<Row className='container'>
  <Col sm={12} md={6} lg={4} >
    <ProjectCard/>
  </Col>
</Row>

</div>
  )
}

export default Projects
