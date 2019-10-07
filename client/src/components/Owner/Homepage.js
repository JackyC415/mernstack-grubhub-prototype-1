import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';

class OwnerHome extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let redirectHome = null;
        if (cookie.load('cookie') !== 'buyer') {
            redirectHome = <Redirect to="/ownerhome" />
        }
        return (
            <div>
                {redirectHome}
                <li><Link to="/ownerhome/menu">Menu</Link></li>
                <li><Link to="/ownerhome/vieworder">View Orders</Link></li>
            </div>
        )
    }
}

export default OwnerHome;