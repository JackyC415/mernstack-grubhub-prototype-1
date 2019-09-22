import React,{Component} from 'react';
import {Link} from 'react-router-dom';

//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
            <nav class="navbar navbar-inverse">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#">Lab1</a>
                    </div>
                    <ul class="nav navbar-nav">
                    <li><Link to="/calculate">Calculate</Link></li>
                    <li><Link to="/grubhub">GrubHub</Link></li>
                    </ul>
                </div>
            </nav>
        </div>
        )
    }
}

export default Navbar;