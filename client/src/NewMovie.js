import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class NewMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: {reviews: []},
            review: {
                name: "",
                comment:"",
                stars: 5
            },
            errors: {
                name: "",
                comment:"",
                stars: 5
            }
    }
}

    addMovie = e => {
        e.preventDefault();
        const postData = { ...this.state.movie, ...this.state.review };
        axios.post("http://localhost:8000/api/movies", postData)
            .then(res => {
                console.log(res);
                if (res.data.errors) {
                    this.setState({ errors: res.data.errors });
                } else {
                    console.log('pushing to movies')
                    this.props.history.push("/movies")
                }
            })
            .catch(err => console.log(err));
    }

    changeTitle = e => {
        this.setState({ movie: { ...this.state.movie, title: e.target.value } });
    }
    changeName = e => {
        this.setState({ review: { ...this.state.movie, name: e.target.value } });
    }
    changeComment = e => {
        this.setState({ review: { ...this.state.movie, comment: e.target.value } });
    }
    changeRating = e => {
        this.setState({ review: { ...this.state.movie, stars: e.target.value } });
    }


    render() {
        return (
            <>
                <h2>Submit a movie and your review</h2>
                <form onSubmit={this.addMovie}>
                    Movie Title: &nbsp;
                <input
                        type="text"
                        placeholder="Title"
                        onChange={this.changeTitle}
                    />
                                        {
                        this.state.errors.title ?
                            <span>{this.state.errors.title.message}</span> :
                            ""
                    }
                    <br /><br />
                    Your name: &nbsp;
                <input
                        type="text"
                        placeholder="Name"
                        onChange={this.changeName}
                        value={this.state.review.name}
                    />
                    {
                        this.state.errors.name ?
                            <span>{this.state.errors.name.message}</span> :
                            ""
                    }
                    <br /><br />
                    Your review : &nbsp;
                <input
                        type="text"
                        placeholder="Your Review"
                        onChange={this.changeComment}
                        value={this.state.review.comment}
                    />
                    {
                        this.state.errors.comment ?
                            <span>{this.state.errors.comment.message}</span> :
                            ""
                    }
                    <br /><br />
                    Stars: &nbsp;
                    <select onChange={this.changeRating}>
                        <option>5</option>
                        <option>4</option>
                        <option>3</option>
                        <option>2</option>
                        <option>1</option>
                    </select>
                    <br /><br />
                    <input type="submit" value="Submit" />
                </form>
            </>
        );
    }
}
export default NewMovie;
