import defaultAvatar from "../../../assets/avatar-default.png";
import useAxios from "../../../hooks/useAxios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, ChangeEvent, useEffect } from "react";
import axios from "axios";
import useAxiosFile from "../../../hooks/useAxiosFile";
import { Form } from "react-bootstrap";
import PhotoModal from "../../../components/modals/PhotoModal";
import { useVatarChange } from "../../../context/AvatarChangeContext";

export default function ProfileAvatar({ idUser }) {
	const avatarContext = useVatarChange();

	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);

	const [photo, errorPhoto, loadingPhoto, runRequest] = useAxios({
		method: "GET",
		url: `/users/photo/${idUser}`,
		headers: { accept: "*/*" },
	});

	useEffect(() => {
		avatarContext.setAvatar(photo);
	}, [photo]);

	useEffect(() => {
		runRequest();
	}, [idUser]);

	const afterSubmit = () => runRequest();

	function getBase64Img() {
		return `data:image/${photo.type};base64,${photo.base64PhotoData}`;
	}

	return (
		<>
			<div onClick={handleShow}>
				{photo ? (
					<img
						className="profile-img profile-img-shadow "
						src={getBase64Img()}
						//src="https://picsum.photos/250"
						alt="profile picture"
					/>
				) : (
					<img
						className="profile-img profile-img-shadow"
						src={defaultAvatar}
						alt="profile picture"
					/>
				)}
			</div>
			<PhotoModal
				show={show}
				setShow={setShow}
				urlPOST={`/users/photo/${idUser}`}
				afterSubmit={afterSubmit}
			/>
		</>
	);
}
