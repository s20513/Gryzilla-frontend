import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import axios from "axios";

import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../context/AuthContext";

export default function MyVerticallyCenteredModal(props) {
	const cookies = new Cookies();
	const auth = useAuth();
	// const [loginPanel, setLoginPanel] = useState(true);

	const [nick, setNick] = useState("string");
	const [password, setPassword] = useState("string");

	const [data, error, loading, runRequest] = useAxios({
		method: "POST",
		url: "/users/login",
		headers: { accept: "*/*" },
	});

	useEffect(() => {
		if (data == null) return;
		props.onHide();
		auth.login(data);
	}, [data]);

	const handleSubmit = (event) => {
		event.preventDefault();
		runRequest({
			data: {
				nick: "TestModerator",
				password: "string",
			},
		});
	};

	return (
		<Modal
			{...props}
			aria-labelledby="contained-modal-title-vcenter"
			centered
			contentClassName="main-panel custom-modal-content"
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					{/* {loginPanel ? "Zaloguj się" : "Załóż konto"} */}
					Zaloguj sie
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Nick</Form.Label>
						<Form.Control
							onChange={(e) => {
								setNick(e.target.value);
							}}
							type="text"
							placeholder="Enter email"
						/>
						<Form.Text className="text-muted">
							We'll never share your email with anyone else.
						</Form.Text>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Hasło</Form.Label>
						<Form.Control
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							type="password"
							placeholder="Password"
						/>
						<Form.Text className="text-muted">
							We'll never share your email with anyone else.
						</Form.Text>
					</Form.Group>

					{/* {!loginPanel && (
						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Hasło</Form.Label>
							<Form.Control
								onChange={(e) => {
									setPassword(e.target.value);
								}}
								type="password"
								placeholder="Password"
							/>
							<Form.Text className="text-muted">
								We'll never share your email with anyone else.
							</Form.Text>
						</Form.Group>
					)} */}

					<Form.Group className="mb-3" controlId="formBasicCheckbox">
						<Form.Check type="checkbox" label="Zapamiętaj dane logowania" />
					</Form.Group>

					<Button variant="primary" type="submit">
						{/* {loginPanel ? "Zaloguj się" : "Wyślij"} */} zaloguj sie
					</Button>
					{/* <br />
					<p1
						style={{ textAlign: "center;" }}
						onClick={() => setLoginPanel(!loginPanel)}
					>
						{loginPanel ? "Załóż nowe konto" : "Zaloguj się"}
					</p1> */}
					{loading && <div className="loading-block">Logowanie...</div>}
				</Form>
			</Modal.Body>
			{/* 
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
		</Modal>
	);
}
