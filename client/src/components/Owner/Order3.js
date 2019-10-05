//References: https://www.telerik.com/kendo-react-ui/components/grid/editing/editing-inline/

import React, { Component } from 'react';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import '@progress/kendo-theme-default/dist/all.css';
import { MyCommandCell } from './myCommandCell.jsx';
import axios from 'axios';

const sampleProducts3 = [];

class Ownerorder extends Component {
    editField = "inEdit";
    CommandCell;

    state = {
        menu: "Appetizer",
        data: [...sampleProducts3]
    };

    constructor(props) {
        super(props);

        this.CommandCell = MyCommandCell({
            edit: this.enterEdit,
            remove: this.remove,

            add: this.add,
            discard: this.discard,

            update: this.update,
            cancel: this.cancel,

            editField: this.editField
        });
    }

    addOrderAPI = (data) => {
        axios.post('http://localhost:3001/addOrder', data)
            .then(res => {
                console.log("Added " + res.data);
            });
    }

    updateOrderAPI = (data) => {
        axios.post('http://localhost:3001/updateOrder', data)
            .then(res => {
                console.log("Updated " + res.data);
            });
    }

    deleteOrderAPI = (data) => {
        axios.post('http://localhost:3001/deleteOrder', data)
            .then(res => {
                console.log("Deleted " + res.data);
            });
    }

    enterEdit = (dataItem) => {
        this.setState({
            data: this.state.data.map(item =>
                item.ProductID === dataItem.ProductID ?
                    { ...item, inEdit: true } : item
            )
        });
    }

    remove = (dataItem) => {
        const data = [...this.state.data];
        this.removeItem(data, dataItem);
        this.removeItem(sampleProducts3, dataItem);

        this.setState({ data });

        this.deleteOrderAPI(dataItem);
    }

    add = (dataItem) => {
        dataItem.inEdit = undefined;
        dataItem.ProductID = this.generateId(sampleProducts3);

        sampleProducts3.unshift(dataItem);
        this.setState({
            data: [...this.state.data]
        });

        this.addOrderAPI(dataItem);

    }

    discard = (dataItem) => {
        const data = [...this.state.data];
        this.removeItem(data, dataItem);

        this.setState({ data });
    }

    update = (dataItem) => {
        const data = [...this.state.data];
        const updatedItem = { ...dataItem, inEdit: undefined };

        this.updateItem(data, updatedItem);
        this.updateItem(sampleProducts3, updatedItem);

        this.setState({ data });
        console.log(dataItem);

        this.updateOrderAPI(dataItem);
    }

    cancel = (dataItem) => {
        const originalItem = sampleProducts3.find(p => p.ProductID === dataItem.ProductID);
        const data = this.state.data.map(item => item.ProductID === originalItem.ProductID ? originalItem : item);

        this.setState({ data });
    }

    updateItem = (data, item) => {
        let index = data.findIndex(p => p === item || (item.ProductID && p.ProductID === item.ProductID));
        if (index >= 0) {
            data[index] = { ...item };
        }
    }

    itemChange = (event) => {
        const data = this.state.data.map(item =>
            item.ProductID === event.dataItem.ProductID ?
                { ...item, [event.field]: event.value } : item
        );

        this.setState({ data });
    }

    addNew = () => {
        const newDataItem = { inEdit: true };

        this.setState({
            data: [newDataItem, ...this.state.data]
        });
    }

    cancelCurrentChanges = () => {
        this.setState({ data: [...sampleProducts3] });
    }

    render() {
        const { data } = this.state;
        const hasEditedItem = data.some(p => p.inEdit);
        return (
            <Grid
                style={{ height: '420px' }}
                data={data}
                onItemChange={this.itemChange}
                editField={this.editField}
            >
                <Column field="ProductID" title="Id" width="50px" editable={false} />
                <Column field="ProductName" title="Name" />
                <Column field="ProductDescription" title="Description" />
                <Column field="ProductImage" title="Image" />
                <Column field="ProductQuantity" title="Quantity" />
                <Column field="ProductPrice" title="Price" />
                <GridToolbar>
                    <button
                        title="Add new"
                        className="k-button k-primary"
                        onClick={this.addNew}
                    >
                        Add new
                    </button>
                    {hasEditedItem && (
                        <button
                            title="Cancel current changes"
                            className="k-button"
                            onClick={this.cancelCurrentChanges}
                        >
                            Cancel current changes
                        </button>
                    )}
                </GridToolbar>
            </Grid>
        );
    }

    generateId = data => data.reduce((acc, current) => Math.max(acc, current.ProductID), 0) + 1;

    removeItem(data, item) {
        let index = data.findIndex(p => p === item || item.ProductID && p.ProductID === item.ProductID);
        if (index >= 0) {
            data.splice(index, 1);
        }
    }
}

export default Ownerorder;
