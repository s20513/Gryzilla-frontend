import { Container } from "react-bootstrap";
import { Tab, Tabs } from "react-bootstrap";
import ReportedPosts from "./ReportedPosts";
import ReportedPostComments from "./ReportedPostComments";
import ReportedArticleComments from "./ReportedArticleComments";
import ReportedUsers from "./ReportedUsers";
import ReportedUsersComments from "./ReportedUsersComments";
import RankChanger from "./components/RankChanger";
import { useState } from "react";

export default function AdminPanel() {

	const [chosenUser, setChosenUser] = useState(null);

	return (
		<Container className="main-panel">
			
			<h3>Nadawanie uprawnień</h3>
			<RankChanger chosenUserFromReport={chosenUser} />
			
			<h3>Zgłoszenia</h3>
			<Tabs
				defaultActiveKey="posts"
				id="fill-tab-example"
				transition={true}
				className="tabs-style mb-3"
				justify
			>
				<Tab eventKey="posts" title="Posty">
					<ReportedPosts setChosenUser={setChosenUser}/>
				</Tab>
				<Tab eventKey="postsComments" title="Komentarze postów">
					<ReportedPostComments setChosenUser={setChosenUser}/>
				</Tab>
				<Tab eventKey="articleComments" title="Komentarze artykułów">
					<ReportedArticleComments setChosenUser={setChosenUser}/>
				</Tab>
				<Tab eventKey="users" title="Użytkownicy">
					<ReportedUsers setChosenUser={setChosenUser}/>
				</Tab>
				<Tab eventKey="usersComments" title="Komentarze profili">
					<ReportedUsersComments setChosenUser={setChosenUser}/>
				</Tab>
			</Tabs>
		</Container>
	);
}
