import React, {Component} from 'react';
import axios from 'axios';

class Calculator extends Component {

     //call the constructor method
     constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            firstNum : "",
            secondNum : "",
            operation : "",
            result : 0
        }

        //Bind the handlers to this class
        this.getFirstNumber = this.getFirstNumber.bind(this);
        this.getSecondNumber = this.getSecondNumber.bind(this);
        this.calculateOperation = this.calculateOperation.bind(this);
    }

    getFirstNumber = (e) => {
        this.setState({
            firstNum : e.target.value
        })
    }

    getSecondNumber = (e) => {
        this.setState({
            secondNum : e.target.value
        })
    }

    sendRestAPI = (data) => {
        axios.post('http://localhost:3001/calculate', data)
            .then(res => {
                this.setState({result: res.data})
        });
    }

    calculateOperation = (param) => e => {

        const data = {
            firstNum : this.state.firstNum,
            secondNum : this.state.secondNum,
            operation : param,
            result : this.state.result
        }
        
        switch(param) {
            case "add": 
                this.sendRestAPI(data)
            break;
            case "sub":
                this.sendRestAPI(data)
            break;
            case "mul": 
                this.sendRestAPI(data)
            break;
            case "div": 
                this.sendRestAPI(data)
            break;
            default: 
                console.log("throw err");
        }
    
    }

    render(){
        return(
            <div>
                <br/>
                <div class="container">
                <form action="http://127.0.0.1:3001/calculate" method="post">
                        <div style={{width: '30%'}} class="form-group">
                            <input  type="number" onChange = {this.getFirstNumber} class="form-control" name="firstNum" placeholder="First Number"/>
                        </div><br/>

                        <div style={{width: '30%'}} class="form-group">
                            <input  type="number" onChange = {this.getSecondNumber} class="form-control" name="secondNum" placeholder="Second Number"/>
                        </div><br/>

                        <div style={{width: '30%'}}>
                            <button onClick = {this.calculateOperation("add")} class="btn btn-primary" type="button">Add</button>
                            <button onClick = {this.calculateOperation("sub")} class="btn btn-primary" type="button">Sub</button>
                            <button onClick = {this.calculateOperation("mul")} class="btn btn-primary" type="button">Mul</button>
                            <button onClick = {this.calculateOperation("div")} class="btn btn-primary" type="button">Div</button>
                        </div>
                        <div>
                            Result: {this.state.result}
                        </div>
                </form>
                </div>
            </div>
        )
    }
}

export default Calculator;