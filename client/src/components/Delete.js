import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

export default class Delete extends Component {
    render() {
        
        let results = this.props.accountList;
        let accountListOptions = [];
        // build array with for loop  through each result in state
        for (var i = 0; i < results.length; i++) {
            accountListOptions[i] = 
                 <option id={results[i].id} key={i} >{results[i].accountName}</option>
        }
        return (
            <div>
                 <Accordion defaultActiveKey="0">
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                    Delete an Account
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    <Form>
                                        <Form.Group>
                                            <Form.Control as="select" id="accountOption" custom>
                                                <option defaultValue="Select an account to delete" disabled ></option>
                                                {accountListOptions}
                                            </Form.Control>
                                        </Form.Group>   
                                        <Button variant="primary" type="button" onClick={this.delete}>
                                            Delete
                                        </Button>
                                    </Form>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        </Accordion>
        </div>
        )
    }

    delete = (e) => {
        const { context } = this.props;
       
        // retrieve selected item from menu and id
        const chooseDelete = document.getElementById('accountOption');
        const optionSelected = chooseDelete.options[chooseDelete.selectedIndex];
        const id = optionSelected.id;
      

        context.data.deleteAccount(id)
            .then(() => {
                window.location.href = "/accounts";
       
      
            }).catch((errors) => {
                console.log(errors);
                // this.props.history.push('/error');
            });  
     }
}