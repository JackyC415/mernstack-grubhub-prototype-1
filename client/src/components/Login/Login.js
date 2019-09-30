import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookies';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: null,
            password: null,
            authFlag: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    sendRestAPI = (data) => {
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/login', data)
            .then(res => {
                console.log("Status Code : ", res.status);
                if (res.status === 200) {
                    this.setState({ authFlag: true })
                } else {
                    this.setState({ authFlag: false })
                }
            });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const credential = {
            email: this.state.email,
            password: this.state.password
        }
        this.sendRestAPI(credential);
    }

    render() {
        let redirectVar = null;
        if (cookie.load('cookie') === 'owner') {
            redirectVar = <Redirect to="/profile" />
        } else if (cookie.load('cookie') === 'buyer') {
            redirectVar = <Redirect to="/calculate" />
        }
        return (
            <div>{redirectVar}
                <div class="container">
                    <form onSubmit={this.handleSubmit}>
                        <h1>Login</h1>
                        Email: <input type="email" name="email" placeholder="example@gmail.com" value={this.state.email} onChange={this.handleChange} required></input><br />
                        Password: <input type="password" name="password" placeholder="At least 6 characters" minlength="6" maxlength="16" value={this.state.password} onChange={this.handleChange} required></input><br />
                        <input type="submit" value="Login"></input><br />
                        New? <Link to="/register" className="btn btn-link">Create account</Link>
                        <div> {this.state.output} </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;