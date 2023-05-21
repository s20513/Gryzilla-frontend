import ContentInput from "../Editor/ContentInput";

export default function EditContentInputWrapper({
	displayEditor,
	initialContent,
	addNew,
	url,
	method,
	apiData,
	enableTags,
	placeHolder,
	handleClose,
	children,
}) {
	return (
		<>
			{!displayEditor ? (
				<>{children}</>
			) : (
				<ContentInput
					initialContent={initialContent}
					addNew={addNew}
					url={url}
					method={method}
					apiData={apiData}
					enableTags={enableTags}
					placeHolder={placeHolder}
					handleClose={handleClose}
				/>
			)}
		</>
	);
}
