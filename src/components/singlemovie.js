import { useParams } from 'react-router-dom'
import React, {useEffect, useState} from "react";
// import {API_URL} from "./context";
import { NavLink } from 'react-router-dom';
import '../App.css'; 

const API_URL=`https://api.tvmaze.com/singlesearch/shows`;

const Singlemovie = () => {
  // const {id}= useParams();
  const {id}= useParams();
  console.log(id);

  const [isLoading, setIsLoading]=useState(true);
  const [movie, setMovie]=useState(null);


  const getMovies = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
        setMovie(data);
        setIsLoading(false);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    if (id) {
      let timerOut= setTimeout(()=>{
        getMovies(`${API_URL}?q=${encodeURIComponent(id)}`);
      },800);
      return ()=>clearTimeout(timerOut);
    }
  },[id])

    if(isLoading){
    return(
      <div className="movie-section">
        <div className="loading">Loading...</div>
      </div>
    )
    }

  
  return (
    <section className="movie-section">
      <div className="movie-card">
        <figure>
        <img src={movie?.image?.medium} alt="" />
        </figure>
        <div className="card-content">
          <p className="title">Title: {movie?.name}</p>
          <p className="subtitle1">Genre : {movie.genres}</p>
          <p className="subtitle2">{movie.summary}</p>
          <p className="subtitle1">Language: {movie.language}</p>
          <p className="subtitle1">Country: {movie.network.country.name}</p>
          <p className="subtitle1">Ratings: {movie.rating.average}</p>
          <NavLink to="./form" className="back-btn">Book Now</NavLink>
        </div>
      </div>
    </section>

);
}

export default Singlemovie
{/* <h1>Single movie {id}</h1> */}