import React from 'react'
import { useGlobalContext } from './context'
import { NavLink } from 'react-router-dom';

const Movies = () => {
  const { movie, isLoading } = useGlobalContext();

  if(isLoading){
    return(
      <div className="">
        <div className="loading">Loading...</div>
      </div>
    )
  }
  return (
    <section className="movie-page">
      <div className="container grid grid-4-col">
        {movie.map((curMovie) => {
          const { id, name, image } = curMovie.show;
          const movieName = name.substring(0, 15);
          const imageUrl = image?.['medium'] || '';
          return (
            <NavLink to={`movie/${name}`} key={id}>
              <div className="card">
                <div className="card-info">
                  <h2>{movieName.length >= 15 ? `${movieName}...` : movieName}</h2>
                  <img src={imageUrl} alt={id} />
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </section>


  );
}

export default Movies








