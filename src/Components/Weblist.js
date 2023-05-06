import React, { memo ,useEffect } from 'react'
// import { useHorizontalScroll } from './horizontalscroll'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import InfiniteCustomScroll from '../customHooks/InfiniteCustomScroll'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft,faChevronRight } from '@fortawesome/free-solid-svg-icons'



function Weblist(props) {
    const base_url = process.env.REACT_APP_IMAGE_API_HOST
    // const scrollRef = useHorizontalScroll();
    const { islarge, extralarge, normalsize, isposter } = props.large || {}
    const { title, item, getMorewebMovies } = props;

    const handleNextList = function(e){
       let slider = document.getElementById(title)
       slider.scrollLeft = slider.scrollLeft + 500;
    }
    const handlePrevList = function(){
        let slider = document.getElementById(title)
        slider.scrollLeft = slider.scrollLeft - 500;
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
                    next={getMorewebMovies}
                    loader={<h1>Loading....</h1>}
                    hasMore={true}
                    horizontalscroll={true} loading={true}
                    classname={'flex flex-row overflow-y-hidden overflow-x-scroll scrollbar-hide scroll-smooth gap-3 px-5 py-4 relative group'}>

                    {
                        <div onClick={handlePrevList} className='bg-slate-300 bg-opacity-25 sticky left-0 top-0 bottom-0 m-auto flex justify-center items-center z-10 w-11 opacity-0 invisible group-hover:visible group-hover:opacity-100 hover:bg-opacity-50 hover:opacity-100 cursor-pointer group-hover:transition-all group-hover:duration-500 h-60'>
                            <FontAwesomeIcon className='text-white text-3xl' icon={faChevronLeft} />
                        </div>
                        
                    }
                  
                           {/* { console.log(item)} */}
                    {item.length === 0 ? <h1>Loading...</h1> : item.map((item, index) =>
                        <Link
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
                        <div onClick={handleNextList} className='bg-slate-300 bg-opacity-25 sticky -right-4 top-0 bottom-0 m-auto flex justify-center items-center opacity-0 invisible z-10 group-hover:visible group-hover:opacity-100 hover:bg-opacity-50 cursor-pointer group-hover:transition-all group-hover:duration-500 h-60'>
                            <FontAwesomeIcon className='text-white text-3xl' icon={faChevronRight} />
                        </div>
                        
                    }
                </InfiniteCustomScroll>





            </div>


        </>
    )
}

export default memo(Weblist)