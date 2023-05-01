import { Container } from "react-bootstrap";
import { Tab, Tabs } from "react-bootstrap";
import ReportedPosts from "./ReportedPosts";
import ReportedPostComments from "./ReportedPostComments";
import ReportedArticleComments from "./ReportedArticleComments";
import ReportedUsers from "./ReportedUsers";

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
				<Tab eventKey="Użytkownicy" title="Użytkownicy">
					<ReportedUsers />
				</Tab>
			</Tabs>
		</Container>
	);
}
