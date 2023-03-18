import { Dropdown } from "react-bootstrap";

export default function DropdownList(props) {

    const sortType = props.sortType;
    const setSortType = props.setSortType;

	return (
		<Dropdown align="end">
			<Dropdown.Toggle variant="outline-success" id="dropdown-basic">
				Sortuj
			</Dropdown.Toggle>

			<Dropdown.Menu className="dropdown-menu-right dropdown-menu-dark">
				<Dropdown.Item
					onClick={() => {
						setSortType("byDateDesc");
					}}
					active={sortType === "byDateDesc" ? true : false}
				>
					Najnowsze
				</Dropdown.Item>

				<Dropdown.Item
				    onClick={() => {
						setSortType("byDateAsc");
					}}
					active={sortType === "byDateAsc" ? true : false}
				>
					Najstarsze
				</Dropdown.Item>

				<Dropdown.Item
					onClick={() => {
						setSortType("byLikesDesc");
					}}
					active={sortType === "byLikesDesc" ? true : false}
				>
					Najpopularniejsze
				</Dropdown.Item>

				<Dropdown.Item
					onClick={() => {
						setSortType("byCommentsDesc");
					}}
					active={sortType === "byCommentsDesc" ? true : false}
				>
					Najwięcej komentarzy
				</Dropdown.Item>

			</Dropdown.Menu>
		</Dropdown>
	);
}
