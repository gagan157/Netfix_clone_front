import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const BackendHost = process.env.REACT_APP_BACKEND_HOSTNAME || 'http://localhost:5000'; 
export const userService = createApi({
    reducerPath: 'userService',
    baseQuery: fetchBaseQuery({ baseUrl: `${BackendHost}/api/user/` }),
    tagTypes: ["Userdetail",'Profile_update'],
    refetchOnMountOrArgChange: 5,
    endpoints: (builder) => ({
        getuserdetails: builder.query({
            query: () => ({
                url: 'userdetails',
                // method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'auth-tokken': sessionStorage.getItem('loginToken')
                }
            }),
            providesTags : ['Userdetail']
        }),

        updateuserdetail: builder.mutation({
            query: (newbody) => {
                const {id,...data} = newbody
                return{
                    url: `profile_update/${id}`,
                    method: 'PUT',
                    body: data,
                    headers: {
                        'Content-type': 'application/json',
                        'auth-tokken': sessionStorage.getItem('loginToken')
                    }
                }
            },
            invalidatesTags :['Profile_update']
        }),
    })

})


export const { useGetuserdetailsQuery, useUpdateuserdetailMutation } = userService