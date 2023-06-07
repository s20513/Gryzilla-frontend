import { Container } from "react-bootstrap";
import { Tab, Tabs } from "react-bootstrap";
import ReportedPosts from "./ReportedPosts";
import ReportedPostComments from "./ReportedPostComments";
import ReportedArticleComments from "./ReportedArticleComments";
import ReportedUsers from "./ReportedUsers";
import ReportedUsersComments from "./ReportedUsersComments";

export default function AdminPanel() {
	return (
		<Container className="main-panel">
			<h3>Zgłoszenia</h3>

			<Tabs
				defaultActiveKey="posts"
				id="fill-tab-example"
				transition={true}
				className="tabs-style mb-3"
				justify
			>
				<Tab eventKey="posts" title="Posty">
					<ReportedPosts />
				</Tab>
				<Tab eventKey="postsComments" title="Komentarze postów">
					<ReportedPostComments />
				</Tab>
				<Tab eventKey="articleComments" title="Komentarze artykułów">
					<ReportedArticleComments />
				</Tab>
				<Tab eventKey="users" title="Użytkownicy">
					<ReportedUsers />
				</Tab>
				<Tab eventKey="usersComments" title="Komentarze profili">
					<ReportedUsersComments />
				</Tab>
			</Tabs>
		</Container>
	);
}
