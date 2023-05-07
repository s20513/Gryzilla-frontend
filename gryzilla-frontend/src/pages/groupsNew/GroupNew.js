import { Container } from "react-bootstrap";
import ContentInput from "../../components/Editor/ContentInput";

import GroupsNewForm from "./GroupsNewForm";

export default function GroupNew() {
	return (
		<Container className="main-panel">
			<h3>Tworzenie nowej grupy</h3>

			<div className="content-container px-5">
				<GroupsNewForm />
			</div>
		</Container>
	);
}
