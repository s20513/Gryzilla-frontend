import { Profiler, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Post from "../posts/Post";
import axios from "axios";
import useFetchPhoto from "../../hooks/useFetchPhoto";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import GroupAvatar from "./components/GroupAvatar";
import JoinButton from "./components/JoinButton";
import GroupDataTable from "./components/GroupDataTable";
import GroupComments from "./GroupComments";
import GroupMembers from "./GroupMembers";
import Require from "../../context/Require";
import OptionDropdown from "../../components/OptionDropdown";
import GroupEditModal from "./components/GroupEditModal";
import DeleteModal from "../../components/modals/DeleteModal";
import SuperOptionDropdown from "../../components/SuperOptionDropdown";
import LoadingBanner from "../../components/LoadingBanner";

export default function GroupDetials() {
	const auth = useAuth();
	const { idGroup } = useParams();

	const [showChangeDetailsModal, setShowChangeDetailsModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [isDeleted, setIsDeleted] = useState(false);

	const [group, error, loading] = useAxios({
		method: "GET",
		url: `/groups/${idGroup}`,
		headers: { accept: "*/*" },
	});

	const [isMember, setIsMember] = useState(false);

	const [dataMember, errorMember, loadingMember, runRequestMember] = useAxios({
		method: "GET",
		headers: { accept: "*/*" },
		executeOnRender: false,
	});

	const navigate = useNavigate();

	useEffect(() => {
		if (!isDeleted) return;
		navigate("/groups");
	}, [isDeleted]);

	useEffect(() => {
		if (!auth.isLogged) return;
		runRequestMember({ url: `/groups/${auth.id}/${idGroup}` });
	}, [auth.isLogged]);

	useEffect(() => {
		if (!dataMember) return;
		setIsMember(dataMember.member);
	}, [dataMember]);

	return (
		<>
			<Container className="main-panel">
				<Container className="d-flex justify-content-between">
					<h2>Grupa</h2>
				</Container>

				{group && (
					<Container>
						<Row>
							<Col lg={3} md={12} sm={12}>
								<Row>
									<div className="content-container profile-data-container">
										<GroupAvatar
											idGroup={idGroup}
											owner={group?.idUserCreator}
										/>
										<Require req={{ authLogged: true }}>
											{group && dataMember && (
												<JoinButton
													idGroup={idGroup}
													idOwner={group.idUserCreator}
													isMember={dataMember?.member}
													setIsMember={setIsMember}
												/>
											)}
										</Require>
										{group && (
											<>
												<SuperOptionDropdown
													upper={true}
													owner={group.idUserCreator}
													options={[
														{
															title: "Edytuj grupę",
															onClick: () => setShowChangeDetailsModal(true),
															conditions: { ranks: ["Admin"], owner: true },
														},
														{
															title: "Usuń grupę",
															onClick: () => setShowDeleteModal(true),
															conditions: {
																ranks: ["Admin", "Moderator"],
																owner: true,
															},
														},
													]}
												/>

												{/* <OptionDropdown
												handleEdit={() => setShowChangeDetailsModal(true)}
												handleDelete={() => setShowDeleteModal(true)}
												owner={group.idUserCreator}
												upper={true}
											/> */}

												<GroupEditModal
													show={showChangeDetailsModal}
													setShow={setShowChangeDetailsModal}
													groupData={group}
												/>
												<DeleteModal
													show={showDeleteModal}
													setShow={setShowDeleteModal}
													isDeleted={isDeleted}
													setIsDeleted={setIsDeleted}
													url={`/groups/${group.idGroup}`}
													deletedContentId={{ idGroup: group.idGroup }}
													title={"Usuwanie grupy"}
													info={"Czy na pewno chcesz usunąć grupę?"}
												/>
											</>
										)}
									</div>
								</Row>
							</Col>
							<Col lg={{ span: 8, offset: 1 }} md={12} sm={12}>
								<Row>
									<GroupDataTable group={group} />
								</Row>
							</Col>
						</Row>
					</Container>
				)}
				<LoadingBanner error={error} loading={loading}>Ładowanie grupy...</LoadingBanner>
			</Container>

			<Container className="main-panel">
				<Tabs
					defaultActiveKey="msg"
					id="fill-tab-example"
					transition={true}
					className="tabs-style mb-3"
					justify
				>
					<Tab eventKey="msg" title="Wiadomości grupy">
						{group && (
							<GroupComments
								idGroup={idGroup}
								idUserCreatorGroup={group.idUserCreator}
								isMember={isMember}
							/>
						)}
						<LoadingBanner error={error} loading={loading}>Ładowanie danych...</LoadingBanner>
					</Tab>
					<Tab eventKey="members" title="Członkowie">
						<GroupMembers groupData={group} isMember={isMember} />
					</Tab>
				</Tabs>
			</Container>
		</>
	);
}
