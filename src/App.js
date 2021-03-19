import React from 'react'
import './App.css'
import Row from './Row'
import Banner from './Banner'
import Nav from './Nav'
import requests from './requests'

function App() {
  return (
    <div className="App">
    <Nav/>
    <Banner />
    <Row isLargeRow  title = 'Netflix Originals' fetchUrl = {requests.fetchNetflixOriginals}/>
    <Row title = 'Trending Now' fetchUrl = {requests.fetchTrending}/>
    <Row title = 'Top Rated' fetchUrl = {requests.fetchTopRated}/>
    <Row title = 'Action Movies' fetchUrl = {requests.fetchActionMovies}/>
    <Row title = 'Horror Movies' fetchUrl = {requests.fetchHorrorMovies}/>
    <Row title = 'Comedy Movies' fetchUrl = {requests.fetchComedyMovies}/>
    <Row title = 'Romance Movies' fetchUrl = {requests.fetchRomanceMovies}/>
    <Row title = 'Documentaries' fetchUrl = {requests.fetchDocumentaries}/>
    </div>
  );
}

export default App;
