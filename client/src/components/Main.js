import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Calculate from './Calculate/Calculate';

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/calculate" component={Calculate}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;