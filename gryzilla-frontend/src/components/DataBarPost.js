import LikeButton from "./LikeButton";

export default function DataBar({ id, likes, nick, date }) {
	return (
		<div className="data-bar">
			<LikeButton likesNum={likes} id={id} url={"likesPost"} />

			<div className="d-flex flex-column">
				<span className="user-nick">{nick}</span>
				<span className="label">Użytkownik</span>
			</div>

			<div className="d-flex flex-column">
				<span>{date}</span>
				<span className="label">Data powstania</span>
			</div>
		</div>
	);
}
