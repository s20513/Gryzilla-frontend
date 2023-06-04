export default function SuccessBaner2({ placeholder, isSuccess }) {
	return (
		<>
			{isSuccess == true && (
				<div
					className="d-flex justify-content-center"
					style={{ color: "#50D975" }}
				>
					{placeholder}
				</div>
			)}
		</>
	);
}
