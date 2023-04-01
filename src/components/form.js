import { useParams } from 'react-router-dom'
import React, {useEffect, useState} from "react";
import '../App.css'; 

const API_URL=`https://api.tvmaze.com/singlesearch/shows`;

const Form = () => {
  const [seats, setSeats] = useState('');
  const [date, setDate] = useState('');
  const [genre, setGenre] = useState('');
  const {id}= useParams();
  console.log(id);

  const [isLoading, setIsLoading]=useState(true);
  const [movie, setMovie]=useState(null);

  useEffect(() => {
    const formData = JSON.parse(localStorage.getItem('formData'));
    console.log(formData);
    if (formData) {
    setSeats(formData.seats || '');
    setDate(formData.date || '');
    setGenre(formData.genre || '');
    }
    }, []);


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
        getMovies(`${API_URL}?q=${encodeURIComponent(id)}`);
    }
  },[id])

    if(isLoading){
    return(
      <div className="movie-section">
        <div className="loading">Loading...</div>
      </div>
    )
    }

  
    const handleSubmit = (event) => {
      event.preventDefault();
      if(seats>0){
        const formData = { seats, date, genre };
        localStorage.setItem('formData', JSON.stringify(formData));
        console.log('Form data stored in local storage:', formData);
        alert('Form data stored in local storage:',formData);
      }else{
        alert('Please enter valid number of seats');
      }
    };

  
  return (
    <section className="movie-section">
    <form onSubmit={handleSubmit}>
      <div className="movie-card">
        <figure>
          <img src={movie?.image?.medium} alt="" />
        </figure>
        <div className="card-content">
          <p className="title">Title: {movie?.name}</p>
          <p className="subtitle1">Genre: {movie.genres}</p>
          <div className="form-group subtitle1">
          <p htmlFor="date" className='subtitle1'>Number of Seats:</p>
            <input type="number" id="seats" value={seats} onChange={(e) => setSeats(e.target.value)} placeholder='Number of Seats' required />
          </div>
          <div className="form-group">
            <p htmlFor="date" className='subtitle1'>Date:</p>
            <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <button type="submit" className="back-btn">Book Now</button>
        </div>
      </div>
  </form>
    </section>

);
}

export default Form