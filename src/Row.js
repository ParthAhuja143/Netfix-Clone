import React, { useEffect, useState } from 'react'
import axios from './axios'
import './Row.css'
import Youtube from 'react-youtube'
import movieTrailer from 'movie-trailer'

const baseURL = 'https://image.tmdb.org/t/p/original/'

function Row(props){

    const [movies , setMovies] = useState([])
    const [trailerUrl , setTrailerUrl] = useState('')

    useEffect(() => {
       async function fetchData(){
       const request = await axios.get(props.fetchUrl)
       // console.log(request)
       setMovies(request.data.results)
       return request
   }

   fetchData()

   // if brackets are blank it menas run once when row loads and doesn't run again
   // fetchUrl is used in the array to relaod it with each URL change
    } , [props.fetchUrl])

    //console.table(movies)

    //from documentation of react youtube
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
           //https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
    }

    const handleClick = (movie) => {
        if(trailerUrl) {
            setTrailerUrl('')
        }
        else{
            movieTrailer(movie?.title || '')
            .then((url) => {
                // https://www.youtube.com/watch?v=XtMThy8QKqU&t=2436s
                // To get v=XtMThy8QKqU&t=2436s
                console.log(movie.title)
             const urlParams = new URLSearchParams(new URL(url).search)
                //console.log(urlParams.get('v'))
             setTrailerUrl(urlParams.get('v'))
            })
            .catch((error) => console.log(error))
        }
    }

    return (
        <div className = 'row'>

        <h2>{props.title}</h2>

        <div className = 'row_posters'>
            {movies.map((movie) => (
                //By giving key React doesn't re-render what it has already rendered once(optimises reload aand scroll)
                 <img 
                     key={movie.id}
                     onClick = {() => handleClick(movie)}
                     className = {`row_poster ${props.isLargeRow && 'row_posterLarger'}`} 
                     src = {`${baseURL}${ props.isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                     alt = {movie.title}
                     />
            ))}
        </div>
        {trailerUrl && <Youtube videoId = {trailerUrl} opts = {opts} /> }
        </div>
    )
}

export default Row