import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';

class Calculator extends Component {

    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            firstNum: null,
            secondNum: null,
            operation: null,
            result: 0
        }

        //Bind the handlers to this class
        this.handleChange = this.handleChange.bind(this);
        this.calculateOperation = this.calculateOperation.bind(this);
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    sendRestAPI = (data) => {
        axios.post('http://localhost:3001/calculate', data)
            .then(res => {
                this.setState({ result: res.data })
            });
    }

    calculateOperation = (param) => e => {
        e.preventDefault();

        const data = {
            firstNum: this.state.firstNum,
            secondNum: this.state.secondNum,
            operation: param,
            result: this.state.result
        }

        switch (param) {
            case "add":
                this.sendRestAPI(data);
                break;
            case "sub":
                this.sendRestAPI(data);
                break;
            case "mul":
                this.sendRestAPI(data);
                break;
            case "div":
                this.sendRestAPI(data);
                break;
            default:
                console.log("Invalid calculator operation...");
        }

    }

    render() {
        return (
            <div>
                <br />
                <div class="container">
                    <h1>Calculator</h1>
                    <form action="http://127.0.0.1:3001/calculate" method="post">
                        <div style={{ width: '30%' }} class="form-group">
                            <input type="number" class="form-control" name="firstNum" placeholder="First Number" onChange={this.handleChange} required />
                        </div><br />

                        <div style={{ width: '30%' }} class="form-group">
                            <input type="number" class="form-control" name="secondNum" placeholder="Second Number" onChange={this.handleChange} required />
                        </div>

                        <div style={{ width: '30%' }}>
                            <Button onClick={this.calculateOperation("add")}>Add</Button> &nbsp;
                            <Button onClick={this.calculateOperation("sub")}>Sub</Button> &nbsp;
                            <Button onClick={this.calculateOperation("mul")}>Mul</Button> &nbsp;
                            <Button onClick={this.calculateOperation("div")}>Div</Button> &nbsp;
                        </div><br />
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