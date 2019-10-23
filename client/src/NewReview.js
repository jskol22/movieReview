import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class NewReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: {reviews: []},
            review: {
                name: "",
                comment: "",
                stars:5,
            },
            errors: {}

        }
    }
    componentDidMount() {
        let _id = this.props.match.params._id
        axios.get(`http://localhost:8000/api/movie/${_id}`)
            .then(res => this.setState({ movie: res.data }))
            .catch(err => console.log(err))
        this.setState({ review: { stars: 5 } });
    }

    leaveReview = e => {
        e.preventDefault();
        let _id = this.props.match.params._id;
        axios.post(`http://localhost:8000/api/movies/${_id}/review`, this.state.review)
            .then(res => {
                console.log(res);
                if (res.data.errors) {
                    this.setState({ errors: res.data.errors.reviews.errors });
                } else {
                    this.componentDidMount();
                    this.props.history.push(`/movie/${_id}`)
                }
            })
            .catch(err => console.log(err));
    }

    changeName = e => {
        this.setState({ review: { ...this.state.review, name: e.target.value } });
    }
    changeComment = e => {
        this.setState({ review: { ...this.state.review, comment: e.target.value } });
    }
    changeRating = e => {
        this.setState({ review: { ...this.state.review, stars: e.target.value } });
    }

    render() {
        return (
            <>
                <br /> <br />
                <h2>Add a review for {this.state.movie.title}</h2>
                <form onSubmit={this.leaveReview}>
                    Your name: &nbsp;
                    <input
                        type="text"
                        placeholder="Your name:"
                        onChange={this.changeName}
                    />
                    {
                        this.state.errors.name ?
                            <span>{this.state.errors.name.message}</span> :
                            ""
                    }
                    <br /><br />
                    Your review: &nbsp;
                    <textarea
                        placeholder="Your comment"
                        onChange={this.changeComment}
                    ></textarea>
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

export default NewReview;
