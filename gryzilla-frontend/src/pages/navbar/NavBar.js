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
import gryzillaLogo from "../../assets/logo.png";
import { AiOutlineUser } from "react-icons/ai";
import LoginModal from "../../components/LoginModal/LoginModal";
import { useAuth } from "../../context/AuthContext";
import { useNavbar } from "../../context/NavbarContext";
import useAxios from "../../hooks/useAxios";
import AvatarMini from "../../components/AvatarMini";
import { Dropdown } from "react-bootstrap";
import SearchBar from "./SearchBar";

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
								<NavDropdown.Item><Link to={"/articles/new"}>Nowy</Link></NavDropdown.Item>
							</NavDropdown>

							<NavDropdown title="Grupy" id="basic">
								<NavDropdown.Item as={Link} to="/groups">
									Główna
								</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.2">Ulubione</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item><Link to={"/groups/new"}>Nowy</Link></NavDropdown.Item>
							</NavDropdown>
						</Nav>
						<SearchBar />
						<Nav>
							{/* <AiOutlineUser/> */}
							{!auth.isLogged && (
								<Nav.Link onClick={() => setModalShow(true)}>
										Zaloguj się
								</Nav.Link>
							)}

							{auth.isLogged && (
								<div className="d-flex ms-2 flex">
									{/* <AvatarMini idUser={auth.id} /> */}

									<Dropdown>
										<Dropdown.Toggle
											className="profile-button
											 ms-1"
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

											<Dropdown.Item
												as={Link}
												to={`/adminPanel`}
											>
												Panel zarządzania
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
