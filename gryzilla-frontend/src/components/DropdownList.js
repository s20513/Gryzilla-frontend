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
					href="#/action-2"
				>
					Najnowsze
				</Dropdown.Item>

				<Dropdown.Item
				    onClick={() => {
						setSortType("byDateAsc");
					}}
					active={sortType === "byDateAsc" ? true : false}
					href="#/action-3"
				>
					Najstarsze
				</Dropdown.Item>

				<Dropdown.Item
					onClick={() => {
						setSortType("byLikesDesc");
					}}
					active={sortType === "byLikesDesc" ? true : false}
					href="#/action-1"
				>
					Najpopularniejsze
				</Dropdown.Item>

				<Dropdown.Item
					onClick={() => {
						setSortType("byCommentsDesc");
					}}
					active={sortType === "byCommentsDesc" ? true : false}
					href="#/action-3"
				>
					Najwięcej komentarzy
				</Dropdown.Item>

			</Dropdown.Menu>
		</Dropdown>
	);
}
