import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { useParams,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserThunk, userProfileUpdate } from '../slicers/service/auth/authService'
import { toast } from 'react-toastify';

function ProfileUpdate() {  

    const [gender, setGender] = useState({ Male: false, Female: false, Other: false, value: '' })
    const [formdata, setFormdata] = useState({ first_name:'', last_name: '', phone: '', address: '' })
    const state = useSelector(state=>state.auth)
    const dispatch = useDispatch()
    const {id} = useParams() 
    const navigate = useNavigate()
    const notify = () => toast.success("Update Success!");

    const handlecheck = (e) => {
        setGender({...gender,Male:false,Female:false,Other:false, [e.target.value]: e.target.checked, value: e.target.value})
    }
    const handleonChange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value })
    }
    const handleupdate = (e) => {
        e.preventDefault();
        if (formdata.first_name || formdata.last_name || formdata.phone || formdata.address || gender.value) {
            const updatedata = {
                'id': id,
                'first_name': formdata.first_name,
                'last_name': formdata.last_name,
                'phone': formdata.phone,
                'address': formdata.address,
                'gender': gender.value
            }
           
            dispatch(userProfileUpdate({id,data:updatedata})).then((res)=>{
                if(res.payload?.success){
                    navigate('/profile')
                    notify()
                }
            })
            
        }
    }

    useEffect(()=>{      
        if(Object.keys(state.userdata).length > 0){
            if(state.userdata.first_name){
                // console.log(state)
                const {first_name,last_name,phone,address ,gender} = state.userdata
                setFormdata({ first_name: first_name, last_name: last_name, phone: phone, address: address })
                setGender({...gender,Male:false,Female:false,Other:false, [gender]: true, value: gender}) 
                
            }       
        }
        // if(state.status){
        //     navigate('/profile')
        // }
       
    },[state.userdata])
    
    return (
        <>
            <div className='w-full bg-black text-white h-[100vh]'>
                <Navbar />                         
                <div className='relative pt-24 pb-5 max-w-6xl mx-auto px-3 h-full'>
                    <form className='flex flex-col gap-5 justify-around h-full' onSubmit={(e)=>{handleupdate(e)}}>
                        <div className='w-full h-16 rounded-md relative'>
                            <input required onChange={handleonChange} className="w-full h-full border-b-2 border-gray-300 text-white rounded-br-sm rounded-bl-sm focus:rounded-md focus:border-2 transition-all focus:border-[#e87c03] bg-transparent outline-none p-5 placeholder:focus:-translate-y-8 placeholder:transition-all focus:placeholder:invisible valid:border-2 valid:border-[#e87c03] valid:rounded-md peer" type="text" value={formdata.first_name} name="first_name" id="first_name" placeholder='First Name' />
                            <label htmlFor="first_name" className='absolute top-0 left-0 my-auto -translate-y-3 opacity-0 invisible bg-black w-fit translate-x-5   peer-focus:opacity-100 peer-focus:visible peer-focus:transition-all peer-valid:opacity-100 peer-valid:visible'>First Name</label>
                        </div>
                        <div className='w-full h-16 rounded-md relative'>
                            <input required onChange={handleonChange} className=" w-full h-full border-b-2 border-gray-300 text-white rounded-br-sm rounded-bl-sm focus:rounded-md focus:border-2 transition-all focus:border-[#e87c03] bg-transparent outline-none p-5 placeholder:focus:-translate-y-8 placeholder:transition-all focus:placeholder:invisible valid:border-2 valid:border-[#e87c03] valid:rounded-md peer" type="text" value={formdata.last_name} name="last_name" id="last_name" placeholder='Last Name' />
                            <label htmlFor="last_name" className='absolute top-0 left-0 my-auto -translate-y-3 bg-black w-fit translate-x-5 opacity-0 invisible peer-focus:opacity-100 peer-focus:visible peer-focus:transition-all peer-valid:opacity-100 peer-valid:visible'>Last Name</label>
                        </div>
                        <div className='w-full h-16 rounded-md relative'>
                            <input required onChange={handleonChange} className=" w-full h-full border-b-2 border-gray-300 text-white rounded-br-sm rounded-bl-sm focus:rounded-md focus:border-2 transition-all focus:border-[#e87c03] bg-transparent outline-none p-5 placeholder:focus:-translate-y-8 placeholder:transition-all focus:placeholder:invisible valid:border-2 valid:border-[#e87c03] valid:rounded-md peer" type="text" value={formdata.phone} name="phone" id="phone" placeholder='Phone' />
                            <label htmlFor="phone" className='absolute top-0 left-0 my-auto -translate-y-3 bg-black w-fit translate-x-5 opacity-0 invisible peer-focus:opacity-100 peer-focus:visible peer-focus:transition-all peer-valid:opacity-100 peer-valid:visible'>Phone</label>
                        </div>
                        <div className='w-full h-16 rounded-md relative'>
                            <input required onChange={handleonChange} className=" w-full h-full border-b-2 border-gray-300 text-white rounded-br-sm rounded-bl-sm focus:rounded-md focus:border-2 transition-all focus:border-[#e87c03] bg-transparent outline-none p-5 placeholder:focus:-translate-y-8 placeholder:transition-all focus:placeholder:invisible valid:border-2 valid:border-[#e87c03] valid:rounded-md peer" type="text" value={formdata.address} name="address" id="address" placeholder='Address' />
                            <label htmlFor="address" className='absolute top-0 left-0 my-auto -translate-y-3 bg-black w-fit translate-x-5 opacity-0 invisible peer-focus:opacity-100 peer-focus:visible peer-focus:transition-all peer-valid:opacity-100 peer-valid:visible'>Address</label>
                        </div>
                       
                        <div className={`border-2 p-4 rounded-md uppercase relative ${gender.value? 'border-[#e87c03]': 'border-gray-300'} group`}>
                        
                            <div className="before:content-['Gender'] before:absolute before:-top-4 before:bg-black before:w-fit flex gap-5 ">
                                <div className='space-x-1'>
                                    <input onChange={handlecheck} checked={gender.Male} value='Male' type="checkbox" name="gender" id="male" />
                                    <label htmlFor="">Male</label>
                                </div>
                                <div className='space-x-1'>
                                    <input onChange={handlecheck} checked={gender.Female} value='Female' type="checkbox" name="gender" id="female" />
                                    <label htmlFor="">Female</label>
                                </div>
                                <div className='space-x-1'>
                                    <input onChange={handlecheck} checked={gender.Other} value='Other' type="checkbox" name="gender" id="other" />
                                    <label htmlFor="">other</label>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className='bg-red-500 w-full h-10 tracking-widest rounded-md font-semibold text-lg uppercase hover:bg-red-600 text-white hover:-translate-y-1 transition-all duration-500'>Update</button>

                    </form>
                </div>
            </div>
        </>
    )
}

export default ProfileUpdate