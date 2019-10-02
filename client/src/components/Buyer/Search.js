import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MDBCol, MDBIcon } from "mdbreact";

class BuyerSearch extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
               <MDBCol md="6">
                    <form className="form-inline mt-4 mb-4">
                        <MDBIcon icon="search" />
                        <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search" />
                    </form>
                </MDBCol>
            </div>
        )
    }
}

export default BuyerSearch;