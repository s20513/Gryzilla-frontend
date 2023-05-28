import { Dropdown } from "react-bootstrap";
import Require from "../context/Require";

export default function OptionDropdown({
	handleEdit,
	handleDelete,
	handleReport,
	handleNewView,
	upper,
	owner,
}) {
	return (
		<Dropdown align="start">
			<Dropdown.Toggle
				className="widget-button-comment"
				style={{ top: upper ? "0" : "-15" }}
				id="dropdown-basic"
			>
				Opcje
			</Dropdown.Toggle>

			<Dropdown.Menu className="dropdown-menu-right dropdown-menu-dark">
				{handleNewView && (
					<Dropdown.Item onClick={handleNewView}>
						Widok w nowym oknie
					</Dropdown.Item>
				)}

				<Require
					req={{
						idOwner: owner,
						authOwner: true,
						authRole: ["Admin"],
					}}
				>
					<Dropdown.Item onClick={handleEdit}>Edytuj</Dropdown.Item>
				</Require>	

				<Require
					req={{
						idOwner: owner,
						authOwner: true,
						authRole: ["Admin", "Moderator"],
					}}
				>
					<Dropdown.Item onClick={handleDelete}>Usuń</Dropdown.Item>
				</Require>

				<Require
					req={{
						authLogged: true,
					}}
				>
					<Dropdown.Item onClick={handleReport}>Zgłoś</Dropdown.Item>
				</Require>
			</Dropdown.Menu>
		</Dropdown>
	);
}
