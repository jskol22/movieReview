import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {
    Link
} from 'react-router-dom';

class AllMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: {reviews:[]},
            avgReview: 0,
            review: {rating:5},
            errors: {},
            movies: []
          }
        }

    componentDidMount() {
        axios.get("http://localhost:8000/api/movies")
            .then(res => this.setState({ movies: res.data }))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                <h2>Movie List</h2>
                <table border="1">
                    <tbody>
                        <tr>
                            <th>Movie Title</th>
                            <th>Average Rating</th>
                            <th>Available Actions</th>
                        </tr>
                        {
                            this.state.movies.map(movie =>
                                <tr key={movie._id}>
                                    <td>{movie.title}</td>
                                    <td>Avg. Rating: {movie.reviews.reduce((a, c) => a + c.stars, 0)/movie.reviews.length}</td>
                                    <td>
                                        <Link to={"/movie/" + movie._id}>Read Reviews</Link>
                                        &nbsp; &nbsp;
                                        <Link to={"/movies/" + movie._id + "/review"}>Write Review</Link>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>


            </>
        );
    }

}

export default AllMovies;
