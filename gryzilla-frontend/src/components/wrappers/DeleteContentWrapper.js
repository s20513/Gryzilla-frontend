export default function DeleteContentWrapper({ isDeleted, placeholder, children }) {
	return (
		<>
			{!isDeleted && 
                <>{children}</>
            }
			{isDeleted && (
				<div className="content-container" style={{ color: "red" }}>
					{placeholder}
				</div>
			)}
		</>
	);
}
