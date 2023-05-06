import React, { Suspense, memo, useMemo, useCallback, useState } from 'react'
import { useContext, useEffect } from 'react'
import moviescontext from '../Context/moviescontext'
import Movieslist from './Movieslist'
// import SlidShow from './SlidShow'
import Navbar from './Navbar'
import Footer from './Footer'
import Weblist from './Weblist'


const SlidShow = React.lazy(() => import('./SlidShow'));
// const Movieslist = React.lazy(() => import('./Movieslist'));
const areEqual = (prevProps, nextProps) => true;
const Movies = memo(()=> {
    const [mwtitle,setMWTitle] = useState("movies");

    const context = useContext(moviescontext)
    const { genre, trendmovies, originalmovies, top_rated, popular_movie, upcoming_movies, slide_show, slideshow, gernewisemovies, genrewise_movies, get_movies_genre, trending_movies, toprated_movies, discover_movies, popular_movies, upcoming_movie, gernewiseweb, genrewise_web } = context || []
    // const { totalpages, } = context || ''


    const blankcontexthandle = useMemo(() => {
        return slideshow.length > 0 && slideshow
    }, [slideshow])
    // console.log('memo',blankcontexthandle)

    // useEffect(() => {
    //     if (totalpages !== null) {
    //         slide_show(totalpages)
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [totalpages])

    useEffect(() => {
        get_movies_genre()
        slide_show()
        discover_movies()
        trending_movies()
        toprated_movies()
        popular_movies()
        upcoming_movie()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    useEffect(() => {
        if (genre.length > 0) {      
             
            genrewise_movies(genre);            
             
        }
          
    }, [genre])

    useEffect(()=>{
        if(mwtitle === 'movies'){
            
            genrewise_movies(genre); 
        }
        else{
           
            genrewise_web(genre);
        }

    },[mwtitle])


 

    const norrenderlargeoringal = useMemo(() => {
        return { islarge: true, isposter: true }
    }, [])
    const norendertrending = useMemo(() => {
        return { extralarge: true, isposter: true }
    }, [])
    const norendernormal = useMemo(() => {
        return { normalsize: true, isposter: true }
    }, [])

    const gernwisemoviecallback = useCallback((id) => {
        return genrewise_movies(genre,id)
    }, [genrewise_movies])

    const gernwiseWebcallback = useCallback((id) => {
        return genrewise_web(genre,id)
    }, [genrewise_web])


    return (
        <>
            <div className='max-h-full bg-black text-white pb-10'>
                <Navbar />
                <div className='max-w-full max-h-[35rem] h-[35rem]'>
                    <Suspense fallback={<div className='text-white font-bold text-2xl'>Loading...</div>}>
                        {blankcontexthandle && <SlidShow slideshow={blankcontexthandle} genre={genre} />}
                    </Suspense>
                </div>

                {originalmovies.length > 0 && <Movieslist title={'Netflix Original'} item={originalmovies} getMoreMovies={discover_movies} large={norrenderlargeoringal} />}

                {trendmovies.length > 0 && <Movieslist title={'trending'} item={trendmovies} getMoreMovies={trending_movies} large={norendertrending} />}
                {top_rated.length > 0 && <Movieslist title={'top rated'} item={top_rated} getMoreMovies={toprated_movies} />}
                {popular_movie.length > 0 && <Movieslist title={'popular movies'} item={popular_movie} getMoreMovies={popular_movies} />}
                {upcoming_movies.length > 0 && <Movieslist title={'upcoming movies'} item={upcoming_movies} getMoreMovies={upcoming_movie} large={norendernormal} />}
                <div className='flex justify-between items-center mx-5 px-5 bg-stone-800 rounded-sm h-14'>
                    <div className='font-semibold text-xl uppercase tracking-widest'>{mwtitle}<sub className='text-xs text-center bg-red-700 '>genre</sub></div>
                    <div className='relative cursor-pointer group'>
                        <h1 className='tracking-wider uppercase'>filter</h1>
                        <div className='absolute  list-none bg-stone-700 top-6 -right-5 w-28 h-20 flex flex-col items-center rounded-md  invisible opacity-0 group-hover:visible group-hover:opacity-100 group-hover:z-10 z-10'>
                            <li onClick={()=>{setMWTitle('movies')}} className={`h-full w-full justify-center flex items-center hover:bg-stone-600 cursor-pointer rounded-tl-md rounded-tr-md ${mwtitle === 'movies'? 'text-red-500' : 'text-white'}`}>Movies</li>
                            <li onClick={()=>{
                                setMWTitle('Web Serires') 
                                // genrewise_web(genre) 
                                }} className={`h-full w-full justify-center flex items-center hover:bg-stone-600 cursor-pointer rounded-br-md rounded-bl-md ${mwtitle !== 'movies'? 'text-red-500' : 'text-white'}`}>Web Serires</li>
                        </div>
                    </div>
                </div>
                {
                    mwtitle === 'movies'? gernewisemovies.length ?
                    <>
                        {gernewisemovies.map((item, index) => {
                          
                          return  Object.values(item).flat().length>0 && <Movieslist key={index} title={Object.keys(item)[0]} item={Object.values(item)[0]} getMoreMovies={gernwisemoviecallback} large={norendernormal} />
    

                        }   
                        )}
                    </>
                    : null : 
                    <>                         
                    
                    {
                        gernewiseweb.length === 0 ? <h1 className='w-full h-96 flex justify-center items-center text-2xl'>Loding....</h1> :
                            gernewiseweb.map((item,idx)=>{
                               return item? <Weblist key={idx} title={Object.keys(item)[0]} item={Object.values(item)[0]} getMorewebMovies={gernwiseWebcallback} large={norendernormal} />:null
                            })
                    }                        
                    </>

                }
                    <hr className='mb-5'/>
                    <Footer />
            </div>
        </>
    )
},areEqual);

export default Movies