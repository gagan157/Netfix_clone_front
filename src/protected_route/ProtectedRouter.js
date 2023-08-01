import React,{memo, useEffect } from 'react'
import { useJwt } from 'react-jwt'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { getUserThunk } from '../slicers/service/auth/authService'

function ProtectedRouter(props) {
    const navigate = useNavigate()
    const { Component  } = props 
    const dispatch = useDispatch()
    const token = sessionStorage.getItem('loginToken')    
    const {isExpired} = useJwt(token)

    useEffect(()=>{
        dispatch(getUserThunk(token))
    },[])

    useEffect(() => {            
            if(isExpired){
                sessionStorage.removeItem('loginToken')
                navigate('/login',{state:{'logoutmsg':"login Expire"}})
                navigate(0)
            }
        },[isExpired])
        
        return (
            <>          
         {token? <Component />: <Navigate to='/login' /> }
        
             </>
    )
}

export default memo(ProtectedRouter)