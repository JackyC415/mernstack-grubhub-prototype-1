import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//create the Navbar Component
class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: null,
            password: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    sendRestAPI = (data) => {
        axios.post('http://localhost:3001/login', data)
            .then(res => {
                res.sendStatus(200);
        });
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        this.sendRestAPI(data);
    }

    render(){

        //implement cookie to keep track of login session

        return(
            <div class="container">
                <form method = "post">
                <h1>Create account</h1>
                    Email: <input type="email" name="email" placeholder="example@gmail.com" value={this.state.email} onChange = {this.handleChange} required></input><br/>
                    Password: <input type="password" name="password" placeholder="At least 6 characters" minlength="6" maxlength="16" value={this.state.password} onChange = {this.handleChange} required></input><br/>
                    <input type="submit" name="Login" onclick={this.handleSubmit}></input><br/>
                    New? <Link to="/register" className="btn btn-link">Create account</Link>
            </form>
            </div>
        )
    }
}

export default Login;