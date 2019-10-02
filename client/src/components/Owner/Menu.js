import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText
} from 'reactstrap';

class OwnerMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: true,
            displayEdit: false
        };

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.displayEdit = this.displayEdit.bind(this);
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    displayEdit = () => {
        this.setState({
            displayEdit: !this.state.displayEdit
        })
    }

    render() {
        let editItem = null;
        if (this.state.displayEdit) {
            editItem = (
                <div>
                    <Form width="50%">
                        <FormGroup>
                            <Label for="itemName">Name</Label>
                            <Input type="text" name="name_name" id="name_id" placeholder="Name of the item" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="itemPrice">Price</Label>
                            <Input type="number" name="price_name" id="price_id" placeholder="Price of the item" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="itemQuantity">Quantity</Label>
                            <Input type="select" name="quantity_name" id="quantity_id">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="itemDescription">Description</Label>
                            <Input type="textarea" name="text_name" id="text_id" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="itemImage">Image</Label>
                            <Input type="file" name="image_name" id="image_id" />
                            <FormText color="muted">
                                Please upload an image for your item.
                        </FormText>
                        </FormGroup>
                        <Button>Add</Button>
                    </Form>
                </div>
            )
        }
        return (
            <div>
                <h1>Welcome to Owner's Menu!</h1>
                <div>
                    <Navbar color="faded" light>
                        <NavbarBrand href="/" className="mr-auto">Menu Categories</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse isOpen={!this.state.collapsed} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink onClick={this.displayEdit}>Thai Cuisine</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink onClick={this.displayEdit}>American Cuisine</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                    {editItem}
                </div>
            </div>
        )
    }
}

export default OwnerMenu;