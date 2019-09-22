import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Calculate from './Calculate/Calculate';
import GrubHub from './GrubHub/GrubHub';

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Navbar}/>
                <Route path="/calculate" component={Calculate}/>
                <Route path="/grubhub" component={GrubHub}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;