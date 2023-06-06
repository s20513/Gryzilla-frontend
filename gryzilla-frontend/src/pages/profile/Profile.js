import { Profiler, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Post from "../posts/Post";
import axios from "axios";
import useFetchPhoto from "../../hooks/useFetchPhoto";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../context/AuthContext";
import ProfilePotst from "./ProfilePosts";
import ProfileArticles from "./ProfileArticles";
import { useParams } from "react-router-dom";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ProfileComments from "./ProfileComments";
import ProfileFollowed from "./ProfileFollowed";
import FollowButton from "./components/FollowButton";
import ProfileAvatar from "./components/ProfileAvatar";
import ProfileDataTable from "./components/ProfileDataTable";
import ProfileLinkButtons from "./components/ProfileLinkButtons";
import OptionDropdown from "../../components/OptionDropdown";
import ProfileEditModal from "../../components/modals/ProfileEditModal";
import Require from "../../context/Require";
import ProfileGroups from "./ProfileGroups";

export default function Profile() {
	const [idPhoto, setIdPhoto] = useState(10);
	//const [idUser, setIdUser] = useState(10);

	const auth = useAuth();
	const params = useParams();
	const idUser = params.idUser;

	const [showEditModal, setShowEditModal] = useState(false);

	const [profile, errorProfile, loadingProfile, runRequest] = useAxios({
		method: "GET",
		url: `/users/${params.idUser}`,
		headers: { accept: "*/*" },
	});

	useEffect(() => {
		runRequest();
	}, [params.idUser]);

	return (
		<>
			{profile && (
				<Container className="main-panel">
					<Container className="d-flex justify-content-between">
						<h2>Profil użytkonika {profile.nick}</h2>
					</Container>

					<Container>
						<Row>
							<Col lg={3} md={12} sm={12}>
								<Row>
									<div className="content-container profile-data-container gap-2">
										<ProfileAvatar idUser={idUser} />
										<Require
											req={{
												idOwner: idUser,
												notOwner: true,
											}}
										>
											<FollowButton idUser={idUser} />
										</Require>
										<OptionDropdown
											handleEdit={() => setShowEditModal(true)}
											// handleDelete={() => setShowDeleteModal(true)}
											// handleReport={() => setShowReportModal(true)}
											owner={profile.idUser}
											upper={true}
										/>
										<ProfileEditModal
											show={showEditModal}
											setShow={setShowEditModal}
										/>
									</div>
								</Row>
							</Col>
							<Col lg={{ span: 8, offset: 1 }} md={12} sm={12}>
								<Row>
									<ProfileDataTable profile={profile} />
								</Row>
								{/* <Row>
								<ProfileLinkButtons />
							</Row> */}
							</Col>
						</Row>
					</Container>
				</Container>
			)}

			<Container className="main-panel">
				<Tabs
					defaultActiveKey="comments"
					id="fill-tab-example"
					transition={true}
					className="tabs-style mb-3"
					justify
				>
					<Tab eventKey="comments" title="Opinnie">
						<ProfileComments idUser={idUser} />
					</Tab>
					<Tab eventKey="posts" title="Posty">
						<ProfilePotst idUser={idUser} />
					</Tab>
					<Tab eventKey="articles" title="Artykuły">
						<ProfileArticles idUser={idUser} />
					</Tab>
					<Tab eventKey="groups" title="Grupy">
						<ProfileGroups idUser={idUser} />
					</Tab>
					<Tab eventKey="fallowed" title="Obserwowani">
						<ProfileFollowed idUser={idUser} />
					</Tab>
				</Tabs>
			</Container>
		</>
	);
}
