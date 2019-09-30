import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      phone: 'null',
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
      }).catch((err) => {
        console.log('profile err:' + err);
      })
  }

  changeEditMode = () => {
    this.setState({ isInEditMode: !this.state.isInEditMode })
  }

  updateName = () => {
    this.setState({ isInEditMode: false,name: this.refs.nameInput.value})
  }

  updateEmail = () => {
    this.setState({ isInEditMode: false, email: this.refs.emailInput.value})
  }

  updatePassword = () => {
    this.setState({ isInEditMode: false, password: this.refs.passwordInput.value})
  }

  updatePhone = () => {
    this.setState({ isInEditMode: false, phone: this.refs.phoneInput.value})
  }

  renderEditProfile = () => {
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
    </div>
  }

  renderDefaultProfile = () => {
    return <div class="container">
      <h1>Profile</h1>
      <h3>Note: double click to edit profile.</h3>
      <form onSubmit={this.handleSubmit}>
        <div onDoubleClick={this.changeEditMode}>
          Name: {this.state.name}<br/>
          Email: {this.state.email}<br/>
          Pasword: <br value={this.state.password}></br>
          Phone: {this.state.phone}<br/>
        </div>
        <input type="submit" value="Update"></input><br />
      </form>
    </div>
  }

  render() {
    return this.state.isInEditMode ? this.renderEditProfile() : this.renderDefaultProfile();
  }

}

export default Profile;