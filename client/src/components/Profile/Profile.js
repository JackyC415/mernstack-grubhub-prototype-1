import React, {Component} from 'react';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import axios from 'axios';

class Profile extends Component {
    constructor(props){
      super(props);

      this.state = {
        name: null,
        email: null,
        restaurantname: null,
        phone: null,
        cuisine: null,
        loading: false,
        output: null
      }
      this.handleChange = this.handleChange.bind(this);
    }
  
    componentDidMount() {
        axios.get('http://localhost:3001/getProfile')
        .then(res => {
          if (res)
          this.setState({ name: res.data[0].name });
          this.setState({ email: res.data[0].email });
          this.setState({ restaurantname: res.data[0].restaurantname });
          this.setState({ phone: res.data[0].phone});
          this.setState({ cuisine: res.data[0].cuisine});
          this.setState({ loading: true });
        }).catch((err) => {
          console.log('Profile Error: ' + err);
        })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    updateProfile = (data) => {
        
        axios.post('http://localhost:3001/updateProfile', data)
            .then(res => {
                this.setState({ output: res.data })
            });
            console.log(data);
    }

    updateOwner = (e) => {
        e.preventDefault();

        const ownerData = {
            name: this.state.name,
            email: this.state.email,
            restaurantname: this.state.restaurantname,
            cuisine: this.state.cuisine,
            phone: "N/A"
        }
        this.updateProfile(ownerData);
    }

    updateBuyer = (e) => {
        e.preventDefault();

        const buyerData = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            restaurantname: "N/A",
            cuisine: "N/A"
        }
        this.updateProfile(buyerData);
    }

    render() {
        let renderPage = 'No Profile Found!';
        if (!cookie.load('cookie')) {
            renderPage = <Redirect to="/login" />
        } else if(this.state.loading && cookie.load('cookie') === 'owner') {
            renderPage = 
            <div>
                 Name: <input type="text" name="name" defaultValue={this.state.name} onChange={this.handleChange} required></input><br/>
                 Email: <input type="email" name="email" defaultValue={this.state.email} onChange={this.handleChange} required ></input><br/>
                 Restaurant: <input type="text" name="restaurantname" defaultValue={this.state.restaurantname} onChange={this.handleChange} required></input><br/>
                 Cuisine: <input type="text" name="cuisine" defaultValue={this.state.cuisine} onChange={this.handleChange} required></input><br/>
                 <button onClick={this.updateOwner}>Update Profile</button>
            </div>
        } else if (cookie.load('cookie') === 'buyer') {
            renderPage = 
            <div>
                 Name: <input type="text" name="name" defaultValue={this.state.name} onChange={this.handleChange} required></input><br/>
                 Email: <input type="email" name="email" defaultValue={this.state.email} onChange={this.handleChange} required ></input><br/>
                 Phone: <input type="text" name="phone" defaultValue={this.state.phone} onChange={this.handleChange} required></input><br/>
                 <button onClick={this.updateBuyer}>Update Profile</button>
            </div>
        }
        return <div>
            {renderPage}
            <div> {this.state.output} </div>
        </div>
        
    }
}
 
export default Profile;