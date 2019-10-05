//References: https://www.telerik.com/kendo-react-ui/components/grid/editing/editing-inline/

import React, { Component } from 'react';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import '@progress/kendo-theme-default/dist/all.css';
import { MyCommandCell } from './myCommandCell.jsx';
import axios from 'axios';

export const sampleProducts = [];

class Ownerorder extends Component {
    editField = "inEdit";
    CommandCell;
    
    state = {
        data: [...sampleProducts],
        ownerID: null
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

    componentDidMount() {
      axios.get('/getOwnerMenu')
      .then(res => {
        if (res) {
            for(var i = 0; i < res.data.length; i++) {
            this.state.data.push(res.data[i]);
            }
            this.setState({ ownerID: res.data[0].menu_owner});
        }
      }).catch((err) => {
        throw err;
      })

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
                item.id === dataItem.id ?
                    { ...item, inEdit: true } : item
            )
        });
    }

    remove = (dataItem) => {
        const data = [...this.state.data];
        dataItem.menu = "Breakfast";
        dataItem.ownerID = this.state.ownerID;
        this.removeItem(data, dataItem);
        this.removeItem(sampleProducts, dataItem);
        
        this.setState({ data });
        this.deleteOrderAPI(dataItem);

        console.log(dataItem);
    }

    add = (dataItem) => {
        dataItem.inEdit = undefined;
        dataItem.id = this.generateId(sampleProducts);
        dataItem.menu = "Breakfast";
        dataItem.ownerID = this.state.ownerID;

        sampleProducts.unshift(dataItem);
        this.setState({
            data: [...this.state.data],
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
        dataItem.menu = "Breakfast";
        dataItem.ownerID = this.state.ownerID;
        const updatedItem = { ...dataItem, inEdit: undefined };

        this.updateItem(data, updatedItem);
        this.updateItem(sampleProducts, updatedItem);

        this.setState({ data });
        console.log(dataItem);

        this.updateOrderAPI(dataItem);
    }

    cancel = (dataItem) => {
        const originalItem = sampleProducts.find(p => p.id === dataItem.id);
        const data = this.state.data.map(item => item.id === originalItem.id ? originalItem : item);

        this.setState({ data });
    }

    updateItem = (data, item) => {
        let index = data.findIndex(p => p === item || (item.id && p.id === item.id));
        if (index >= 0) {
            data[index] = { ...item };
        }
    }

    itemChange = (event) => {
        const data = this.state.data.map(item =>
            item.id === event.dataItem.id ?
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
        this.setState({ data: [...sampleProducts] });
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
                <Column field="id" title="Id" width="50px" editable={false} />
                <Column field="p_name" title="Name" />
                <Column field="p_description" title="Description" />
                <Column field="p_image" title="Image" />
                <Column field="p_quantity" title="Quantity" />
                <Column field="p_price" title="Price" />
                <Column cell={this.CommandCell} width="240px" />
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

    generateId = data => data.reduce((acc, current) => Math.max(acc, current.id), 0) + 1;

    removeItem(data, item) {
        let index = data.findIndex(p => p === item || item.id && p.id === item.id);
        if (index >= 0) {
            data.splice(index, 1);
        }
    }
}

export default Ownerorder;