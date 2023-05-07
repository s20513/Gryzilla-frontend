import AvatarMini from "./AvatarMini";
import LikeButton from "./LikeButton";
import { Link } from "react-router-dom";

export default function DataBar({ idUser, nick, date, avatar }) {
	return (
		<div className="data-bar">
			{/* { likes != null && <LikeButton likesNum={likes} id={idPost} url={"likesPost"} />} */}

			<div>
				<AvatarMini avatar={avatar}/>
			</div>

			<div className="d-flex flex-column">
				<span className="user-nick"><Link to={"/profile/" + idUser }>{nick}</Link></span>
				<span className="label">Użytkownik</span>
			</div>

			<div className="d-flex flex-column">
				<span style={{textAlign:"center"}}>{date.time}</span>
				<span className="label">{date.date}</span>
			</div>
		</div>
	);
}
