import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import axios from "axios";

import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../context/AuthContext";
import LoadingBanner from "../LoadingBanner";
import ErrorBanner from "../ErrorBanner";
import SuccessBaner from "../SuccessBanner";

export default function MyVerticallyCenteredModal(props) {
	const auth = useAuth();
	const [modalType, setModalType] = useState("login");

	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [passwordReapet, setPasswordReapet] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");

	const [loginError, setLoginError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [passwordReapetError, setPasswordReaperError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [phoneNumberError, setPhoneNumberError] = useState("");

	const [successRegister, setSuccessRegister] = useState(false);

	const [dataLogin, errorLogin, loadingLogin, runRequestLogin] = useAxios({
		method: "POST",
		url: "/users/login",
		headers: { accept: "*/*" },
	});

	const [dataRegister, errorRegister, loadingRegister, runRequestRegister] =
		useAxios({
			method: "POST",
			url: "/users/register",
			headers: { accept: "*/*" },
		});

	//po zalogowaniu
	useEffect(() => {
		if (dataLogin == null) return;
		setSuccessRegister(false);
		props.onHide();
		auth.login(dataLogin);
	}, [dataLogin]);

	//po rejestracji
	useEffect(() => {
		if (dataRegister == null) return;
		console.log("zarejestrowano");
		setSuccessRegister(true);
		setModalType("login");
	}, [dataRegister]);

	const handleSubmit = (event) => {
		event.preventDefault();

		if (modalType == "login") {
			runRequestLogin({
				data: {
					nick: login,
					password: password,
				},
			});
		}

		if (modalType == "register") {
			if (!validateForm()) return;
			runRequestRegister({
				data: {
					nick: login,
					password: password,
					email: email,
					phoneNumber: phoneNumber,
				},
			});
		}
	};

	const changeModalType = () => {
		setModalType((prev) => {
			if (prev == "login") return "register";
			else return "login";
		});
	};

	const handleClose = () => {
		setSuccessRegister(false);
		props.onHide();
	};

	useEffect(() => {
		validateForm();
	}, [login, password, passwordReapet, email, phoneNumber]);

	const validateForm = () => {
		var isGood = true;
		const empty = "Pole nie może być puste";
		if (login.length == 0) {
			setLoginError(empty);
			isGood = false;
		} else if (login.length < 5) {
			setLoginError("Login musi mieć więcej niż 5 znaków");
			isGood = false;
		} else {
			setLoginError("");
		}

		if (password.length == 0) {
			setPasswordError(empty);
			isGood = false;
		} else if (password.length < 5) {
			setPasswordError("Hasło musi miec więcej niż 5 znaków");
		} else {
			setPasswordError("");
		}

		if (passwordReapet.length == 0) {
			setPasswordReaperError(empty);
			isGood = false;
		} else if (passwordReapet != password) {
			setPasswordReaperError("Wprowadzone hasła są różne");
			isGood = false;
		} else {
			setPasswordReaperError("");
		}

		if (email.length == 0) {
			setEmailError(empty);
			isGood = false;
		} else if (!email.includes("@")) {
			setEmailError("Błędny format adresu email");
		} else {
			setEmailError("");
		}

		const reg = /^([0-9]{9})$/;
		if (phoneNumber.length == 0) {
			setPhoneNumberError(empty);
			isGood = false;
		} else if (!reg.test(phoneNumber)) {
			setPhoneNumberError("Błędnu numer telefonu");
			isGood = false;
		} else {
			setPhoneNumberError("");
		}

		return isGood;
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
					{modalType == "login" ? "Zaloguj się" : "Załóż konto"}
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Form>
					<Form.Group className="mb-3">
						<Form.Label>Login</Form.Label>
						<Form.Control
							onChange={(e) => {
								setLogin(e.target.value);
							}}
							type="text"
							placeholder="Enter email"
						/>
						<Form.Text className="text-muted">{loginError}</Form.Text>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Hasło</Form.Label>
						<Form.Control
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							type="password"
							placeholder="Password"
						/>
						<Form.Text className="text-muted">{passwordError}</Form.Text>
					</Form.Group>

					{modalType == "register" && (
						<>
							<Form.Group className="mb-3">
								<Form.Label>Powtórz hasło</Form.Label>
								<Form.Control
									onChange={(e) => {
										setPasswordReapet(e.target.value);
									}}
									type="password"
									placeholder="Password"
								/>
								<Form.Text className="text-muted">
									{passwordReapetError}
								</Form.Text>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Email</Form.Label>
								<Form.Control
									onChange={(e) => {
										setEmail(e.target.value);
									}}
									type="text"
									placeholder="Password"
								/>
								<Form.Text className="text-muted">{emailError}</Form.Text>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Telefon</Form.Label>
								<Form.Control
									onChange={(e) => {
										setPhoneNumber(e.target.value);
									}}
									type="text"
									placeholder="Password"
								/>
								<Form.Text className="text-muted">{phoneNumberError}</Form.Text>
							</Form.Group>
						</>
					)}

					{/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
						<Form.Check type="checkbox" label="Zapamiętaj dane logowania" />
					</Form.Group> */}

					<Form.Group
						onClick={() => changeModalType()}
						className="text-center cursor-pointer"
					>
						<Form.Text>
							{modalType == "login"
								? "Kliknij tutaj aby utworzyć konto"
								: "Kliknij tutaj aby się zalogować"}
						</Form.Text>
					</Form.Group>

					<LoadingBanner placeHolder={"logowanie"} loading={loadingLogin} />
					{errorLogin && <ErrorBanner placeholder={"Zły login lub hasło"} />}
					{successRegister && (
						<SuccessBaner placeholder={"Konto pomyślnie założone"} />
					)}
				</Form>
			</Modal.Body>
			<Modal.Footer className="d-flex justify-content-center">
				<Button variant="secondary" onClick={() => handleClose()}>
					Zamknij
				</Button>
				<Button variant="primary" onClick={handleSubmit}>
					{modalType == "login" ? "Zaloguj się" : "Zarejestruj się"}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
