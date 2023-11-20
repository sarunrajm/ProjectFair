import React, { useState } from 'react'
import { Card, Col, Modal, Row } from 'react-bootstrap'
import projectImage from '../Assets/hotstar.png'



function ProjectCard() {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Card className='shadow mb-5 btn' onClick={handleShow}>
      <Card.Img variant="top" height={'220px'} src={projectImage} />
      <Card.Body>
        <Card.Title>Project Title</Card.Title>
      </Card.Body>
    </Card>

    <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col md={6}>
                    <img src={projectImage} alt="project image" className='img-fluid'/>
                </Col>
                <Col md={6}>
                  <h2>Project title</h2>
                  <p>
                    Project Overview : Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti optio ipsam, consectetur praesentium quo ipsa sit aspernatur aut, sunt laboriosam quod debitis, id ipsum tempora?
                  </p>
                  <p>Languages used : <span className='fw-bolder'>HTML, CSS, React</span></p>
                </Col>
            </Row>
            <div className="mt-3">
                <a href="" target='_blank' className='me-3 btn'><i class="fa-brands fa-github fa-2x"></i></a>
                <a href="" target='_blank' className='me-5 btn'><i class="fa-solid fa-link fa-2x"></i></a>
            </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ProjectCard
