import { Dropdown } from "react-bootstrap";
import Require from "../context/Require";
import { useAuth } from "../context/AuthContext";

export default function OptionDropdown({
	handleEdit,
	handleDelete,
	handleReport,
	handleNewView,
	upper,
	owner,
}) {

	const auth = useAuth();

	if(!handleNewView && !auth.isLogged ){
		return <></>
	}
	
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
						Widok szczegółowy
					</Dropdown.Item>
				)}

				<Require
					req={{
						idOwner: owner,
						authOwner: true,
						authRole: ["Admin"],
					}}
				>
					{handleEdit && (
						<Dropdown.Item onClick={handleEdit}>Edytuj</Dropdown.Item>
					)}
				</Require>

				<Require
					req={{
						idOwner: owner,
						authOwner: true,
						authRole: ["Admin", "Moderator"],
					}}
				>
					{handleDelete && (
						<Dropdown.Item onClick={handleDelete}>Usuń</Dropdown.Item>
					)}
				</Require>

				<Require
					req={{
						idOwner: owner,
						notOwner: true,
					}}
				>
					{handleReport && (
						<Dropdown.Item onClick={handleReport}>Zgłoś</Dropdown.Item>
					)}
				</Require>
			</Dropdown.Menu>
		</Dropdown>
	);
}
