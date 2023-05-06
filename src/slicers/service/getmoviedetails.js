// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



// Define a service using a base URL and expected endpoints
export const getmoviesdetails = createApi({
  reducerPath: 'getmoviedetails',
  baseQuery: fetchBaseQuery({ baseUrl: `https://api.themoviedb.org/3/` }),
  endpoints: (builder) => ({
    getMovieDetailsById: builder.query({
      query: (moviedata) => {
      //  movietype ==='tv'? `tv/${movieid}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US` : `movie/${movieid}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      //  return `movie/${moviedata.movieid}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      console.log(moviedata);
      if(moviedata.movietype === 'tv'){
        return  `tv/${moviedata.movieid}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      }
      else{
        
        return `movie/${moviedata.movieid}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      }
      
      } ,
     
    }),
  }),
}) 

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMovieDetailsByIdQuery } = getmoviesdetails