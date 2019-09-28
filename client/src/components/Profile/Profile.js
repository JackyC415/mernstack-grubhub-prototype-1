import React,{Component} from 'react';

class Profile extends Component {

    constructor(props){
        super(props);
  
        this.state = {
            username: "JackyC415",
            email: "JackyC415@gmail.com",
            password: "admin",
            phone: "415-672-0596",
            isInEditMode: true
        }
      }

      changeEditMode = () => {
        this.setState({
            isInEditMode: !this.state.isInEditMode
        })
      }

      defaultView = () => {
        return <div>
        <p>Name: 
        <input type="username"
        defaultValue={this.state.username}/>
        <button onClick={this.changeEditMode}>X</button>
        <button onClick={this.changeEditMode}>Ok</button>
        </p>
        <p>
        Email: 
        <input type="email"
        defaultValue={this.state.email}/>
        <button onClick={this.changeEditMode}>X</button>
        <button onClick={this.changeEditMode}>Ok</button>
        </p>
        <p>
        Password:
        <input type="password"
        defaultValue={this.state.password} />
        <button onClick={this.changeEditMode}>X</button>
        <button onClick={this.changeEditMode}>Ok</button>
        </p>
        <p>
        Phone:
        <input type="text"
        defaultValue={this.state.phone} />
        <button onClick={this.changeEditMode}>X</button>
        <button onClick={this.changeEditMode}>Ok</button>
        </p>
        </div>
      }

      render() {
        return this.defaultView();
      }
  
  }

  export default Profile;