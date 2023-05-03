import AvatarMini from "../../../components/AvatarMini";
import { Link } from "react-router-dom";

export default function GroupBar({ avatar, groupName, members, idGroup }) {
	return (
		<div className="d-flex gap-2">
			<AvatarMini isGroup={true} avatar={avatar} />
			<div>
				<div style={{ fontSize: "2rem" }}><Link to={"" + idGroup}>{groupName}</Link></div>
				<div className="group-members">Członkowie: {members}</div>
			</div>
		</div>
	);
}
