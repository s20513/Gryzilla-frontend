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

export default function ChangeDetailsModal({ show, setShow, userData }) {
	const auth = useAuth();

	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");

	const [emailError, setEmailError] = useState(false);
	const [phoneError, setphoneError] = useState(false);

	const isValidArr = [emailError, phoneError];

	const [data, error, loading, runRequest, isSuccess] = useAxios({
		method: "PUT",
		url: `/users/${userData.idUser}`,
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
				idUser: userData.idUser,
				nick: userData.nick,
				email: email,
				phoneNumber: phone,
			},
		});
	};

	return (
		<Modal contentClassName="main-panel-modal" show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Zmiana danych konta</Modal.Title>
			</Modal.Header>

			<Modal.Body>
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
						email: { value: true },
					}}
				/>

				<FormInput
					label={"Numer telefonu"}
					control={
						<Form.Control
							onChange={(e) => {
								setPhone(e.target.value);
							}}
							type="text"
							placeholder="telefon"
						/>
					}
					setIsValid={setphoneError}
					validation={{
						validate: phone,
						required: { value: true },
						minLength: { value: 1 },
						maxLength: { value: 20 },
						phoneNumber: { value: true },
					}}
				/>

				<LoadingBanner
					placeHolder={"Przetwarzanie rządania"}
					loading={loading}
				/>
				<ErrorBanner2
					placeholder={"Podane dane nie są prawdidłowe"}
					isSuccess={isSuccess}
				/>
				<SuccessBaner2
					placeholder={"Pomyślnie zmieniono dane"}
					isSuccess={isSuccess}
				/>
			</Modal.Body>

			<Modal.Footer className="d-flex justify-content-center">
				<Button variant="secondary" onClick={handleClose}>
					Zamknij
				</Button>
				<Button variant="primary" onClick={handleSubmit}>
					Zmień dane
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
