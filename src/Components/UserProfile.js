
import avatar from '../Images/Netflix-avatar.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
// import { use } from '../../../netflix_backend/routes/auth_router'
import { getUserThunk } from '../slicers/service/auth/authService';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';


export const Profile = ({data})=>{
    const state = useSelector(state=>state.auth)
    const navigate = useNavigate()
    const handlemanageprofile = () => {
        navigate(`/profile_update/${data._id}`)        
    }
    return (<>
        <Navbar islogin={true} />
        <div className='flex justify-center items-center h-full w-full'>
            <div className='flex flex-col justify-center items-center gap-10 md:gap-12 max-xs:mt-5 md:mt-0'>
                <h1 className='text-4xl tracking-widest font-semibold text-center'>Who's Watching?</h1>
                <div className='flex flex-row justify-center items-center w-full h-full gap-5 md:gap-10 flex-wrap px-4'>
                    <div className='flex flex-col w-[6rem] h-[7rem] justify-center items-center gap-1'>
                        <Link to='/movies'><div className='cursor-pointer transition-all hover:border-2 hover:border-white'>
                            <img className='object-cover' src={avatar} alt="" />
                        </div></Link>

                        {/* {responseinfo.isError ? '' : responseinfo.isLoading ? 'Loading..' : responseinfo.isSuccess ? <h1 className='capitalize'> {responseinfo.data.data ? responseinfo.data.data.first_name : 'Guest'} </h1> : null} */}
                        <h1>{data?.first_name ? data.first_name : 'Guest'}</h1>
                    </div>
                    <div className='flex flex-col w-[6rem] h-[7.7rem] justify-center items-center gap-1 '>
                        <div className='bg-stone-200 w-full h-full flex justify-center items-center cursor-pointer tracking-widest hover:border-2 border-green-800 transition-all'>
                            <h1 className='text-slate-600 text-3xl font-bold'>Kids</h1>
                        </div>
                        <h1>Kids</h1>
                    </div>
                    <div className='flex flex-col w-[5rem] h-[7rem] justify-center items-center gap-1 '>
                        <div className='w-full h-full bg-stone-500 rounded-full flex justify-center items-center cursor-pointer hover:border-2 transition-all'>
                            <FontAwesomeIcon className='text-zinc-900 text-6xl' icon={faPlus} />
                        </div>
                        <h1>Add Profile</h1>
                    </div>
                </div>
                <div>
                    <button onClick={handlemanageprofile} className='border-2 px-5 py-2 text-xl font-medium uppercase'>Manage profile</button>
                </div>
            </div>
        </div></>)
}

function UserProfile() {
    const navigate = useNavigate()
    const state = useSelector(state=>state.auth)
    const notify = () => toast.info("Please Update Your Profile",{
        hideProgressBar: true,
        autoClose: 3000,
    });
    const dispatch = useDispatch()

    // useEffect(()=>{
    //     dispatch(getUserThunk(sessionStorage.getItem('loginToken')))
    // },[])
    
    useEffect(()=>{         
        if(Object.keys(state.userdata).length > 0){     
            
            if(!state.userdata.first_name){
                navigate(`/profile_update/${state.userdata._id}`)   
                notify();
            }       
        }
    },[state.userdata])

    
    
    return (
        <div className='w-full h-screen bg-neutral-900 text-white overflow-hidden'>   
            
            {state.userdata.first_name && <Profile data={state.userdata}/>}
        </div>
    )
}

export default UserProfile;