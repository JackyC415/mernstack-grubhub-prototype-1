import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//create the Navbar Component
class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            password: ''
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
            name: this.state.name,
            password: this.state.password
        }
        this.sendRestAPI(data);
    }

    render(){

        //implement cookie to keep track of login session

        return(
            <div class="container">
            <form action="http://127.0.0.1:3001/login" method="post">
            <h1>Login</h1>
                    <div>
                    Name: <input type="text" name="name" placeholder="Your name" pattern="^([a-zA-Z]+\s)*[a-zA-Z]+$" value={this.state.name} onChange = {this.handleChange} required></input><br/>
                    Password: <input type="password" name="password" placeholder="At least 6 characters" minlength="6" maxlength="16" value={this.state.password} onChange = {this.handleChange} required></input><br/>
                    <button className="btn btn-primary" onClick={this.handleSubmit}>Login</button>
                    </div>
                    New? <Link to="/register" className="btn btn-link">Create account</Link>
            </form>
            </div>
        )
    }
}

export default Login;