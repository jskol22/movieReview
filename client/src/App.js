import React, { Component } from 'react';
import './App.css';
import AllMovies from './AllMovies';
import NewMovie from './NewMovie';
import OneMovie from './OneMovie';
import NewReview from './NewReview';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <h1>Movies</h1>
        <Link to="/movies">All Movies</Link>
        &nbsp; &nbsp;
        <Link to="/movies/new">Add a New Movie</Link>
        <Route exact path="/movies" component={AllMovies} />
        <Route path="/movies/new" component={NewMovie} />
        <Route path="/movie/:_id" component={OneMovie} />
        <Route path="/movies/:_id/review" component={NewReview} />
      </BrowserRouter>
    );
  }

}

export default App;
