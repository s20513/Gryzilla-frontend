import DataBar from "../../../components/DataBarPost";
import { DbDateConvert } from "../../../utils/DataUtlis";

export default function ProfileComment({ idComment, nick, createdAt, content }) {
	return (
		<div className="content-container">
			<DataBar
				id={idComment}
				likes={null}
				nick={nick}
				date={DbDateConvert(createdAt)}
			/>
			<hr className="hr-line"/>
			<span dangerouslySetInnerHTML={{ __html: content }}></span>
		</div>
	);
}
