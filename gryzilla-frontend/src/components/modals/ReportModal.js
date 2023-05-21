import { useDebugValue, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import useAxios from "../../hooks/useAxios";
import Form from "react-bootstrap/Form";
import { useAuth } from "../../context/AuthContext";

export default function ReportModal({ show, setShow, url, reportedContentId }) {
	// const [show, setShow] = useState(false);

	const [idReason, setIdReason] = useState();
	const [reportComment, setReportComment] = useState();

	const [errorIdReason, setErrorIdReason] = useState();
	const [errorReportComment, setErrirReportComment] = useState();

	const [isReported, setIsReported] = useState(false);

	const auth = useAuth();

	const [reasonsGet, errorGet, loadingGet, runRequestGet] = useAxios({
		executeOnRender: false,
		method: "GET",
		url: `/reason`,
		headers: { accept: "*/*" },
	});

	const [reasonsPost, errorPost, loadingPost, runRequestPost] = useAxios({
		method: "POST",
		url: url,
		headers: { accept: "*/*" },
	});

	//pobierz liste zgłoszen kiedy modal zostanie wyświetlony i nie ma wczytanej listy
	useEffect(() => {
		if (!show || reasonsGet) return;
		runRequestGet();
	}, [show]);

	const handleClose = () => {

		setIdReason(null);
		setReportComment(null);
		setErrirReportComment(null);
		setErrorIdReason(null);
		
		setShow(false);
		setIsReported(false);
	};

	useEffect(() => {
		if (!reasonsPost) return;
		setIsReported(true);
	}, [reasonsPost]);

	const handleSubmit = () => {
		//console.log(reportComment + " " + idReason);

		if (!idReason) {
			setErrorIdReason("wybierz powod zgloszenia");
			return;
		} else {
			setErrorIdReason("");
		}

		if (!reportComment) {
			setErrirReportComment("Napisz komentarz do zgloszenia");
			return;
		} else {
			setErrirReportComment("");
		}

		runRequestPost({
			data: {
				idUser: auth.id,
				idReason: idReason,
				content: reportComment,
				...reportedContentId,
			},
		});
	};

	return (
		<>
			{/* <div onClick={() => handleShow()}>Zgłoś</div> */}

			<Modal
				contentClassName="main-panel-modal"
				show={show}
				onHide={handleClose}
			>
				<Modal.Header closeButton>
					<Modal.Title>Zgłaszanie treści</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<div className="d-flex flex-center flex-column">
						{!isReported && (
							<div>
								<Form>
									<Form.Group
										className="mb-3"
										controlId="exampleForm.ControlInput1"
									>
										<Form.Label>Powód zgłoszenia</Form.Label>
										<Form.Select
											aria-label="Default select example"
											onChange={(event) => setIdReason(event.target.value)}
										>
											<option value={null}>---</option>
											{reasonsGet &&
												reasonsGet.map((reason) => {
													return (
														<option key={reason.id} value={reason.id}>
															{reason.name}
														</option>
													);
												})}
										</Form.Select>
										<Form.Text className="text-muted">
											{errorIdReason}
										</Form.Text>
									</Form.Group>

									<Form.Group className="mb-3" controlId="">
										<Form.Label>Komentarz do zgłoszenia</Form.Label>
										<Form.Control
											as="textarea"
											rows={3}
											onChange={(event) => setReportComment(event.target.value)}
										/>
										<Form.Text className="text-muted">
											{errorReportComment}
										</Form.Text>
									</Form.Group>
								</Form>
							</div>
						)}
						{isReported && <span>Zgłoszenie zostało dodane</span>}
					</div>
				</Modal.Body>

				<Modal.Footer className="d-flex justify-content-center">
					<Button variant="secondary" onClick={handleClose}>
						Zamknij
					</Button>
					{!isReported && (
						<Button variant="primary" onClick={handleSubmit}>
							Wyślij
						</Button>
					)}
				</Modal.Footer>
			</Modal>
		</>
	);
}
