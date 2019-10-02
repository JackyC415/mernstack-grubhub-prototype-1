import React, { Component } from 'react';
import { MDBCol, MDBIcon } from "mdbreact";
import axios from 'axios';
import { Redirect } from 'react-router';

class BuyerHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            item: null,
            redirectSearch: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    sendRestAPI = (data) => {
        axios.post('http://localhost:3001/searchItem', data)
            .then(res => {
                if (res.status === 200) {
                    this.setState({ redirectSearch: true })
                } else {
                    this.setState({ redirectSearch: false })
                }
            });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.sendRestAPI({ item: this.state.item });
    }

    render() {
        if (this.state.redirectSearch) {
            return <Redirect to="/buyerhome/search" />;
        }
        return (
            <div>
                <h2>Buyer Homepage</h2>
                <MDBCol md="6">
                    <form className="form-inline mt-4 mb-4" onSubmit={this.handleSubmit}>
                        <MDBIcon icon="search" />
                        <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search item name" aria-label="Search"
                            name="item" value={this.state.item} onChange={this.handleChange} required />
                    </form>
                </MDBCol>
            </div>
        )
    }
}

export default BuyerHome;