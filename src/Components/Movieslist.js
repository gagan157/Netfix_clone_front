import React, { memo ,useEffect } from 'react'
// import { useHorizontalScroll } from './horizontalscroll'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import InfiniteCustomScroll from '../customHooks/InfiniteCustomScroll'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft,faChevronRight } from '@fortawesome/free-solid-svg-icons'



function Movieslist(props) {
    const base_url = process.env.REACT_APP_IMAGE_API_HOST
    // const scrollRef = useHorizontalScroll();
    const { islarge, extralarge, normalsize, isposter } = props.large || {}
    const { title, item, getMoreMovies } = props;

    const handleNextList = function(e){
       let slider = document.getElementById(title)
       let movieWidth = islarge?208 : extralarge?320 : normalsize?176 : 288;
    //    console.log(window.innerWidth)
       slider.scrollLeft = slider.scrollLeft + movieWidth;
    }
    const handlePrevList = function(){
        let slider = document.getElementById(title)
        let movieWidth = islarge?208 : extralarge?320 : normalsize?176 : 288;
        slider.scrollLeft = slider.scrollLeft - movieWidth;
    }
   
    // useEffect(()=>{
    //     console.log(item)
    // })
    return (
        <>
            <div className='py-5 mb-7 relative'>
                <h1 className='text-3xl font-semibold capitalize mx-10'>{title}</h1>

                <InfiniteCustomScroll
                    id={title}
                    next={getMoreMovies}
                    loader={<h1>Loading....</h1>}
                    hasMore={true}
                    horizontalscroll={true} loading={true}
                    classname={'flex flex-row overflow-y-hidden overflow-x-scroll scrollbar-hide scroll-smooth snap-x gap-3 px-5 py-4 relative'}>

                    {
                        <div onClick={handlePrevList} className='bg-slate-500 bg-opacity-60 h-60 px-1 sticky left-0 top-0 bottom-0 m-auto flex justify-center items-center z-10 w-11 cursor-pointer group'>     

                            <FontAwesomeIcon className='text-white text-3xl opacity-60 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500' icon={faChevronLeft} />
                           
                        </div>
                        
                    }
                    {item.length === 0 ? <h1>Loading...</h1> : item.map((item, index) =>
                        <Link
                            className='snap-center'
                            key={index}
                            to={`/movies_details/${item.media_type?item.media_type:'movie'}/${item.title ? item.title : item.original_title || item.name ? item.name : item.original_name}/${item.id}`} 
                            state={{movieid:item.id, movietype:item.media_type?item.media_type:"movie"}}>
                            <div
                                id={item.id} style={{ backgroundImage: `url(${process.env.PUBLIC_URL})` }} className={`cursor-pointer transition-all relative bg-slate-600 duration-1000 flex-none ${extralarge ? 'w-[20rem] group h-[30rem] hover:border-4 hover:border-white hover:w-[40rem] relative' : islarge ? 'w-52 max-h-80 h-96 ' : normalsize ? 'w-44 h-72' : 'w-72 h-60'}`}>
                                <div className='absolute overflow-hidden w-6 h-6 top-5 left-4 opacity-30'>
                                    <img className='w-full h-full object-cover' src={process.env.PUBLIC_URL + '/favicon.ico'} alt="" />
                                </div>
                                <LazyLoadImage className={`relative w-full h-full transition-all object-cover ${extralarge ? ' transition-all   relative group-hover:invisible group-hover:opacity-0 duration-1000' : 'hover:scale-110'} `}
                                    src={`${isposter ? `${base_url}${item.poster_path}` : `${base_url}${item.backdrop_path}`}`} alt={`${base_url}${item.backdrop_path}`} />

                                {extralarge && <div id={item.id} className='absolute top-0 w-full h-full invisible opacity-0 transition-all duration-1000 group-hover:opacity-100 group-hover:visible'>
                                    <LazyLoadImage className='w-full h-full object-cover object-center' src={item.backdrop_path ? `${base_url}${item.backdrop_path}` : `${base_url}${item.poster_path}`} alt="" /></div>}
                            </div> </Link>
    

                    )}
                    
                    {
                        <div onClick={handleNextList} className='bg-slate-500 bg-opacity-80 h-60 px-1 sticky right-0 top-0 bottom-0 m-auto flex justify-center items-center z-10 w-11 cursor-pointer hover:bg-opacity-100 transition-all group'>
                            <FontAwesomeIcon className=' text-white text-3xl opacity-60 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500' icon={faChevronRight} />
                        </div>
                        
                    }
                </InfiniteCustomScroll>





                {/* {item.length===0? <h1>Loading...</h1>:item.map((item,index) =>

                        <div key={index} id={item.id} className={`transition-all bg-slate-600 duration-1000 flex-none ${extralarge ? 'w-[20rem] group h-[30rem] hover:border-4 hover:border-white hover:w-[40rem] relative' : islarge ? 'w-52 h-auto' : normalsize ? 'w-44 h-auto' : 'w-72 h-auto'}`}>
                            <LazyLoadImage className={`w-full h-full transition-all object-cover ${extralarge ? ' transition-all   relative group-hover:invisible group-hover:opacity-0 duration-1000' : 'hover:scale-110'} `}
                                src={`${isposter ? `${base_url}${item.poster_path}` : `${base_url}${item.backdrop_path}`}`} alt={`${base_url}${item.backdrop_path}`} />

                            {extralarge && <div id={item.id} className='absolute top-0 w-full h-full invisible opacity-0 transition-all duration-1000 group-hover:opacity-100 group-hover:visible'>
                                <LazyLoadImage className='w-full h-full object-cover object-center' src={item.backdrop_path ? `${base_url}${item.backdrop_path}` : `${base_url}${item.poster_path}`} alt="" /></div>}
                        </div>


                    )} 

                </div> */}
            </div>


        </>
    )
}

export default memo(Movieslist)