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
import FormInput from "../Form/FormInput";
import LoginFormInput from "../Form/LoginFormInput";

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

	const isValidLoginArr = [loginError, passwordError];
	const isValidRegisterArr = [
		loginError,
		passwordError,
		passwordReapetError,
		emailError,
		phoneNumberError,
	];

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
			if (isValidLoginArr.some((v) => v !== true)) return;

			runRequestLogin({
				data: {
					nick: login,
					password: password,
				},
			});
		}

		if (modalType == "register") {
			if (isValidRegisterArr.some((v) => v !== true)) return;

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

	// const validateForm = () => {
	// 	var isGood = true;
	// 	const empty = "Pole nie może być puste";
	// 	if (login.length == 0) {
	// 		setLoginError(empty);
	// 		isGood = false;
	// 	} else if (login.length < 5) {
	// 		setLoginError("Login musi mieć więcej niż 5 znaków");
	// 		isGood = false;
	// 	} else {
	// 		setLoginError("");
	// 	}

	// 	if (password.length == 0) {
	// 		setPasswordError(empty);
	// 		isGood = false;
	// 	} else if (password.length < 5) {
	// 		setPasswordError("Hasło musi miec więcej niż 5 znaków");
	// 	} else {
	// 		setPasswordError("");
	// 	}

	// 	if (passwordReapet.length == 0) {
	// 		setPasswordReaperError(empty);
	// 		isGood = false;
	// 	} else if (passwordReapet != password) {
	// 		setPasswordReaperError("Wprowadzone hasła są różne");
	// 		isGood = false;
	// 	} else {
	// 		setPasswordReaperError("");
	// 	}

	// 	if (email.length == 0) {
	// 		setEmailError(empty);
	// 		isGood = false;
	// 	} else if (!email.includes("@")) {
	// 		setEmailError("Błędny format adresu email");
	// 	} else {
	// 		setEmailError("");
	// 	}

	// 	const reg = /^([0-9]{9})$/;
	// 	if (phoneNumber.length == 0) {
	// 		setPhoneNumberError(empty);
	// 		isGood = false;
	// 	} else if (!reg.test(phoneNumber)) {
	// 		setPhoneNumberError("Błędnu numer telefonu");
	// 		isGood = false;
	// 	} else {
	// 		setPhoneNumberError("");
	// 	}

	// 	return isGood;
	// };

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
					<LoginFormInput
						value={login}
						isRegister={modalType == "login" ? false : true}
						label={"Login"}
						control={
							<Form.Control
								onChange={(e) => {
									setLogin(e.target.value);
								}}
								type="text"
								placeholder="Login"
							/>
						}
						setIsValid={setLoginError}
						validation={{
							validate: login,
							required: { value: true },
							minLength: { value: 5 },
							maxLength: { value: 60 },
						}}
					/>
					{/* <FormInput
						label={"Login"}
						control={
							<Form.Control
								onChange={(e) => {
									setLogin(e.target.value);
								}}
								type="text"
								placeholder="Login"
							/>
						}
						setIsValid={setLoginError}
						validation={{
							validate: login,
							required: { value: true },
							minLength: { value: 5 },
							maxLength: { value: 60 },
						}}
					/> */}
					<FormInput
						label={"Hasło"}
						control={
							<Form.Control
								onChange={(e) => {
									setPassword(e.target.value);
								}}
								type="password"
								placeholder="Hasło"
							/>
						}
						setIsValid={setPasswordError}
						validation={{
							validate: password,
							required: { value: true },
							minLength: { value: 5 },
							maxLength: { value: 255 },
						}}
					/>
					{modalType == "register" && (
						<>
							<FormInput
								label={"Powtórz hasło"}
								control={
									<Form.Control
										onChange={(e) => {
											setPasswordReapet(e.target.value);
										}}
										type="password"
										placeholder="Powtórz hasło"
									/>
								}
								setIsValid={setPasswordReaperError}
								validation={{
									validate: passwordReapet,
									required: { value: true },
									minLength: { value: 5 },
									maxLength: { value: 255 },
									equalTo: {
										value: password,
										message: "Podane hasła różnią się od siebie",
									},
								}}
							/>

							<FormInput
								label={"Adres email"}
								control={
									<Form.Control
										onChange={(e) => {
											setEmail(e.target.value);
										}}
										type="text"
										placeholder="email"
									/>
								}
								setIsValid={setEmailError}
								validation={{
									validate: email,
									required: { value: true },
									minLength: { value: 1 },
									maxLength: { value: 255 },
								}}
							/>

							<FormInput
								label={"Numer telefonu"}
								control={
									<Form.Control
										onChange={(e) => {
											setPhoneNumber(e.target.value);
										}}
										type="text"
										placeholder="telefon"
									/>
								}
								setIsValid={setPhoneNumberError}
								validation={{
									validate: phoneNumber,
									required: { value: true },
									minLength: { value: 9 },
									maxLength: { value: 9 },
								}}
							/>
						</>
					)}

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
