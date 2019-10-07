//References: https://www.telerik.com/kendo-react-ui/components/grid/editing/editing-inline/
import React, { Component } from 'react';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { MyCommandCell } from './ViewOrderActions';
import axios from 'axios';

const cart = [];
class ViewOrders extends Component {
    editField = "inEdit";
    CommandCell;

    state = {
        data: [...cart],
        ownerID: null
    };

    constructor(props) {
        super(props);

        this.CommandCell = MyCommandCell({
            remove: this.remove,
            cancel: this.cancel,
            editField: this.editField
        });
    }

    componentDidMount() {
        axios.get('http://localhost:3001/getBuyerOrders')
            .then(res => {
                if (res) {
                    console.log(res.data);
                    if (res.data.length >= 0) {
                        for (var i = 0; i < res.data.length; i++) {
                            this.state.data.push(res.data[i]);
                        }
                    }
                    this.setState({ ownerID: res.data[0].menu_owner });
                }
            }).catch((err) => {
                throw err;
            })
    }


    removeFromCart = (data) => {
        data.ownerID = this.state.ownerID;
        axios.post('http://localhost:3001/removeFromCart', data)
            .then(res => {
                if (res) console.log("Removed item from cart!");
            });
    }

    remove = (dataItem) => {
        const data = [...this.state.data];
        this.removeItem(data, dataItem);
        this.removeItem(cart, dataItem);

        this.setState({ data });
    }

    cancel = (dataItem) => {
        const originalItem = cart.find(p => p.ProductID === dataItem.ProductID);
        const data = this.state.data.map(item => item.ProductID === originalItem.ProductID ? originalItem : item);

        this.setState({ data });
    }

    itemChange = (event) => {
        const data = this.state.data.map(item =>
            item.ProductID === event.dataItem.ProductID ?
                { ...item, [event.field]: event.value } : item
        );

        this.setState({ data });
    }

    render() {
        const { data } = this.state;
        return (
            <Grid
                style={{ height: '420px' }}
                data={data}
                onItemChange={this.itemChange}
            >
                <GridToolbar>
                    <h1>Buyer Orders (may cancel items)</h1>
                </GridToolbar>
                <Column field="ProductID" title="Id" width="50px" editable={false} />
                <Column field="o_name" title="Item" />
                <Column field="o_quantity" title="Quantity" />
                <Column field="buyer_id" title="BuyerID" />
                <Column field="menu_owner" title="OwnerID" />
                <Column cell={this.CommandCell} width="240px" />
            </Grid>
        );
    }

    //generateId = data => data.reduce((acc, current) => Math.max(acc, current.ProductID), 0) + 1;

    removeItem(data, item) {
        let index = data.findIndex(p => p === item || item.ProductID && p.ProductID === item.ProductID);
        if (index >= 0) {
            data.splice(index, 1);
        }
        console.log(data);
        console.log(item);
        this.removeFromCart(item);
    }
}

export default ViewOrders;
