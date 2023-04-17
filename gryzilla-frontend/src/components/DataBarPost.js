import AvatarMini from "./AvatarMini";
import LikeButton from "./LikeButton";

export default function DataBar({ idUser, idPost, likes, nick, date }) {
	return (
		<div className="data-bar">
			{ likes != null && <LikeButton likesNum={likes} id={idPost} url={"likesPost"} />}

			<div>
				<AvatarMini idUser={11}/>
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
