import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import Collapse from 'react-bootstrap/Collapse';


function Profile() {
    const [open, setOpen] = useState(false);
  return (
    <div>

        <Card style={{width:"20rem"}} className='p-4 mb-4 pt-5 pb-5'>

            <div className='d-flex justify-content-between '>
                <h3>My Profile</h3>
                <button  aria-controls="example-collapse-text"
        aria-expanded={open}  onClick={() => setOpen(!open)} style={{height:"30px",fontSize:"14px"}} className='btn btn-primary '><i class="fa-solid fa-check"></i></button>
            </div>

            <Collapse in={open}>

             <div id="example-collapse-text">
                   <div className='d-flex justify-content-center'>
                    <label htmlFor="profile">
                        {/* upload picture */}
                        <input id='profile' type="file"  style={{display:"none"}}/>
                        <img style={{width:"150px",height:"150px"}} src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" alt="" />
        
        
                    </label>
                     
                     </div>
        
                   <div className='mt-4'>
                        <input className='form-control ' type="text" placeholder='Github link' />
                        <input className='form-control mt-4' type="text" placeholder='LinkedIn link' />
                        <button className='btn btn-warning w-100 mt-3'>Update</button>
        
        
                   </div>
             </div>
    
           </Collapse>
           

        </Card>


    </div>
  )
}

export default Profile