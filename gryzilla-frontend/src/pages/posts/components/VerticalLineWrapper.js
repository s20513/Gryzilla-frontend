export default function VerticalLineWrapper(props) {
	return (
		<div className="d-flex">
			<div className="comments-vertical-line ms-2 m-md-3"></div>
			<div style={{ flexGrow: "1" }}>
				{props.children}
			</div>
		</div>
	);
}
