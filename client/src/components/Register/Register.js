import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null,
            email: null,
            password: null,
            restaurantname: null,
            zipcode: null,
            cuisine: null,
            phone: null,
            owner: false,
            output: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.switchForm = this.switchForm.bind(this);
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    //send registration data to server for processing
    sendRestAPI = (data) => {
        axios.post('http://localhost:3001/register', data)
            .then(res => {
                this.setState({ output: res.data })
            });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const buyerData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            restaurantname: "N/A",
            cuisine: "N/A",
            zipcode: "N/A",
            phone: "N/A",
            owner: false
        }

        const ownerData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            restaurantname: this.state.restaurantname,
            zipcode: this.state.zipcode,
            cuisine: "N/A",
            phone: "N/A",
            owner: true
        }

        if (!this.state.owner) {
            this.sendRestAPI(buyerData);
        } else {
            this.sendRestAPI(ownerData);
        }

    }

    //switch between user and owner sign up form
    switchForm = (e) => {
        (!this.state.owner) ? this.setState({ owner: true }) : this.setState({ owner: false });
    }

    render() {
        var ownerForm = null;
        var accountType = "Owner";

        if (this.state.owner) {
            ownerForm =
                <div>
                    Restaurant Name: <input type="text" name="restaurantname" maxlength="30" placeholder="Restaurant name" value={this.state.restaurantname} onChange={this.handleChange} required></input><br />
                    ZipCode: <input type="number" name="zipcode" maxlength="5" placeholder="5 digits" value={this.state.zipcode} onChange={this.handleChange} required></input>
                </div>
            accountType = "User";
        }

        return (
            <div class="container">
                <form onSubmit={this.handleSubmit}>
                    <h1>Create an account</h1>
                    Name: <input type="text" name="name" placeholder="Your name" minlength="3" maxlength="30" value={this.state.name} onChange={this.handleChange} required></input><br />
                    Email: <input type="email" name="email" placeholder="example@gmail.com" value={this.state.email} onChange={this.handleChange} required></input><br />
                    Password: <input type="password" name="password" placeholder="At least 6 characters" minlength="6" maxlength="16" id="password" value={this.state.password} onChange={this.handleChange} required></input><br />
                    {ownerForm}
                    <div>
                    <Button>Register</Button> &nbsp;
                    <Button onClick={this.switchForm}>Sign Up as {accountType}</Button>
                    </div><br />
                    <div>Already have an account? <Link to="/login">Login</Link></div><br />
                    <div> {this.state.output} </div>
                </form>
            </div>
        )
    }
}

export default Register;