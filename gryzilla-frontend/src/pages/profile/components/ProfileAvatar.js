import defaultAvatar from "../../../assets/avatar-default.png";
import useAxios from "../../../hooks/useAxios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, ChangeEvent, useEffect } from "react";
import axios from "axios";
import useAxiosFile from "../../../hooks/useAxiosFile";
import { Form } from "react-bootstrap";

export default function ProfileAvatar({ idUser }) {
	const [show, setShow] = useState(false);

	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

	const [photo, errorPhoto, loadingPhoto] = useAxios({
		method: "GET",
		url: `/users/photo/${idUser}`,
		headers: { accept: "*/*" },
	});

	const [upload, erro, loading, runRequest] = useAxiosFile();

	const handleClose = () => {
		setShow(false);
		setIsFilePicked(false);
		//setSelectedFile(null);
	};
	const handleShow = () => setShow(true);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	function getBase64Img() {
		return `data:image/${photo.type};base64,${photo.base64PhotoData}`;
	}

	const handleSubmit = (event) => {
		if (!selectedFile) handleClose();
		event.preventDefault();
		const formData = new FormData();
		formData.append("file", selectedFile);
		runRequest(`/users/photo/${idUser}`, formData);
	};

	useEffect(() => {
		if (upload == null) return;
		handleClose();
	}, [upload]);

	return (
		<>
			<div onClick={handleShow}>
				{photo ? (
					<img
						className="profile-img"
						src={getBase64Img()}
						//src="https://picsum.photos/250"
						alt="profile picture"
					/>
				) : (
					<img
						className="profile-img"
						src={defaultAvatar}
						alt="profile picture"
					/>
				)}
			</div>
			<Modal
				contentClassName="main-panel-modal"
				show={show}
				onHide={handleClose}
			>
				<Modal.Header closeButton>
					<Modal.Title>Zamiana zdjęcia profilu</Modal.Title>
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
						<label for="file" className="button-web-link btn btn-primary">
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
								Wybierz plik aby wyświetlić szczegóły
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
		</>
	);
}
