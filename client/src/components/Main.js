import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Calculate from './Calculate/Calculate';
import Login from './Login/Login';
import Register from './Register/Register';

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Navbar}/>
                <Route path="/calculate" component={Calculate}/>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;