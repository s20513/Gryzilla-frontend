import { Dropdown } from "react-bootstrap";

export default function OptionDropdown({
	handleEdit,
	handleDelete,
	handleReport,
    handleNewView,
    upper,
}) {


	return (
		<Dropdown align="start">
			<Dropdown.Toggle className="widget-button-comment" style={{top: upper ? "0" : "-15"}} id="dropdown-basic">
				Opcje
			</Dropdown.Toggle>

			<Dropdown.Menu className="dropdown-menu-right dropdown-menu-dark">
                {handleNewView && <Dropdown.Item onClick={handleNewView}>Widok w nowym oknie</Dropdown.Item>}
				<Dropdown.Item onClick={handleEdit}>Edytuj</Dropdown.Item>
				<Dropdown.Item onClick={handleDelete}>Usuń</Dropdown.Item>
				<Dropdown.Item onClick={handleReport}>Zgłoś</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
}
