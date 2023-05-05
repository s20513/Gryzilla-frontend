import AvatarMini from "./AvatarMini";
import LikeButton from "./LikeButton";

export default function DataBar({ nick, date, avatar }) {
	return (
		<div className="data-bar">
			{/* { likes != null && <LikeButton likesNum={likes} id={idPost} url={"likesPost"} />} */}

			<div>
				<AvatarMini avatar={avatar}/>
			</div>

			<div className="d-flex flex-column">
				<span className="user-nick">{nick}</span>
				<span className="label">Użytkownik</span>
			</div>

			<div className="d-flex flex-column">
				<span style={{textAlign:"center"}}>{date.time}</span>
				<span className="label">{date.date}</span>
			</div>
		</div>
	);
}
