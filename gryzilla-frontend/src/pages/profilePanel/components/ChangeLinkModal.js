import { InputGroup, Modal } from "react-bootstrap";
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

export default function ChangeLinkModal({
	title,
	linkHead,
	linkTail,
	link,
	show,
	setShow,
	idUser,
}) {
	const auth = useAuth();

	const [myLink, setMyLink] = useState("");

	const [data, error, loading, runRequest, isSuccess] = useAxios({
		method: "PUT",
		url: `/links/${link}`,
		headers: { accept: "*/*" },
		executeOnRender: false,
	});

	const handleClose = () => {
		setShow(false);
	};

	const handleSubmit = () => {
		// if (isValidArr.some((v) => v !== true)) return;

		runRequest({
			data: {
				idUser: idUser,
				link: (linkHead + myLink),
			},
		});
	};

	return (
		<Modal contentClassName="main-panel-modal" show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<InputGroup className="mb-3">
					<InputGroup.Text id="basic-addon3">{linkHead}</InputGroup.Text>
					<Form.Control
						placeholder="link"
						value={myLink ? myLink : ""}
						onChange={(e) => setMyLink(e.target.value)}
					/>
				</InputGroup>

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
