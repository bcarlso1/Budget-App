import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';



export default class Accounts extends Component {

    state = {
        accountName: "",
        accountBalance: "",
        errors: [],
    }
    
    render() {

        const {
            errors,
        } = this.state;
        
        return (
            <React.Fragment>

                 <div>
                  

                    <Accordion defaultActiveKey="0">
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                    Add an Account
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Account Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter account name" name="accountName" onChange={this.change} />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Account Balance</Form.Label>
                                            <Form.Text className="text-muted">
                                                For credit cards, enter a negative balance
                                            </Form.Text>
                                            <Form.Control type="number" placeholder="Enter account balance" name="accountBalance" onChange={this.change}  />
                                        </Form.Group>
                                        <Button variant="primary" type="submit" onClick={this.submit}>
                                            Add Account
                                        </Button>
                                    </Form>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        </Accordion>
                        
                 </div>
                 

            </React.Fragment>
           
        )
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    submit = (e) => {
        e.preventDefault();
        const { context } = this.props;
        const { accountName, accountBalance, errors } = this.state;

        context.data.createAccount(accountName, accountBalance)
            .then( errors => {
                if (errors.length) {
                    console.log(errors);
                } else {
                    console.log('Account added')
                    window.location.href = "/accounts";
                }
            })
    }

}

