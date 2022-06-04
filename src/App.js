import './App.css';
import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Main } from './components/Main';
import { Mint } from './components/Mint';
import { Listing } from './components/Listing';
import { Buy } from './components/Buy';
import { NavBar } from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <NavBar />
      <div class="d-flex justify-content-center ">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Mint" element={<Mint />} />
          <Route path="/Listing" element={<Listing />} />
          <Route path="/Buy" element={<Buy />} />
          {/* <Route component={Error} /> */}
        </Routes>
      </div>

    </>
  );
}

export default App;
