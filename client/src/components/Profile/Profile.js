import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import { Table, Button } from 'reactstrap';

class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      phone: 'null',
      restaurantname: '',
      zipcode: '',
      isInEditMode: false
    }

    this.getProfile = this.getProfile.bind(this);
  }

  componentDidMount() {
    this.getProfile();
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  getProfile = () => {
    axios.post('/profile')
      .then(res => {
        if (res)
          this.setState({ name: res.data[0].name });
        this.setState({ email: res.data[0].email });
        this.setState({ password: res.data[0].password });
        this.setState({ restaurantname: res.data[0].restaurantname });
        this.setState({ zipcode: res.data[0].zipcode });
      }).catch((err) => {
        console.log('profile err:' + err);
      })
  }

  changeEditMode = () => {
    this.setState({ isInEditMode: !this.state.isInEditMode })
  }

  updateName = () => {
    this.setState({ isInEditMode: false, name: this.refs.nameInput.value })
  }

  updateEmail = () => {
    this.setState({ isInEditMode: false, email: this.refs.emailInput.value })
  }

  updatePassword = () => {
    this.setState({ isInEditMode: false, password: this.refs.passwordInput.value })
  }

  updatePhone = () => {
    this.setState({ isInEditMode: false, phone: this.refs.phoneInput.value })
  }

  updateRestaurant = () => {
    this.setState({ isInEditMode: false, restaurantname: this.refs.restaurantInput.value })
  }

  updateZipcode = () => {
    this.setState({ isInEditMode: false, zipcode: this.refs.zipcodeInput.value })
  }

  renderProfile = () => {
    let ownerProfileTD = null;
    let ownerProfileTH = null;
    if (cookie.load('cookie') === 'owner') {
      ownerProfileTD =
        <div>
          <td>{this.state.restaurantname}</td>
          <td>{this.state.zipcode}</td>
        </div>
      ownerProfileTH =
        <div>
          <th>Restaurant</th>
          <th>Zipcode</th>
        </div>
    }

    return <div class="container">
      <h1>Profile</h1>
      <h3>Note: double click to edit profile.</h3>
      <form onSubmit={this.handleSubmit}>
        <div onDoubleClick={this.changeEditMode}>
          <Table dark>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Phone</th>
                {ownerProfileTH}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.state.name}</td>
                <td>{this.state.email}</td>
                <td>{this.state.password}</td>
                <td>{this.state.phone}</td>
                {ownerProfileTD}
              </tr>
            </tbody>
          </Table>
        </div>
      </form>
    </div>
  }

  editProfile = () => {
    let editOwnerProfileOpts = null;
    if (cookie.load('cookie') === 'owner') {
      editOwnerProfileOpts = <div>
        <p>
          <input type="text" onChange={this.handleChange} defaultValue={this.state.restaurantname} ref="restaurantInput" required />
          <button onClick={this.changeEditMode}>Cancel</button>
          <button onClick={this.updateRestaurant}>Edit</button>
        </p>
        <p>
          <input type="text" onChange={this.handleChange} defaultValue={this.state.zipcode} ref="zipcodeInput" required />
          <button onClick={this.changeEditMode}>Cancel</button>
          <button onClick={this.updateZipcode}>Edit</button>
        </p>
      </div>
    }
    return <div>
      <p>
        <input type="text" onChange={this.handleChange} defaultValue={this.state.name} ref="nameInput" required />
        <button onClick={this.changeEditMode}>Cancel</button>
        <button onClick={this.updateName}>Edit</button>
      </p>
      <p>
        <input type="email" onChange={this.handleChange} defaultValue={this.state.email} ref="emailInput" required />
        <button onClick={this.changeEditMode}>Cancel</button>
        <button onClick={this.updateEmail}>Edit</button>
      </p>
      <p>
        <input type="password" onChange={this.handleChange} defaultValue={this.state.password} ref="passwordInput" required />
        <button onClick={this.changeEditMode}>Cancel</button>
        <button onClick={this.updatePassword}>Edit</button>
      </p>
      <p>
        <input type="text" onChange={this.handleChange} defaultValue={this.state.phone} ref="phoneInput" required />
        <button onClick={this.changeEditMode}>Cancel</button>
        <button onClick={this.updatePhone}>Edit</button>
      </p>
      {editOwnerProfileOpts}
    </div>
  }

  render() {
    let main = null;
    let redirectLogin = null;

    if (!cookie.load('cookie')) {
      redirectLogin = <Redirect to="/login" />
    } else {
      //switch between edit and view mode
      if (!this.state.isInEditMode) {
        main = (this.renderProfile());
      } else {
        main = (this.editProfile());
      }
    }

    //render based on status and mode
    return (
      <div>
        {redirectLogin}
        {main}
      </div>
    )
  }
}

export default Profile;