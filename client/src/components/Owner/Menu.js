import React, { Component } from 'react';
import classnames from 'classnames';

import {
    TabContent, TabPane, Nav,
    NavItem, NavLink, Card,
    CardTitle, CardText, Row,
    Col, Button, Form,
    FormGroup, Label, Input,
    FormText, CustomInput
} from 'reactstrap';

class OwnerMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: '1',
            renderAddItem: false
        };

        this.toggle = this.toggle.bind(this);
        this.renderComponent = this.renderComponent.bind(this);
        this.unrenderComponent = this.unrenderComponent.bind(this);
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
        console.log(this.state.activeTab);
    }

    unrenderComponent() {
        this.setState({
            renderAddItem: false
        })
    }

    renderComponent() {
        this.setState({
            renderAddItem: true
        })
    }

    render() {
        let addItemButton = <div>
                    <Button onClick={this.renderComponent} color="primary">Add Item</Button>{' '}
        </div>
        let render = null;
        if(this.state.renderAddItem) {
            render = <div>
            <TabPane tabId="1">
              <Row>
                  <Col sm="12">
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
                                  <Label for="itemType">Menu Type</Label>
                                  <CustomInput type="select" id="type_id" name="type_name">
                                      <option value="">Select</option>
                                      <option>Breakfast</option>
                                      <option>Lunch</option>
                                      <option>Appetizer</option>
                                  </CustomInput>
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
                              <Button onClick={this.unrenderComponent}>Add</Button>
                          </Form>
                      </div>
                  </Col>
              </Row>
          </TabPane>
      </div>
        }
        return (
            <div>
                <h2>Owner Menu Page</h2>
                <div>
                    <div>
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '1' })}
                                    onClick={() => { this.toggle('1'); }}
                                >
                                    Add Item
                        </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggle('2'); }}
                                >
                                    Breakfast
                        </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '3' })}
                                    onClick={() => { this.toggle('3'); }}
                                >
                                    Lunch
                        </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '4' })}
                                    onClick={() => { this.toggle('4'); }}
                                >
                                    Appetizer
                        </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            {addItemButton}
                            <TabPane tabId="2">
                                <Row>
                                    <Col sm="6">
                                        <Card body>
                                            <CardTitle>American</CardTitle>
                                            <CardText>Taste like the mother shit.</CardText>
                                            <Button>View</Button>
                                        </Card>
                                    </Col>
                                    <Col sm="6">
                                        <Card body>
                                            <CardTitle>Thai</CardTitle>
                                            <CardText>Bomb af.</CardText>
                                            <Button>View</Button>
                                        </Card>
                                    </Col>
                                    <Col sm="6">
                                        <Card body>
                                            <CardTitle>Chinese</CardTitle>
                                            <CardText>It's getting dull' m8.</CardText>
                                            <Button>View</Button>
                                        </Card>
                                    </Col>
                                </Row>
                            </TabPane>

                            <TabPane tabId="3">
                                Hello
                            </TabPane>

                            <TabPane tabId="4">
                            {render}
                            </TabPane>

                        </TabContent>
                    </div>
                </div>
            </div>
        )
    }
}

export default OwnerMenu;