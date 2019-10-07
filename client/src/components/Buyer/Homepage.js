import React, { Component } from 'react';
import { MDBCol, MDBIcon } from "mdbreact";
import axios from 'axios';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';

class BuyerHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            item: null,
            redirectSearch: false,
            viewFilter: false,
            resultTable: [],
            filteredCuisines: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showFilterPage = this.showFilterPage.bind(this);
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    sendRestAPI = (data) => {
        axios.post('http://localhost:3001/searchItem', data)
            .then(res => {
                if (res.status === 200) {
                    this.setState({ resultTable: res.data });
                    //this.setState({ redirectSearch: true })
                } else {
                    this.setState({ redirectSearch: false })
                }
            });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.sendRestAPI({ item: this.state.item });
    }

    showFilterPage = (e) => {
            this.setState({ viewFilter: true })
            axios.post('http://localhost:3001/filter')
            .then(res => {
                if (res.status === 200) {
                    this.setState({ filteredCuisines: res.data });
                } else {
                    this.setState({ redirectSearch: false })
                }
            });
    }

    render() {
        if (this.state.redirectSearch) {
            return <Redirect to="/buyerhome/search" />;
        }

        let filterPage = null;
        if(this.state.viewFilter) {
            filterPage = <div>
            <table>
                Filter:
                <tbody>
                    {this.state.filteredCuisines.map((item, i) =>
                        <tr id={i}>
                            <td style={{ textAlign: 'center' }}>{item.cuisine}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>
        }
        let redirectHome = null;
        if (cookie.load('cookie') !== 'owner') {
            redirectHome = <Redirect to="/buyerhome" />
        }

        let showRestaurants = null;
        if(this.state.resultTable.length > 0) {
            showRestaurants = (
                <div>
                    <table>
                        <tbody>
                            {this.state.resultTable.map((item, i) =>
                                <tr id={i}>
                                Restaurant {i}: <td style={{ textAlign: 'center' }}> {item.restaurantname}</td>
                                <Link to="/buyerhome/addtocart">Order from Restaurant</Link>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )
        }
        return (
            <div>
                {redirectHome}
                <h2>Buyer Homepage</h2>
                <li><Link to="/buyerhome/viewcart">Cart</Link></li>
                <MDBCol md="6">
                    <form className="form-inline mt-4 mb-4" onSubmit={this.handleSubmit}>
                        <MDBIcon icon="search" />
                        <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search item name" aria-label="Search"
                            name="item" value={this.state.item} onChange={this.handleChange} required />
                    </form>
                </MDBCol>
                {showRestaurants}
                <button onClick={this.showFilterPage}>Filter</button>
                {filterPage}
            </div>
        )
    }
}

export default BuyerHome;