import { Modal } from "react-bootstrap";
import useAxios from "../../../hooks/useAxios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useAuth } from "../../../context/AuthContext";
import FormInput from "../../../components/Form/FormInput";
import { Form } from "react-bootstrap";
import ErrorBanner from "../../../components/ErrorBanner";
import LoadingBanner from "../../../components/LoadingBanner";
import SuccessBaner from "../../../components/SuccessBanner";
import ErrorBanner2 from "../../../components/banners/ErrorBanner2";
import SuccessBaner2 from "../../../components/banners/SuccessBaner2";

export default function ChangePasswordAdminModal({ show, setShow, userData }) {
	const auth = useAuth();

	const [password, setPassword] = useState("");
	const [passwordReapet, setPasswordReapet] = useState("");

	const [passwordError, setPasswordError] = useState(false);
	const [passwordReapetError, setPasswordReaperError] = useState(false);


	const isValidArr = [ passwordError, passwordReapetError];

	const [data, error, loading, runRequest, isSuccess] = useAxios({
		method: "PUT",
		url: `/users/password/admin/${userData.idUser}`,
		headers: { accept: "*/*" },
		executeOnRender: false,
	});

	const handleClose = () => {
		setShow(false);
	};

	const handleSubmit = () => {
		if (isValidArr.some((v) => v !== true)) return;

		runRequest({
			data: {
				newPassword: password,
			},
		});
	};

	return (
		<Modal contentClassName="main-panel-modal" show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Zmiana hasła jako administrator</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<FormInput
					label={"Nowe hasło"}
					control={
						<Form.Control
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							type="password"
							placeholder="Powtórz hasło"
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

				<FormInput
					label={"Powtórz nowe hasło"}
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
				<LoadingBanner
					placeHolder={"Przetwarzanie rządania"}
					loading={loading}
				/>
				<ErrorBanner2
					placeholder={"Stare hasło nie jest poprawne"}
					isSuccess={isSuccess}
				/>
				<SuccessBaner2
					placeholder={"Pomyślnie zmieniono hasło"}
					isSuccess={isSuccess}
				/>
			</Modal.Body>

			<Modal.Footer className="d-flex justify-content-center">
				<Button variant="secondary" onClick={handleClose}>
					Zamknij
				</Button>
				<Button variant="primary" onClick={handleSubmit}>
					Zmień hasło
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
