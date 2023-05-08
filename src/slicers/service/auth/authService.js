import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BackendHost = process.env.REACT_APP_BACKEND_HOSTNAME || process.env.REACT_APP_BACKEND_LOCALHOSTNAME; 
export const authService = createApi({
    reducerPath: 'authService',
    baseQuery: fetchBaseQuery({ baseUrl: `${BackendHost}/api/` }),
    endpoints: (builder) => ({
        createuser: builder.mutation({
            query: (newbody) => ({
                url: 'auth/createusers',
                method: 'POST',
                body: newbody,
                headers: {
                    'Content-type': 'application/json'
                }
            })
        }),
        loginuser: builder.mutation({
            query: (loginbody) => {              
                return {
                    url: 'auth/login',
                    method: 'POST',
                    body: loginbody,
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            },
            invalidatesTags: ['Login']
        }),
       
    })

})


export const { useCreateuserMutation, useLoginuserMutation } = authService