import { Modal } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useAuth } from "../../context/AuthContext";

export default function ProfileEditModal({show, setShow}) {

	const auth = useAuth();

    // const [data, error, loading, runRequest] = useAxios({
	// 	method: "DELETE",
	// 	url: url,
	// 	headers: { accept: "*/*" },
	// });

    // useEffect(() => {
	// 	if (!data) return;
	// 	setIsDeleted(true);
	// }, [data]);

    const handleClose = () => {
		setShow(false);
	};

    // const handleSubmit = () => {
    //     runRequest({
	// 		data: {
	// 			...deletedContentId
	// 		},
	// 	});
    // }

	return (
		<Modal contentClassName="main-panel-modal" show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Edytor danych profilu</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				
			</Modal.Body>

			<Modal.Footer className="d-flex justify-content-center">
				<Button variant="secondary" onClick={handleClose}>
					Zamknij
				</Button>

			</Modal.Footer>
		</Modal>
	);
}
