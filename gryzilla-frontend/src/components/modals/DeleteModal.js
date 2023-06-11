import { Modal } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useAuth } from "../../context/AuthContext";

export default function DeleteModal({show, setShow, isDeleted, setIsDeleted, url, deletedContentId, title, info}) {

	const auth = useAuth();

    const [data, error, loading, runRequest] = useAxios({
		method: "DELETE",
		url: url,
		headers: { accept: "*/*" },
	});

    useEffect(() => {
		if (!data) return;
		setIsDeleted(true);
	}, [data]);

    const handleClose = () => {
		setShow(false);
	};

    const handleSubmit = () => {
        runRequest({
			data: {
				...deletedContentId
			},
		});
    }

	return (
		<Modal contentClassName="main-panel-modal" show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>{title ? title : "Usuwanie treści"}</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<div className="d-flex flex-center flex-column">
					{!isDeleted && <span>{info ? info : "Czy na pewno chcesz usunąć wybraną treść?"}</span>}
					{isDeleted && <span>Pomyślnie usunięto</span>}
				</div>
			</Modal.Body>

			<Modal.Footer className="d-flex justify-content-center">
				<Button variant="secondary" onClick={handleClose}>
					Zamknij
				</Button>
				{!isDeleted && (
					<Button variant="primary" onClick={handleSubmit}>
						Usuń
					</Button>
				)}
			</Modal.Footer>
		</Modal>
	);
}
