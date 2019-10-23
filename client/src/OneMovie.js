import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class OneMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: {reviews:[]},
            avgReview: 0,
            review: {rating:5},
            errors: {}
          }
        }

    componentDidMount() {
        let _id = this.props.match.params._id
        axios.get(`http://localhost:8000/api/movie/${_id}`)
        .then(res => {
            if(res.data.reviews.length === 0) {
              this.setState({movie: res.data, review: {stars:5}, avgReview: "no reviews"});
            } else {
              let a = 0;
              for(let i=0; i<res.data.reviews.length; i++) {
                a += res.data.reviews[i].stars;
              }
              a /= res.data.reviews.length;
              a = "" + a;
              if(a.length > 1) {
                a = a.substring(0,3);
              }
              this.setState({movie: res.data, review: {stars:5}, avgReview: a});
            }
          })
          .catch(err => console.log(err));
      }

    deleteMovie = e => {
        e.preventDefault();
        let _id = this.props.match.params._id;
        axios.delete(`http://localhost:8000/api/movies/${_id}`, this.state.movie)
            .then(res => {
                if (res.data.errors) {
                    this.setState({ errors: res.data.errors });
                } else {
                    this.props.history.push("/movies")
                }
            })
            .catch(err => console.log(err));

    }
    render() {
        return (
            
            <>
            <br/> <br/>
                <form onSubmit={this.deleteMovie}>
                    <input type="submit" value="DELETE MOVIE" />
                </form>
                <h2>Reviews for {this.state.movie.title}</h2>
                <table border="1">
                    <tbody>
                        <tr>
                            <th>Reviewer</th>
                            <th>Stars</th>
                            <th>Reviews</th>
                        </tr>
                        {
                            this.state.movie.reviews.map(review =>
                                <tr key={review._id}>
                                    <td>{review.name}</td>
                                    <td>{review.stars}</td>
                                    <td>{review.comment}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <br />
            </>
        );

    }
}

export default OneMovie;
