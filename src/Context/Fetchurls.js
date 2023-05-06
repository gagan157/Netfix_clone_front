
const Api_key = process.env.REACT_APP_API_KEY;
const host =  process.env.REACT_APP_API_HOST;

const Fetchurls = [
    {
        'trending': `${host}/trending/all/day?api_key=${Api_key}&language=en-US`,
        'discover': `${host}/discover/movie?api_key=${Api_key}&with_networks=213`,
        'toprated': `${host}/movie/top_rated?api_key=${Api_key}&language=en-US`,        
        "nowplaying": `${host}/movie/now_playing?api_key=${Api_key}&language=en-US&page=1`,
        'popular': `${host}/movie/popular?api_key=${Api_key}&language=en-US`,        
        'upcoming': `${host}/movie/upcoming?api_key=${Api_key}&language=en-US`
    }

]
export const genreUrl = [
    { "movies": `${host}/genre/movie/list?api_key=${Api_key}&language=en-US` },
    { "tv": `${host}/genre/tv/list?api_key=${Api_key}&language=en-US` }
]

export const genreWiseUrls = [

    
    {gernmovie : `${host}/discover/movie?api_key=${Api_key}&language=en-US&sort_by=popularity.desc&page=1&with_genres=`},
    {gerntv : `${host}/discover/tv?api_key=${Api_key}&language=en-US&sort_by=popularity.desc&page=1&with_genres=`}

]


export default Fetchurls;