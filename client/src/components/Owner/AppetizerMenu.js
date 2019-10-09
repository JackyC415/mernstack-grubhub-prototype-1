//References: https://www.telerik.com/kendo-react-ui/components/grid/editing/editing-external-form/
import React, { Component } from 'react';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import '@progress/kendo-theme-default/dist/all.css';
import DialogContainer from './DialogContainer.jsx';
import cellWithEditing from './cellWithEditing.jsx';
import axios from 'axios';

export const appetizerItems = [];
class LunchMenu extends Component {
    state = {
        products: appetizerItems.slice(0, 7),
        productInEdit: undefined,
        ownerID: null,
        itemID: null
    };

    componentDidMount() {
        const data = { menu_section: 'Appetizer'};
        axios.post('/getOwnerMenu', data)
            .then(res => {
                if (res) {
                    console.log(res.data);
                    if (res.data.length >= 0) {
                        for (var i = 0; i < res.data.length; i++) {
                            this.state.products.push(res.data[i]);
                        }
                    }
                    this.setState({ ownerID: res.data[0].menu_owner });
                    this.setState({ itemID: res.data[0].p_id })
                }
            }).catch((err) => {
                throw err;
            })
    }

    saveItem = (data) => {
        data.menu_section = 'Appetizer';
        axios.post('http://localhost:3001/saveItem', data)
            .then(res => {
                if (res)
                    console.log("Add/Updated!");
            });
    }

    removeItem = (data) => {
        axios.post('http://localhost:3001/removeItem', data)
            .then(res => {
                console.log("Removed!!");
            });
    }

    edit = (dataItem) => {
        this.setState({ productInEdit: this.cloneProduct(dataItem) });
        console.log("EDITING" + dataItem);
    }

    remove = (dataItem) => {
        this.setState({
            products: this.state.products.filter(p => p.ProductID !== dataItem.ProductID)
        });
        this.removeItem(dataItem);
    }

    save = () => {
        const dataItem = this.state.productInEdit;
        const products = this.state.products.slice();
        const isNewProduct = dataItem.ProductID === undefined;

        if (isNewProduct) {
            products.unshift(this.newProduct(dataItem));
        } else {
            const index = products.findIndex(p => p.ProductID === dataItem.ProductID);
            products.splice(index, 1, dataItem);
        }

        this.setState({
            products: products,
            productInEdit: undefined
        });
        this.saveItem(dataItem);
        console.log(dataItem);
    }

    cancel = () => {
        this.setState({ productInEdit: undefined });
    }

    insert = () => {
        this.setState({ productInEdit: {} });
    }

    render() {
        return (
            <div >
                <Grid
                    data={this.state.products}
                    style={{ height: '420px' }}
                >
                    <GridToolbar>
                        <button
                            onClick={this.insert}
                            className="k-button"
                        >
                            Add New
                        </button>
                    </GridToolbar>
                    <Column field="ProductID" title="AutoIncrement" width="50px" />
                    <Column field="p_id" title="Item ID" />
                    <Column field="p_name" title="Name" />
                    <Column field="p_description" title="Description" />
                    <Column field="p_image" title="Image" />
                    <Column field="p_quantity" title="Quantity" width="150px" editor="numeric" />
                    <Column field="p_price" title="Price" />
                    <Column
                        title="Edit"
                        cell={cellWithEditing(this.edit, this.remove)}
                    />
                </Grid>
                {this.state.productInEdit && <DialogContainer dataItem={this.state.productInEdit} save={this.save} cancel={this.cancel} />}
            </div>
        );
    }

    dialogTitle() {
        return `${this.state.productInEdit.ProductID === undefined ? 'Add' : 'Edit'} product`;
    }
    cloneProduct(product) {
        return Object.assign({}, product);
    }

    newProduct(source) {

        const id = this.state.itemID + 1;
        const newProduct = {
            ProductID: id,
        };

        return Object.assign(newProduct, source);
    }
}

export default LunchMenu;