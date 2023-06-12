import DataBar from "../../../components/DataBarPost";
import { DbDateConvert } from "../../../utils/DataUtlis";
import Comment from "../../../components/Comment";
import DeleteContentWrapper from "../../../components/wrappers/DeleteContentWrapper";
import { useState } from "react";
import ReportModal from "../../../components/modals/ReportModal";
import DeleteModal from "../../../components/modals/DeleteModal";
import OptionDropdown from "../../../components/OptionDropdown";
import EditContentInputWrapper from "../../../components/wrappers/EditContentInputWrapper";
import SuperOptionDropdown from "../../../components/SuperOptionDropdown";

export default function GroupComment({
	idMessage,
	idUserMessage,
	idUserCreatorGroup,
	nick,
	createdAt,
	content,
	avatar,
}) {
	const [displayEditor, setDisplayEditor] = useState(false);
	const [isDeleted, setIsDeleted] = useState(false);

	const [showReportModal, setShowReportModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const [contentN, setContentN] = useState(content);

	const changeDisplayEditor = () => {
		setDisplayEditor((prev) => !prev);
	};

	const setNewMessageData = (data) => {
		setContentN(data.content);
		setDisplayEditor(false);
	};

	return (
		<DeleteContentWrapper
			isDeleted={isDeleted}
			placeholder={"Wiadomość grupy została usunięta"}
		>
			<EditContentInputWrapper
				displayEditor={displayEditor}
				initialContent={{ content: contentN }}
				addNew={setNewMessageData}
				url={`/groupsMessage/${idMessage}`}
				method={"PUT"}
				apiData={{
					idMessage: idMessage,
				}}
				enableTags={false}
				placeHolder={"Wprowadz nową wiadomość..."}
				handleClose={changeDisplayEditor}
			>
				<Comment
					avatar={avatar}
					nick={nick}
					content={contentN}
					createdAt={createdAt}
					idUser={idUserMessage}
				/>
				<SuperOptionDropdown
					upper={false}					
					owner={idUserMessage}
					relatedOwner={idUserCreatorGroup}
					options={[
						{
							title: "Edytuj komentarz",
							onClick: () => changeDisplayEditor(),
							conditions: { ranks: ["Admin"], owner: true },
						},
						{
							title: "Usuń komentarz",
							onClick: () => setShowDeleteModal(true),
							conditions: {
								ranks: ["Admin", "Moderator"],
								owner: true,
								relatedOwner: true,
							},
						},
					]}
				/>

				{/* <OptionDropdown
					handleEdit={changeDisplayEditor}
					handleDelete={() => setShowDeleteModal(true)}
					owner={idUserMessage}
				/> */}
			</EditContentInputWrapper>

			{/* <ReportModal
				show={showReportModal}
				setShow={setShowReportModal}
				url={`/reportCommentPost`}
				reportedContentId={{ idMessage: idMessage }}
			/> */}

			<DeleteModal
				show={showDeleteModal}
				setShow={setShowDeleteModal}
				isDeleted={isDeleted}
				setIsDeleted={setIsDeleted}
				url={`/groupsMessage/${idMessage}`}
				deletedContentId={{ idMessage: idMessage }}
			/>
		</DeleteContentWrapper>
	);
}
