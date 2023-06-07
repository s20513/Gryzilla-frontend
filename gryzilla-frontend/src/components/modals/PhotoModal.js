import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import useAxiosFile from "../../hooks/useAxiosFile";

export default function PhotoModal({show, setShow, urlPOST, afterSubmit}) {

	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

	const [upload, error, loading, runRequest] = useAxiosFile();

	const handleClose = () => {
		setShow(false);
		setIsFilePicked(false);
		//setSelectedFile(null);
	};

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

    const handleSubmit = (event) => {
		if (!selectedFile) handleClose();
		event.preventDefault();
		const formData = new FormData();
		formData.append("file", selectedFile);
		runRequest(urlPOST, formData);
	};

	useEffect(() => {
		if (upload == null) return;
		handleClose();
        afterSubmit();
	}, [upload]);

	return (
		<Modal contentClassName="main-panel-modal" show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Zmiana zdjęcia</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="d-flex flex-center flex-column">
					<input
						type="file"
						id="file"
						name="file"
						onChange={changeHandler}
						style={{ display: "none" }}
					/>
					<label htmlFor="file" className="button-web-link btn btn-primary">
						{!isFilePicked ? "Wybierz obraz" : "Wybierz inny obraz"}
					</label>

					{isFilePicked ? (
						<div className="d-flex justify-content-between align-items-center mt-3">
							<div className="d-flex flex-column">
								<span>Nazwa: {selectedFile.name}</span>
								<span>Rozmiar: {selectedFile.size}KB</span>
							</div>

							{/* <p>Filetype: {selectedFile.type}</p> */}

							{/* <p>
									lastModifiedDate:{" "}
									{selectedFile.lastModifiedDate.toLocaleDateString()}
								</p> */}
							<img
								className="profile-img"
								src={URL.createObjectURL(selectedFile)}
								alt="profile picture"
							/>
						</div>
					) : (
						<Form.Text className="text-muted">
							Wybierz plik, aby wyświetlić szczegóły
						</Form.Text>
					)}
					{/* <div>
							<button onClick={handleSubmit}>Submit</button>
						</div> */}
				</div>
			</Modal.Body>
			<Modal.Footer className="d-flex justify-content-center">
				<Button variant="secondary" onClick={handleClose}>
					Zamknij
				</Button>
				<Button variant="primary" onClick={handleSubmit}>
					Zapisz zmiany
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
