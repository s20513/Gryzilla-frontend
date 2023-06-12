import { useState } from "react";
import DataBar from "../../../components/DataBarPost";
import OptionDropdown from "../../../components/OptionDropdown";
import { DbDateConvert } from "../../../utils/DataUtlis";
import DeleteModal from "../../../components/modals/DeleteModal";
import ReportModal from "../../../components/modals/ReportModal";
import DeleteContentWrapper from "../../../components/wrappers/DeleteContentWrapper";
import Comment from "../../../components/Comment";
import EditContentInputWrapper from "../../../components/wrappers/EditContentInputWrapper";
import SuperOptionDropdown from "../../../components/SuperOptionDropdown";

export default function ProfileComment({
	idComment,
	idUserComment,
	idUser,
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
		console.log("change")
		setDisplayEditor((prev) => !prev);
	};

	const setNewMessageData = (data) => {
		setContentN(data.content);
		setDisplayEditor(false);
	};

	return (
		<DeleteContentWrapper
			isDeleted={isDeleted}
			placeholder={"Komentarz użytkownika został usunięty"}
		>
			<EditContentInputWrapper
				displayEditor={displayEditor}
				initialContent={{ content: contentN }}
				addNew={setNewMessageData}
				url={`/profileComments/${idComment}`}
				method={"PUT"}
				apiData={{}}
				enableTags={false}
				placeHolder={"Edytuj komentarz profilu..."}
				handleClose={changeDisplayEditor}
			>
				<Comment
					idUser={idUser}
					avatar={avatar}
					nick={nick}
					content={contentN}
					createdAt={createdAt}
				/>
				<SuperOptionDropdown
					owner={idUser}
					relatedOwner={idUserComment}
					options={[
						{
							title: "Edytuj komentarz profilu",
							onClick: () => changeDisplayEditor(),
							conditions: { ranks: ["Admin"], owner: true },
						},
						{
							title: "Usuń komentarz profilu",
							onClick: () => setShowDeleteModal(true),
							conditions: { ranks: ["Admin", "Moderator"] , owner: true, relatedOwner: true},
						},
						{
							title: "Zgłoś komentarz profilu",
							onClick: () => setShowReportModal(true),
							conditions: { owner: false},
						},
					]}
				/>
			</EditContentInputWrapper>
			<ReportModal
				show={showReportModal}
				setShow={setShowReportModal}
				url={`/reportProfileComment`}
				reportedContentId={{ idProfileComment: idComment }}
			/>
			<DeleteModal
				show={showDeleteModal}
				setShow={setShowDeleteModal}
				isDeleted={isDeleted}
				setIsDeleted={setIsDeleted}
				url={`/profileComments/${idComment}`}
				deletedContentId={{ idProfileComment: idComment }}
			/>
		</DeleteContentWrapper>
	);
}
