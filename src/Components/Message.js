import React from 'react'
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Message() {
    
  return (
    <div>
        <ToastContainer position='bottom-right' transition={Zoom}/>
    </div>
  )
}

export default Message