import React from 'react';
import Home from './Home';
import SingleMovie from './components/singlemovie'
import {Routes, Route } from 'react-router-dom';
import Error from './components/error';
import './App.css';
import  Form  from './components/form';

const App = () => {
  return <>
    
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/movie/:id' element={<SingleMovie/>}/>
        <Route path='/movie/:id/form' element={<Form/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
   
  </>
}

export default App