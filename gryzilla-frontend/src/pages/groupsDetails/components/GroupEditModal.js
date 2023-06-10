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

export default function GroupEditModal({ show, setShow, groupData }) {
	const auth = useAuth();

    const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	const [isValidName, setIsValidName] = useState(false);
	const [isValidDesc, setIsValidDesc] = useState(false);

    const isValidArr = [isValidName, isValidDesc];

	const [data, error, loading, runRequest, isSuccess] = useAxios({
		method: "PUT",
		url: `/groups/${groupData.idGroup}`,
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
				idGroup: groupData.idGroup,
				groupName: name,
                content: description
			},
		});
	};

	return (
		<Modal contentClassName="main-panel-modal" show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Zmiana danych grupy</Modal.Title>
			</Modal.Header>

			<Modal.Body>
            <FormInput
					label={"Nazwa grupy"}
					control={
						<Form.Control
							onChange={(e) => {
								setName(e.target.value);
							}}
							type="text"
							placeholder="Nazwa grupy"
						/>
					}
					setIsValid={setIsValidName}
					validation={{
						validate: name,
						required: {value: true},
						minLength: {value: 5},
						maxLength: {value: 60},
					}}
				/>

				<FormInput
					label={"Opis grupy"}
					control={
						<Form.Control
							as="textarea"
							rows={3}
							placeholder="Opis grupy"
							onChange={(event) => setDescription(event.target.value)}
						/>
					}
					setIsValid={setIsValidDesc}
					validation={{
						validate: description,
						required: {value: true, message: "Opis grupy jest wymagany"},
						minLength: {value: 10, message: "Opis musi się składac z co najmniej 10 znaków"},
						maxLength: {value: 200},
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
