import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// const Account = (props) => {
export default class Account extends Component {
    render() {
        return (
            <div>
                <Form.Group as={Row}>
                    <Form.Label column med="4">{this.props.accountName}</Form.Label>
                    <Col med="8">
                        <Form.Control type="number" value={this.props.accountBalance} onChange={this.change} />
                    </Col>
                </Form.Group>
            </div>
    
        )
    }
    
    change = (event) => {
        console.log('change')
    }
}

