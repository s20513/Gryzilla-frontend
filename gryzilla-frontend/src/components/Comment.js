export default function Comment({nick, description}) {
	return (
		<div className="content-container m-3">
			<span className="user-nick">{nick}</span>
			<br />
			<span dangerouslySetInnerHTML={{ __html: description }} />
		</div>
	);
}
