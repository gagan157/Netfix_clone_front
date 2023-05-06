import React, { useState, memo, useCallback } from 'react'
import Moviescontext from './moviescontext'
import Fetchurls, { genreUrl, genreWiseUrls } from './Fetchurls'

function Moviesstate(props) {

    const [genre, setGenre] = useState([])
    const [trendmovies, setTreandmovies] = useState([])
    const [originalmovies, setOriginalmovies] = useState([])
    const [top_rated, setToprated] = useState([])
    const [popular_movie, setPopular] = useState([])
    const [upcoming_movies, setUpcoming] = useState([])
    const [slideshow, setSlideshow] = useState([])
    // const [totalpages, setTotalpages] = useState(null)
    const [gernewisemovies, setGernewisemovies] = useState([])
    const [gernewiseweb, setGernewiseWebs] = useState([])
    const [totalresult, setTotalresult] = useState(0)
    // const [urlpage, setUrlpage] = useState(1)
    const [pageno,Setpageno] = useState(new Map()) 
   

    const [{ trending, discover, toprated, popular, upcoming }] = Fetchurls
    const [{ movies }, { tv }] = genreUrl
    const [{gernmovie},{gerntv}] = genreWiseUrls;



    const slide_show = useCallback(async () => {
        const reponse = await fetch(trending)
        const jsondata = await reponse.json()
        const tpage = jsondata.total_pages
        const get_rdm_pageno = Math.floor(Math.random() * tpage)

        const getrndpageurl = `https://api.themoviedb.org/3/trending/all/week?api_key=50b43dc195512316fa649b7e2dde0473&page=${get_rdm_pageno}`
        const response1 = await fetch(getrndpageurl)
        const jsondata1 = await response1.json()
        const result_lenth = jsondata1.results.length
        let slideshowno = []
        while (slideshowno.length < 1) {
            const get_rdm_item = Math.floor(Math.random() * result_lenth)
            if (!slideshowno.includes(get_rdm_item)) {
                slideshowno.push(get_rdm_item)
            }

        }
        const result_item = jsondata1.results
        let slide = slideshowno.map((no) =>
            result_item[no]
        )
        // console.log('slide work')
        setSlideshow(slide)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slideshow])

    const get_movies_genre = useCallback(async () => {
        const response = await fetch(movies)
        const jsondata = await response.json()
        const responsetv = await fetch(tv)
        const jsondatatv = await responsetv.json()
       
        const ids = new Set();
        let alldata = [];
        for(let datamovie of jsondata.genres){
            ids.add(datamovie.id);
            alldata.push(datamovie);
        }
        // console.log(jsondatatv.genres);
        for(let datatv of jsondatatv.genres){
            if(!ids.has(datatv.id)){
                ids.add(datatv.id);
                alldata.push(datatv)
            }
        }
        // console.log('genre work' +alldata)
        // setGenre([...genre, jsondata.genres, jsondatatv.genres])
        setGenre([...alldata])
        // localStorage.setItem('gern',[JSON.stringify(alldata)])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [genre])

    const discover_movies = useCallback(async () => {
        if(!pageno.has('discover')){
            Setpageno(pageno.set('discover',1))
        }
        else{
            let pano = pageno.get('discover')
            Setpageno(pageno.set('discover',pano+1))
        }
        const response = await fetch(`${discover}&page=${pageno.get('discover')}`)
        const jsondata = await response.json()
        setTotalresult(jsondata.total_results)
        // console.log('orignal work')
        setOriginalmovies([...originalmovies, ...jsondata.results])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [originalmovies])

    const trending_movies = useCallback(async () => {
        if(!pageno.has('trending')){
            Setpageno(pageno.set('trending',1))
        }
        else{
            let pano = pageno.get('trending')
            Setpageno(pageno.set('trending',pano+1))
        }
        const response = await fetch(`${trending}&page=${pageno.get('trending')}`)
        const jsondata = await response.json()
        // console.log(jsondata.results)
        setTreandmovies([...trendmovies, ...jsondata.results])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trendmovies])

    const toprated_movies = useCallback(async () => {
        if(!pageno.has('toprated')){
            Setpageno(pageno.set('toprated',1))
        }
        else{
            let pano = pageno.get('toprated')
            Setpageno(pageno.set('toprated',pano+1))
        }
        const response = await fetch(`${toprated}&page=${pageno.get('toprated')}`)
        const jsondata = await response.json()
        setToprated([...top_rated, ...jsondata.results])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [top_rated])

    const popular_movies = useCallback(async () => {
        if(!pageno.has('popular')){
            Setpageno(pageno.set('popular',1))
        }
        else{
            let pano = pageno.get('popular')
            Setpageno(pageno.set('popular',pano+1))
        }
        const response = await fetch(`${popular}&page=${pageno.get('popular')}`)
        const jsondata = await response.json()
        setPopular([...popular_movie, ...jsondata.results])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [popular_movie])

    const upcoming_movie = useCallback(async () => {
        if(!pageno.has('upcoming')){
            Setpageno(pageno.set('upcoming',1))
        }
        else{
            let pano = pageno.get('upcoming')
            Setpageno(pageno.set('upcoming',pano+1))
        }
        const response = await fetch(`${upcoming}&page=${pageno.get('upcoming')}`)
        const jsondata = await response.json()
        setUpcoming([...upcoming_movies, ...jsondata.results])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [upcoming_movies])

    const genrewise_movies = useCallback((gene, id) => {
        
        const gernelist = [...new Map(gene.flat().map((item) => [item.id, item])).values()]    
          
        const datamovieslist = gernelist.map(async(item,index)=>{
            if(gernewisemovies.length === 0){  
                            
                let response = await fetch(`${gernmovie}${item.id}`)
                const jsondata = await response.json()
                const result = await jsondata.results              
                const allgernemoviesdata = {}
                allgernemoviesdata[item.name] = result
                // localStorage.removeItem(item.name)
                return allgernemoviesdata
                
            }
            else{
                if(item.name===id){   
                   
                    if(!pageno.has(id)){
                        Setpageno(pageno.set(id,2))
                    }
                    else{
                        let pano = pageno.get(id)
                        Setpageno(pageno.set(id,pano+1))
                    }
                    // localStorage.setItem(item.name,urlpage)                    
                    // setUrlpage(prev=>prev+1)
                    let response = await fetch(`${gernmovie}${item.id}&page=${pageno.get(id)}`)
                    const jsondata = await response.json()                    
                    const result = await jsondata.results 

                    let newlist = gernewisemovies.map((movieobj)=>{
                        let keyobj = Object.keys(movieobj)[0];
                        if(keyobj === item.name){
                            console.log(movieobj[keyobj])
                            let newobj = {
                                [keyobj] : [...movieobj[keyobj], ...result]
                            }
                            return newobj;
                        }
                        else{
                            return movieobj;
                        }
                    })
                    // console.log(newlist)
                    // const concatmovielist = []
                    // gernewisemovies.forEach((lis)=>{
                    //     if(item.name===Object.keys(lis)[0]){
                    //         const obj = {}
                    //         obj[item.name] = lis[item.name].concat(result)
                    //         concatmovielist.push(obj)
                    //     }
                    //     else{
                    //         concatmovielist.push(lis)
                    //     }
                    // })
                    // setGernewisemovies(concatmovielist)     
                    setGernewisemovies(newlist)     

                }
            }
        })
       
        if (gernewisemovies.length === 0){
            
           Promise.all(datamovieslist).then((result)=>setGernewisemovies(result))
            
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gernewisemovies])

   const genrewise_web = useCallback((gern,id)=>{    
    const gernelist = [...new Map(gern.flat().map((item) => [item.id, item])).values()]
    
     const data = gernelist.map(async(item)=>{
        const response = await fetch(`${gerntv}${item.id}`)
        const responsedata = await response.json()
        if(gernewiseweb.length === 0){          
            if(responsedata.total_results !== 0){
                let gernname = item.name;
                let obj = {
                    [gernname] : responsedata.results
                };  
                        
                return obj
            }
        }
        else{
            if(item.name === id){   
                if(!pageno.has(id)){
                    Setpageno(pageno.set(id,2))
                }
                else{
                    let pano = pageno.get(id)
                    Setpageno(pageno.set(id,pano+1))
                }
               
                let response = await fetch(`${gerntv}${item.id}&page=${pageno.get(id)}`)
                const jsondata = await response.json()                    
                const result = await jsondata.results 
                
                let newlist = gernewiseweb.map((movieobj)=>{
                    let keyobj = Object.keys(movieobj)[0];
                   
                    if(keyobj === item.name){                        
                        let newobj = {
                            [keyobj] : [...movieobj[keyobj], ...result]
                        }
                        return newobj;
                    }
                    else{
                        return movieobj;
                    }
                })

                // const concatmovielist = []
                // gernewiseweb.forEach((lis)=>{
                //     if(lis && item.name === Object.keys(lis)[0]){
                //         const obj = {}
                //         obj[item.name] = lis[item.name].concat(result)
                //         concatmovielist.push(obj)
                //     }
                //     else if(lis){
                //         concatmovielist.push(lis)
                //     }
                // })
                // console.log(concatmovielist)   
                // setGernewiseWebs(concatmovielist)         
                setGernewiseWebs(newlist)         
            }
        }
     })
     if (gernewisemovies.length === 0){

         Promise.all(data).then((result)=>{
            const newresult = result.filter(item=>item)
             setGernewiseWebs(newresult)
            })
        }

   } ,[gernewiseweb])

   
    return (
        <Moviescontext.Provider value={{ genre, trendmovies, originalmovies, top_rated, popular_movie, upcoming_movies, slideshow, genrewise_movies, gernewisemovies, totalresult ,gernewiseweb, slide_show, get_movies_genre, trending_movies, discover_movies, toprated_movies, popular_movies, upcoming_movie, genrewise_web }}>
            {props.children}
        </Moviescontext.Provider>
    )
}

export default memo(Moviesstate);