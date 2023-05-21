import { useState } from "react";
import Comment from "../../components/Comment";
import { Button } from "react-bootstrap";
import ContentInput from "../../components/Editor/ContentInput";
import { Dropdown } from "react-bootstrap";
import ReportModal from "../../components/modals/ReportModal";
import OptionDropdown from "../../components/OptionDropdown";
import EditContentInputWrapper from "../../components/wrappers/EditContentInputWrapper";
import DeleteContentWrapper from "../../components/wrappers/DeleteContentWrapper";
import DeleteModal from "../../components/modals/DeleteModal";

export default function ArticleComment({ commentData }) {
	const [displayEditor, setDisplayEditor] = useState(false);
	const [isDeleted, setIsDeleted] = useState(false);

	const [showReportModal, setShowReportModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const changeDisplayEditor = () => {
		setDisplayEditor((prev) => !prev);
	};

	const setNewPostData = (data) => {
		commentData.content = data.content;
		setDisplayEditor(false);
	};

	return (
		<DeleteContentWrapper
			isDeleted={isDeleted}
			placeholder={"Komentarz został usunięty"}
		>
			<EditContentInputWrapper
				displayEditor={displayEditor}
				initialContent={commentData}
				addNew={setNewPostData}
				url={`/articles/comments/${commentData.idComment}`}
				method={"PUT"}
				apiData={{
					idArticle: commentData.idArticle,
					idComment: commentData.idComment,
				}}
				enableTags={false}
				placeHolder={"Wprowadź komentarz..."}
				handleClose={changeDisplayEditor}
			>
				<Comment
					avatar={null}
					nick={commentData.nick}
					createdAt={commentData.createdAt}
					content={commentData.content}
				/>
				<OptionDropdown
					handleEdit={changeDisplayEditor}
					handleDelete={() =>setShowDeleteModal(true)}
					handleReport={() => setShowReportModal(true)}
				/>
			</EditContentInputWrapper>

			<ReportModal
				show={showReportModal}
				setShow={setShowReportModal}
				url={`/reportCommentArticle`}
				reportedContentId={{ idComment: commentData.idComment }}
			/>

			<DeleteModal
				show={showDeleteModal}
				setShow={setShowDeleteModal}
				isDeleted={isDeleted}
				setIsDeleted={setIsDeleted}
				url={`/articles/comments/${commentData.idComment}`}
				reportedContentId={{ idComment: commentData.idComment }}
			/>
		</DeleteContentWrapper>
	);
}
