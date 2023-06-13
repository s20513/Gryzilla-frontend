import { Dropdown } from "react-bootstrap";
import Require from "../context/Require";
import { useAuth } from "../context/AuthContext";
import isAuthorize from "../hooks/isAuthorize";
import { useMemo } from "react";

export default function SuperOptionDropdown({
	owner,
	relatedOwner,
	options,
	upper,
	idUser
}) {
	const auth = useAuth();

	const optionList = useMemo(() => {
		let list = [];
		options.forEach((option) => {
			const good = isAuthorize(
				owner,
				relatedOwner,
				auth.id,
				auth.role,
				auth.isLogged,
				option.conditions
			);
			//console.log("dla " + option.title);
			//console.log(good);
			const form = (
				<Dropdown.Item key={option.title} onClick={option.onClick}>
					{option.title}
				</Dropdown.Item>
			);
			if (good) {
				list.push(form);
			}
		});
		return list;
	}, [auth.isLogged]);

	return (
		<>
			{optionList && optionList.length > 0 && (
				<Dropdown align="start">
					<Dropdown.Toggle
						className="widget-button-comment"
						style={{ top: upper ? "0" : "-15" }}
						id="dropdown-basic"
					>
						Opcje
					</Dropdown.Toggle>

					<Dropdown.Menu className="dropdown-menu-right dropdown-menu-dark">
						{optionList &&
							optionList.map((option) => {
								return option;
							})}
					</Dropdown.Menu>
				</Dropdown>
			)}
		</>
	);
}
