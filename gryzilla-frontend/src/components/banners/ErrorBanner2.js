export default function ErrorBanner2({ placeholder, isSuccess }) {
	return (
		<>
			{isSuccess == false && (
				<div className="d-flex justify-content-center" style={{ color: "red" }}>
					{placeholder}
				</div>
			)}
		</>
	);
}
