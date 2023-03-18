import { Profiler, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Post from "../posts/Post";
import axios from "axios";
import useFetchPhoto from "../../hooks/useFetchPhoto";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
	const [idPhoto, setIdPhoto] = useState(10);
	const [idUser, setIdUser] = useState(10);

	const auth = useAuth();

	const [photo, errorPhoto, loadingPhoto] = useAxios({
		method: "GET",
		url: `/users/photo/${auth.id}`,
		headers: { accept: "*/*" },
	});

	const [profile, errorProfile, loadingProfile] = useAxios({
		method: "GET",
		url: `users/${auth.id}`,
		headers: { accept: "*/*" },
	});

	const [posts, errorPosts, loadingPosts] = useAxios({
		method: "GET",
		url: `posts/qty/5`,
		headers: { accept: "*/*" },
	});

	// useEffect( () => {
	//     console.log(posts)
	// },[posts])

	function getBase64Img() {
		return `data:image/${photo.type};base64,${photo.base64PhotoData}`;
	}

	return (
		<>
			<Container className="main-panel">
				<Container className="d-flex justify-content-between">
					<h2>Mój profil</h2>
				</Container>

				<Container>
					<Row>
						<Col>
							<div className="content-container profile-data-container">
								{photo && (
									<img
										className="profile-img"
										src={getBase64Img()}
										//src="https://picsum.photos/250"
										alt="profile picture"
									/>
								)}
							</div>
						</Col>
						<Col xs={7}>
							<Container className="content-container content-wrapper">
								<Row>
									<Col>
										<span>Nick:</span>
									</Col>
									<Col>{profile && <span>{profile.nick}</span>}</Col>
								</Row>
								<Row>
									<Col>
										<hr className="hr-line" />
									</Col>
								</Row>
								<Row>
									<Col>
										<span>Email:</span>
									</Col>
									<Col>{profile && <span>{profile.email}</span>}</Col>
								</Row>
								<Row>
									<Col>
										<hr className="hr-line" />
									</Col>
								</Row>
								<Row>
									<Col>
										<span>Phone:</span>
									</Col>
									<Col>{profile && <span>{profile.phoneNumber}</span>}</Col>
								</Row>
								<Row>
									<Col>
										<hr className="hr-line" />
									</Col>
								</Row>
								<Row>
									<Col>
										<span>User since:</span>
									</Col>
									<Col>{profile && <span>{profile.createdAt}</span>}</Col>
								</Row>
							</Container>
						</Col>
						<Col xs={2}>
							<div className="content-container">
								{profile && (
									<div className="flex-items">
										<Button variant="primary">Steam</Button>
										<Button variant="primary">Epic</Button>
										<Button variant="primary">Discord</Button>
										<Button variant="primary">PlayStation</Button>
									</div>
								)}
							</div>
						</Col>
					</Row>
				</Container>
			</Container>

			<Container className="main-panel">
				<h2>Moje posty</h2>
				{posts &&
					posts.posts.map((post, index) => {
						return <Post key={post.idPost} postData={post}></Post>;
					})}
			</Container>
		</>
	);
}
