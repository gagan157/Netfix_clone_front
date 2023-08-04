import React,{memo, useEffect } from 'react'
import { useJwt } from 'react-jwt'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { getUserThunk } from '../slicers/service/auth/authService'
import { toast } from 'react-toastify';

function ProtectedRouter(props) {
    const navigate = useNavigate()
    const { Component  } = props 
    const dispatch = useDispatch()
    const token = sessionStorage.getItem('loginToken')    
    const {isExpired} = useJwt(token)
    const notify = () => toast.info("Session Timeout Please login again");

    useEffect(()=>{
        dispatch(getUserThunk(token))
    },[])

    useEffect(() => {            
            if(isExpired){
                sessionStorage.removeItem('loginToken')
                navigate('/login',{state:{'logoutmsg':"login Expire"}})
                navigate(0)
                notify()
            }
        },[isExpired])
        
        return (
            <>          
         {token? <Component />: <Navigate to='/login' /> }
        
             </>
    )
}

export default memo(ProtectedRouter)