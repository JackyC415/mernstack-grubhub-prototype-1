import React, { Component } from 'react';
import axios from 'axios';

class Calculator extends Component {

    constructor(props) {
        super(props);
        
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
                this.setState(res.data)
            });
    }

    calculateOperation = (e) => {
        e.preventDefault();

        const data = {
            firstNum: this.state.firstNum,
            secondNum: this.state.secondNum,
            operation: this.state.operation,
            result: this.state.result
        }

        switch (this.state.operation) {
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
                    <form onSubmit={this.calculateOperation}>
                        <div style={{ width: '30%' }} class="form-group">
                            <input type="number" class="form-control" name="firstNum" placeholder="First Number" onChange={this.handleChange} required />
                        </div><br />

                        <div style={{ width: '30%' }} class="form-group">
                            <input type="number" class="form-control" name="secondNum" placeholder="Second Number" onChange={this.handleChange} required />
                        </div>

                        <div style={{ width: '30%' }}>
                            <input name="operation" onClick={this.handleChange} type="submit" value="add"></input> &nbsp;
                            <input name="operation" onClick={this.handleChange} type="submit" value="sub"></input> &nbsp;
                            <input name="operation" onClick={this.handleChange} type="submit" value="mul"></input> &nbsp;
                            <input name="operation" onClick={this.handleChange} type="submit" value="div"></input> &nbsp;
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