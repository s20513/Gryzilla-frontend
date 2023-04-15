import { useRef, useState } from "react";
import {
	Navbar,
	Nav,
	NavDropdown,
	Container,
	Form,
	Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import gryzillaLogo from "../assets/logo.png";
import { AiOutlineUser } from "react-icons/ai";
import LoginModal from "./LoginModal";
import { useAuth } from "../context/AuthContext";
import { useNavbar } from "../context/NavbarContext";

export default function NavBar() {
	const [modalShow, setModalShow] = useState(false);
	const auth = useAuth();

	const navigation = useNavbar();

	const handleClick = () => {
		navigation.setShowInput(true);
	};

	return (
		<>
			<Navbar bg="black" expand="lg" sticky="top" variant="dark">
				<Container>
					{/* {auth.isLogged && <div style={{ color: "white" }}>Id: {auth.id} Nick: {auth.nick} Role: {auth.role}</div>} */}

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
						<Nav
							className="me-auto my-2 my-lg-0"
							style={{ maxHeight: "100px" }}
						>
							{/* <Nav.Link as={Link} to="/posts">
								Posty
							</Nav.Link> */}
							<NavDropdown title="Posty" id="basic2">
								<NavDropdown.Item as={Link} to="/posts">
									Główna
								</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.2">Ulubione</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item
									as={Link}
									to="/posts"
									onClick={() => handleClick()}
								>
									Nowy
								</NavDropdown.Item>
							</NavDropdown>

							<NavDropdown title="Artykuły" id="basic">
								<NavDropdown.Item as={Link} to="/articles">
									Główna
								</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.2">Ulubione</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="/articles/new">Nowy</NavDropdown.Item>
							</NavDropdown>

							<Nav.Link as={Link} to="/groups">
								Grupy
							</Nav.Link>
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
							{!auth.isLogged && (
								<Button variant="primary" onClick={() => setModalShow(true)}>
									Login
								</Button>
							)}

							{auth.isLogged && (
								// <Button variant="primary" onClick={() => auth.logout()}>
								// 	Wyloguj się
								// </Button>
								<div className="d-flex align-items-center">
									
									<NavDropdown align="end" title={<><AiOutlineUser size={25} style={{ color: "white" }} />{auth.nick}{auth.id}</>} id="basic">
										
										<NavDropdown.Item as={Link} to={`/profile/rerender/${auth.id}`}>
											Mój profil
										</NavDropdown.Item>
										<NavDropdown.Item href="#action/3.2">
											....
										</NavDropdown.Item>
										<NavDropdown.Divider />
										<NavDropdown.Item onClick={()=> {auth.logout()}}>
											Wyloguj się
										</NavDropdown.Item>
									</NavDropdown>
									
								</div>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>

			<LoginModal show={modalShow} onHide={() => setModalShow(false)} />
		</>
	);
}
