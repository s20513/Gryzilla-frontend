import defaultAvatar from "../../../assets/avatar-default.png";
import useAxios from "../../../hooks/useAxios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, ChangeEvent, useEffect } from "react";
import axios from "axios";
import useAxiosFile from "../../../hooks/useAxiosFile";
import { Form } from "react-bootstrap";
import PhotoModal from "../../../components/modals/PhotoModal";
import { useAuth } from "../../../context/AuthContext";

export default function GroupAvatar({ idGroup, owner }) {

	const auth = useAuth();
	
	const [show, setShow] = useState(false);

	const handleShow = () => {
		if(!auth.isLogged) return;

		if(auth.id != owner && auth.role != 'Admin') {
			return;
		}
		
		if(auth.rank == 'Blocked') return;

		setShow(true);

	}
	
	const [photo, errorPhoto, loadingPhoto, runRequest] = useAxios({
		method: "GET",
		url: `/groups/photo/${idGroup}`,
		headers: { accept: "*/*" },
	});

	const afterSubmit = () => runRequest();

	function getBase64Img() {
		return `data:image/${photo.type};base64,${photo.base64PhotoData}`;
	}

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
			<PhotoModal show={show} setShow={setShow} urlPOST={`/groups/photo/${idGroup}`} afterSubmit={afterSubmit}/>
		</>
	);
}
