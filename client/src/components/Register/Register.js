import React,{Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
//import { connect } from 'react-redux';

//create the Navbar Component
class Register extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            email: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost:3001/register', data)
            .then(res => {
                res.status(200);
        });
        
        //api call, store into database

    }

    render(){
        return(
            <div class="container">
            <form action="http://127.0.0.1:3001/register" method="post">
            <h1>Create account</h1>
                    Name: <input type="text" name="name" placeholder="Your name" pattern="^([a-zA-Z]+\s)*[a-zA-Z]+$" value={this.state.name} onChange = {this.handleChange} required></input><br/>
                    Email: <input type="email" name="email" placeholder="example@gmail.com" value={this.state.email} onChange = {this.handleChange} required></input><br/>
                    Password: <input type="password" name="password" placeholder="At least 6 characters" minlength="6" maxlength="16" value={this.state.password} onChange = {this.handleChange} required></input><br/>
                    <button className="btn btn-primary" onClick={this.state.handleSubmit}>Register</button>
                    Already have an account? <Link to="/login" className="btn btn-link">Login</Link>
            </form>
            </div>
        )
    }
}


/*
function mapState(state) {
    const {registering} = state.registration;
    return {registering};
}

const actionCreators = {
    register: userActions.register
}

const connectRegister = connect(mapState, actionCreators) (Register);*/
export default Register;