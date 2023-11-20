import React from 'react'
import AddProject from './AddProject'

function MyProject() {
  return (
    <div className='card shadow mt-3 p-3'>
        <div className='d-flex'>
            <h2>My Projects</h2>
            <div className='ms-auto'><AddProject/></div>
        </div>
        <div className='mt-4'>
            {/* collection of user projects */}
            <div className='d-flex align-items-center border rounded p-2'>
                <h3>Project Title</h3>
                <div className='ms-auto'>
                    <button className='btn'> <i class="fa-solid fa-pen-to-square fa-2x"></i></button>
                    <button className='btn'> <i class="fa-brands fa-github fa-2x"></i></button>
                    <button className='btn'> <i class="fa-solid fa-trash fa-2x"></i></button>

                </div>

            </div>
        </div>



    </div>
  )
}

export default MyProject