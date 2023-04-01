import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    axios.get('https://api.tvmaze.com/search/shows?q=all')
      .then(response => {
        setShows(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home shows={shows} />
          </Route>
          <Route path="/summary/:id">
            <Summary shows={shows} />
          </Route>
          <Route path="/booking/:id">
            <Booking shows={shows}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home(props) {
  const { shows } = props;

  return (
    <div>
      <h1>TV Show Listings</h1>
      {shows.map(show => (
        <div key={show.show.id}>
          <h2><Link to={`/summary/${show.show.id}`}>{show.show.name}</Link></h2>
          <div>{show.show.status}</div>
          <div>{show.show.type}</div>
          <img src={show.show.image ? show.show.image.medium : ''} alt={show.show.name} />
        </div>
      ))}
    </div>
  );
}

function Summary(props) {
  const { shows } = props;
  const [show, setShow] = useState({});

  useEffect(() => {
    const id = props.match.params.id;
    const foundShow = shows.find(s => s.show.id === parseInt(id));
    setShow(foundShow);
  }, [shows, props.match.params.id]);

  return (
    <div>
      <h1>Summary for {show.show ? show.show.name : ''}</h1>
      <div>{show.show ? show.show.summary : ''}</div>
      <Link to={`/booking/${show.show ? show.show.id : ''}`}><button>Book Tickets</button></Link>
    </div>
  );
}

function Booking(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [movie, setMovie] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      name,
      email,
      phone,
      movie
    };
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  useEffect(() => {
    const id = props.match.params.id;
    const foundShow = shows.find(s => s.show.id === parseInt(id));
    setMovie(foundShow.show.name);
  }, [shows, props.match.params.id]);

  return (
    <div>
      <h1>Booking Page for {movie}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Phone:
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </label>
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
}

export default App;
