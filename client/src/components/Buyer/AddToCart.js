//References: https://www.telerik.com/kendo-react-ui/components/grid/editing/editing-inline/
import React from 'react';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { MyCommandCell } from './myCommandCell';
import axios from 'axios';

const orderItems = [];
class AddToCart extends React.Component {
    editField = "inEdit";
    CommandCell;

    state = {
        data: [...orderItems],
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
        axios.get('http://localhost:3001/getOwnerID')
            .then(res => {
                if (res) {
                    console.log(res.data);
                    this.setState({ ownerID: res.data });
                } else {
                    console.log("Can't get owner ID for this restaurant!")
                }
            });
    }

    addToCart = (data) => {
        data.menu_owner = this.state.ownerID;
        axios.post('http://localhost:3001/addToCart', data)
            .then(res => {
                if (res) console.log("Added item to cart!");
            });
    }

    removeFromCart = (data) => {
        data.ownerID = this.state.ownerID;
        axios.post('http://localhost:3001/removeFromCart', data)
            .then(res => {
                if (res) console.log("Removed item from cart!");
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
        this.removeItem(orderItems, dataItem);

        this.setState({ data });
    }

    add = (dataItem) => {
        dataItem.inEdit = undefined;
        dataItem.ProductID = this.generateId(orderItems);

        orderItems.unshift(dataItem);
        this.setState({
            data: [...this.state.data]
        });

        this.addToCart(dataItem);
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
        this.updateItem(orderItems, updatedItem);

        this.setState({ data });
    }

    cancel = (dataItem) => {
        const originalItem = orderItems.find(p => p.ProductID === dataItem.ProductID);
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
        this.setState({ data: [...orderItems] });
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
                <h1>Order (Add to Cart)</h1>
                </GridToolbar>
                <Column field="ProductID" title="Id" width="50px" editable={false} />
                <Column field="o_name" title="Name" />
                <Column field="o_quantity" title="Quantity" editor="numeric" />
                <Column cell={this.CommandCell} width="240px" />
            </Grid>
        );
    }

    generateId = data => data.reduce((acc, current) => Math.max(acc, current.ProductID), 0) + 1;

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

export default AddToCart;
