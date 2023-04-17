import { useRef, useState } from "react";
import {
	Navbar,
	Nav,
	NavDropdown,
	Container,
	Form,
	Button,
	DropdownButton,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import gryzillaLogo from "../assets/logo.png";
import { AiOutlineUser } from "react-icons/ai";
import LoginModal from "./LoginModal";
import { useAuth } from "../context/AuthContext";
import { useNavbar } from "../context/NavbarContext";
import useAxios from "../hooks/useAxios";
import AvatarMini from "./AvatarMini";
import { Dropdown } from "react-bootstrap";

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

					<Navbar.Toggle aria-controls="responsive-navbar-nav" />

					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto">
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
						<Form className="d-flex ">
							<Form.Control
								type="search"
								placeholder="Search"
								aria-label="Search"
							/>
							<Button variant="outline-success" className="ms-1">Search</Button>
						</Form>
						<Nav>
							{/* <AiOutlineUser/> */}
							{!auth.isLogged && (
								<Nav.Link onClick={() => setModalShow(true)}>
										Zaloguj się
								</Nav.Link>
							)}

							{auth.isLogged && (
								<div className="d-flex ms-2 flex">
									<AvatarMini idUser={auth.id} />

									<Dropdown>
										<Dropdown.Toggle
											className="profile-button ms-1"
											variant="success"
											id="dropdown-basic"
										>
											<span className="profile-button-nick">{auth.nick}</span>
										</Dropdown.Toggle>

										<Dropdown.Menu>
											<Dropdown.Item
												as={Link}
												to={`/profile/rerender/${auth.id}`}
											>
												Mój profil
											</Dropdown.Item>

											<Dropdown.Divider />

											<Dropdown.Item
												onClick={() => {
													auth.logout();
												}}
											>
												Wyloguj się
											</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
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
