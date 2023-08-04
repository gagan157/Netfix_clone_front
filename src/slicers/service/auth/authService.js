import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BackendHost =  process.env.REACT_APP_BACKEND_LOCALHOSTNAME || process.env.REACT_APP_BACKEND_HOSTNAME




const initialState = {
    isLogin: false,
    userdata : {},
    email: '',
    authTokken: '',
    error: '',
    status: false,
}

export const loginuserTunk = createAsyncThunk(
    'auth/login',
    async (thunkAPI,{rejectWithValue}) => { 
        try{
            const res = await fetch(`https://${BackendHost}/api/auth/login`,{
                method : 'POST',
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",            
                },
                body : JSON.stringify(thunkAPI)  
            })
            const data = await res.json()
            if(data?.error){
                throw data.error
            }    
            return {data,thunkAPI}    
        } 
        catch(err){
            return rejectWithValue(err)
        }      
})
export const SignUpTunk = createAsyncThunk(
    'auth/signup',
    async (thunkAPI,{rejectWithValue}) => { 
        try{
            const res = await fetch(`https://${BackendHost}/api/auth/createusers`,{
                method : 'POST',
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",            
                },
                body : JSON.stringify(thunkAPI)  
            })
            const data = await res.json()
            if(data?.error){
                throw data.error
            }    
            return data    
        } 
        catch(error){                       
            return rejectWithValue(error)
        }      
})

export const getUserThunk = createAsyncThunk(
    'user/details',
    async (thunkApi,{rejectWithValue})=>{
            try{
            let res = await fetch(`https://${BackendHost}/api/user/userdetails`,{
                method : 'GET',
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",                        
                    'Authorization': `Bearer ${JSON.parse(thunkApi)}`      
                },
            })
            let data = await res.json();            
            if(data?.error){
                throw data
            }
            return data;
        }
        catch(error){
            return rejectWithValue(error)
        }
    }
)


export const userProfileUpdate = createAsyncThunk(
    'user/profileUpdate',
    async (thunkAPI,{rejectWithValue}) =>{        
        try{
            let res = await fetch(`https://${BackendHost}/api/user/profile_update/${thunkAPI.id}`,{
                method : 'PUT',
                headers : {
                    "Content-Type": "application/json",                        
                    'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('loginToken'))}`      
                },
                body: JSON.stringify(thunkAPI.data)
            })
            let resData = await res.json()
            console.log(resData)
            if(resData?.error){
                throw resData.error
            }
            return resData
        }
        catch(error){
            return rejectWithValue(error)
        }
    }
)


export const authService = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearErrorState : (state)=>{
            return {...state,error:"",status:false}
        }
    },
    extraReducers : {
        [loginuserTunk.fulfilled] : (state, {payload})=>{
            state.isLogin = true
            state.email = payload.thunkAPI.email
            state.authTokken = payload.data.token
            state.error = ""    
               
        },
        [loginuserTunk.rejected] : (state, {payload})=>{
            state.isLogin = false
            state.error = payload                
        },
        [SignUpTunk.fulfilled]:(state, {payload})=>{
            state.error = ""
            state.status =  payload.success   
        },
        [SignUpTunk.rejected]:(state, action)=>{            
            state.error = action.payload        
            state.status = false    
        },
        [getUserThunk.fulfilled] : (state,{payload})=>{           
            state.userdata = payload.data
            state.error = ""
        },
        [getUserThunk.rejected]: (state, {payload})=>{
            state.error = payload
        },
        [userProfileUpdate.fulfilled]:(state, {payload})=>{
            state.status = true
            state.userdata = payload.data
        },
        [userProfileUpdate.rejected]:(state, {payload})=>{
            state.status = false
        },
    }
})



// export const { useCreateuserMutation, useLoginuserMutation } = authService
export const {clearErrorState} = authService.actions
export default authService.reducer