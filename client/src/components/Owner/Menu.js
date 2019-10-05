import React, { Component }  from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Order from './Order';
import Order2 from './Order2';
import Order3 from './Order3';

class OwnerMenu extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
      console.log(this.state.activeTab);
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Tab1
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Tab2
            </NavLink>
          </NavItem>

           <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              Tab3
            </NavLink>
          </NavItem>

        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <h4><Order /></h4>
              </Col>
            </Row>
          </TabPane>

          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <h4><Order2 /></h4>
              </Col>
            </Row>
          </TabPane>

           <TabPane tabId="3">
            <Row>
              <Col sm="12">
                <h4><Order3 /></h4>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default OwnerMenu;