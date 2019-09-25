import React,{Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { registerUser } from "../../js/actions/index";

//create the Navbar Component
class Register extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            restaurantname: '',
            zipcode: '',
            owner: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.switchForm = this.switchForm.bind(this);
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    //send registration data to server for processing
    sendRestAPI = (data) => {
        axios.post('http://localhost:3001/register', data)
            .then(res => {
                res.status(200);
        });
    }

    handleSubmit = (e) => {

        /*
        e.preventDefault();

        const buyerData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            owner: false
        }

        const ownerData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            restaurantname: this.state.restaurantname,
            zipcode: this.state.zipcode,
            owner: true
        }

        //check account type and make post request with respective data
        if(!this.state.owner) {
            this.sendRestAPI(buyerData);
        } else {
            this.sendRestAPI(ownerData);
        }*/

        e.preventDefault();
        const { name } = this.state;
        const id = uuidv1();
        this.props.registerUser({ name, id });
        this.setState({ name: "" });
        this.setState({ email: "" });
        this.setState({ password: "" });

    }

    //switch between user and owner sign up form
    switchForm = (e) => {
        (!this.state.owner) ? this.setState({owner: true}) : this.setState({owner: false});
    }

    render(){
        let ownerForm = null;
        let accountType = "Owner";
        //pass owner registration form into main render
        if(this.state.owner) {
            ownerForm = 
            <div>
                Restaurant Name: <input type="text" name="restaurantname" placeholder="Restaurant name" value={this.state.restaurantname} onChange={this.handleChange} required ></input><br/>
                ZipCode: <input type="number" name="zipcode" placeholder="Zipcode" value ={this.state.zipcode} onChange={this.handleChange} minLength="6" maxLength="10" required ></input>
            </div>
            accountType = "Buyer";
        }
        //render user registration form by default
        return(
            <div class="container">
            <form>
            <h1>Create account</h1>
                    <div>
                    Name: <input type="text" name="name" placeholder="Your name" pattern="^([a-zA-Z]+\s)*[a-zA-Z]+$" value={this.state.name} onChange = {this.handleChange} required></input><br/>
                    Email: <input type="email" id="email" name="email" placeholder="example@gmail.com" value={this.state.email} onChange = {this.handleChange} required></input><br/>
                    Password: <input type="password" name="password" placeholder="At least 6 characters" minlength="6" maxlength="16" value={this.state.password} onChange = {this.handleChange} required></input><br/>
                    {ownerForm}
                    </div>
                    <div>
                    <button type="submit" className="btn btn-success btn-lg" onClick={this.handleSubmit} >Register</button>
                    </div>
                    Already have an account? <Link to="/login" className="btn btn-link">Login</Link><br/>
                    Switch Form: <a href='#' onClick={this.switchForm}>Sign Up as {accountType}</a><br/>
            </form>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
      registerUser: user => dispatch(registerUser(user))
    };
  }
  const Form = connect(null, mapDispatchToProps)(Register);
  export default Form;