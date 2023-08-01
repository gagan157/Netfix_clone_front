import { createSlice } from "@reduxjs/toolkit";



const initialState ={
    status : false,
    msg : "",
}

const MessageSlicer = createSlice({
    name : 'msg',
    initialState,
    reducers : {
        setMsg : (state,{payload})=>{
            return {...state,status:payload.status, msg:payload.error}
        }
    },
})

export  const {setMsg} = MessageSlicer.actions
export default MessageSlicer.reducer