import { DbDateConvert } from "../../utils/DataUtlis";
import GroupBar from "./components/GroupBar";

export default function GroupPreview({ data }) {
	console.log(data);

	return (
		<div className="content-container">
			<GroupBar
				avatar={{ type: data.type, base64PhotoData: data.base64PhotoData }}
				groupName={data.groupName}
				members={data.users.length}
                idGroup={data.idGroup}
			/>
			<hr className="hr-line" />
			<div className="muted-text">
				Twórca grupy: {data.idUserCreator}, utworzono{" "}
				{DbDateConvert(data.createdAt).date}
			</div>
			<div>Opis: {data.content}</div>
		</div>
	);
}
