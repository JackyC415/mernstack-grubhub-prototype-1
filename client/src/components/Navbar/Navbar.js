import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
    }
    render() {
        let main = null;
        if (cookie.load('cookie')) {
            main = (
                <div>
                    <nav class="navbar navbar-inverse">
                        <div class="container-fluid">
                            <div class="navbar-header">
                                <a class="navbar-brand" href="/">Lab1</a>
                            </div>
                            <ul class="nav navbar-nav">
                                <li><Link to="/calculate">Calculate</Link></li>
                                <li><Link to="/profile">Profile</Link></li>
                                <li><Link to="/" onClick={this.handleLogout}>Logout</Link></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            );
        } else {
            main = (
                <div>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </div>
            )
        }
        let redirectVar = null;
        if (cookie.load('cookie') === 'owner') {
            redirectVar = <Redirect to="/ownerhome" />
        } else if (cookie.load('cookie') === 'buyer') {
            redirectVar = <Redirect to="/buyerhome" />
        }
        return (
            <div>
                {main}
                {redirectVar}
            </div>
        )
    }
}

export default Navbar;