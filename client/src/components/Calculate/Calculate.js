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

    sendRestAPI = (d) => {
        axios.post('http://localhost:3001/calculate', d)
            .then(response => {
            console.log("Status Code: ", response.status);
        });
    }

    calculateOperation = (param) => e => {

        this.state.operation = param;

        const data = {
            firstNum : this.state.firstNum,
            secondNum : this.state.secondNum,
            operation : this.state.operation,
            result : this.state.result
        }
        
        switch(param) {
            case "add": 
                const add = parseInt(this.state.firstNum) + parseInt(this.state.secondNum);
                this.setState({result : add});
                this.sendRestAPI(data)
            break;
            case "sub":
                const sub = parseInt(this.state.firstNum) - parseInt(this.state.secondNum);
                this.setState({result : sub}); 
                this.sendRestAPI(data)
            break;
            case "mul": 
                const mul = parseInt(this.state.firstNum) * parseInt(this.state.secondNum);
                this.setState({result : mul});
                this.sendRestAPI(data)
            break;
            case "div": 
                const div = parseInt(this.state.firstNum) / parseInt(this.state.secondNum);
                this.setState({result : div});
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
                        </div>
                        <br/>

                        <div style={{width: '30%'}} class="form-group">
                            <input  type="number" onChange = {this.getSecondNumber} class="form-control" name="secondNum" placeholder="Second Number"/>
                        </div>
                        <br/>

                        <div style={{width: '30%'}}>
                            <button onClick = {this.calculateOperation("add")} class="btn btn-primary" type="button">Add</button>
                            <button onClick = {this.calculateOperation("sub")} class="btn btn-primary" type="button">Sub</button>
                            <button onClick = {this.calculateOperation("mul")} class="btn btn-primary" type="button">Mul</button>
                            <button onClick = {this.calculateOperation("div")} class="btn btn-primary" type="button">Div</button>
                        </div>
                        <div>
                            Answer: {this.state.result}
                        </div>
                </form>
                </div>
            </div>
        )
    }
}

export default Calculator;