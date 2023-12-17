import React, { useState } from 'react'
import { Card, Col, Modal, Row } from 'react-bootstrap'
import projectImage from '../Assets/hotstar.png'
import { BASE_URL } from '../Services/baseURL';



function ProjectCard({project}) {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      {project&& <Card className='shadow mb-5 btn' onClick={handleShow}>
      <Card.Img variant="top" height={'270px'} src={project?`${BASE_URL}/Uploads/${project?.projectImage}`:projectImage} />
      <Card.Body>
        <Card.Title>{project?.title}</Card.Title>
      </Card.Body>
    </Card>}

    <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col md={6}>
                    <img src={project?`${BASE_URL}/Uploads/${project?.projectImage}`:projectImage} alt="project image" className='img-fluid'/>
                </Col>
                <Col md={6}>
                  <h2 className='text-danger'>{project?.title}</h2>
                  <p>
                    Project Overview : <span className='fw-bolder'>{project?.overview}</span>
                  </p>
                  <p>Languages used : <span className='fw-bolder'>{project?.languages}</span></p>
                </Col>
            </Row>
            <div className="mt-3">
                <a href={project?.github} target='_blank' className='me-3 btn'><i class="fa-brands fa-github fa-2x"></i></a>
                <a href="" target='_blank' className='me-5 btn'><i class="fa-solid fa-link fa-2x"></i></a>
            </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ProjectCard
