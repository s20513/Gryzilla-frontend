import { useState } from 'react';
import {Navbar, Nav, NavDropdown, Container, Form, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import gryzillaLogo from '../assets/logo.png';
import {AiOutlineUser} from "react-icons/ai"
import LoginModal from "./LoginModal"

export default function NavBar() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <Navbar bg="black" expand="lg" sticky="top" variant="dark">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                    src={gryzillaLogo}
                    height="30"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Posty</Nav.Link>
                    <Nav.Link as={Link} to="/profile">Profil</Nav.Link>
                    <NavDropdown title="Ulubione" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                        Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                        Separated link
                    </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav className="d-flex">
                    <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                />
                            <Button variant="outline-success">Search</Button>
                    </Form>
                    {/* <AiOutlineUser/> */}
                    <Button variant="primary" onClick={() => setModalShow(true)}>
                        Login
                    </Button>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>

            <LoginModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        
        </>
    );
}

    