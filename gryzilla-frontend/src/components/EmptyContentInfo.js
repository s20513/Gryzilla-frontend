export default function EmptyContentInfo({ content }) {
	return (
		<>
			{content?.length == 0 && (
				<div
					className="content-container text-center"
				
				>
					Brak treści
				</div>
			)}
		</>
	);
}
