import React from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Image } from 'react-bootstrap'
import Sunshine from "../../assets/sunshine.png"

function NavBar() {
    return (
        <Navbar inline className="navigationBar" variant="dark" expand="lg">
            <Navbar.Brand href="#home">
                <Image src={Sunshine} style={{ height: '40px', width: '40px', marginLeft: '10px' }} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Form className="searchBar">
                    <FormControl inline type="text" placeholder="Search City, State, or Zip" className="mr-sm-3" />
                    <Button inline variant="outline-light">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar
