import defaultAvatar from "../../../assets/avatar-default.png";
import useAxios from "../../../hooks/useAxios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, ChangeEvent } from "react";
import axios from "axios";
import useAxiosFile from "../../../hooks/useAxiosFile";

export default function ProfileAvatar({ idUser }) {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	const [photo, errorPhoto, loadingPhoto] = useAxios({
		method: "GET",
		url: `/users/photo/${idUser}`,
		headers: { accept: "*/*" },
	});

	const [upload, erro, loading, runRequest] = useAxiosFile();

	function getBase64Img() {
		return `data:image/${photo.type};base64,${photo.base64PhotoData}`;
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		const formData = new FormData();
		formData.append("file", selectedFile);
		runRequest(`/users/photo/${idUser}`, formData);
	};

	return (
		<div onClick={() => handleShow()}>
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

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div>
						<input type="file" name="file" onChange={changeHandler} />
						{isFilePicked ? (
							<div>
								<p>Filename: {selectedFile.name}</p>
								<p>Filetype: {selectedFile.type}</p>
								<p>Size in bytes: {selectedFile.size}</p>
								<p>
									lastModifiedDate:{" "}
									{selectedFile.lastModifiedDate.toLocaleDateString()}
								</p>
							</div>
						) : (
							<p>Select a file to show details</p>
						)}
						<div>
							<button onClick={handleSubmit}>Submit</button>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleSubmit}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
