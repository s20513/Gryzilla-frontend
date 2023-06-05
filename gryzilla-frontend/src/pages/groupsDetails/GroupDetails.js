import { Profiler, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Post from "../posts/Post";
import axios from "axios";
import useFetchPhoto from "../../hooks/useFetchPhoto";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import GroupAvatar from "./components/GroupAvatar";
import JoinButton from "./components/JoinButton";
import GroupDataTable from "./components/GroupDataTable";
import GroupComments from "./GroupComments";
import GroupMembers from "./GroupMembers";
import Require from "../../context/Require";

export default function GroupDetials() {
	const auth = useAuth();
	const { idGroup } = useParams();

	const [group, error, loading] = useAxios({
		method: "GET",
		url: `/groups/${idGroup}`,
		headers: { accept: "*/*" },
	});

	return (
		<>
			<Container className="main-panel">
				<Container className="d-flex justify-content-between">
					<h2>Grupa</h2>
				</Container>

				<Container>
					<Row>
						<Col lg={3} md={12} sm={12}>
							<Row>
								<div className="content-container profile-data-container">
									<GroupAvatar idGroup={idGroup} />
									<Require req={{ authLogged: true }}>
										{group && (
											<JoinButton
												idGroup={idGroup}
												idOwner={group.idUserCreator}
											/>
										)}
									</Require>
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
						<GroupComments idGroup={idGroup} />
					</Tab>
					<Tab eventKey="members" title="Członkowie">
						<GroupMembers groupData={group} />
					</Tab>
				</Tabs>
			</Container>
		</>
	);
}
