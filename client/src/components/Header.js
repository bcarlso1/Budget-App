import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default class Header extends Component {
    render() {
        return (
            <div>

            <Navbar bg="primary" variant="dark" expand="sm">
                <Navbar.Brand href="/accounts">Simple Budget App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/tbd">Placeholder</Nav.Link>         
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
                
                
        </div>
        )
    }

}