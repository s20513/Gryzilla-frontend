import {Navbar, Nav, NavDropdown, Container, Form, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import gryzillaLogo from './logo.png';
import {AiOutlineUser} from "react-icons/ai"

export default function NavBar() {
    return (
        <Navbar bg="black" expand="lg" variant="dark">
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
            <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        />
                    <Button variant="outline-success">Search</Button>
            </Form>
            </Navbar.Collapse>
            <AiOutlineUser/>
        </Container>
        </Navbar>
    );
}

    