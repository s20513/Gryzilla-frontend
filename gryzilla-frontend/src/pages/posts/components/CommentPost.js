import { useState } from "react";
import Comment from "../../../components/Comment";
import { Button } from "react-bootstrap";
import ContentInput from "../../../components/Editor/ContentInput";
import { Dropdown } from "react-bootstrap";
import ReportModal from "../../../components/modals/ReportModal";
import EditContentInputWrapper from "../../../components/wrappers/EditContentInputWrapper";
import OptionDropdown from "../../../components/OptionDropdown";
import DeleteModal from "../../../components/modals/DeleteModal";
import DeleteContentWrapper from "../../../components/wrappers/DeleteContentWrapper";
import Require from "../../../context/Require";
import { useNavigate } from "react-router-dom";

export default function CommentPost({ commentData }) {
	const navigate = useNavigate();
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
				url={`/posts/comment/${commentData.idComment}`}
				method={"PUT"}
				apiData={{
					idPost: commentData.idPost,
					idComment: commentData.idComment,
				}}
				enableTags={false}
				placeHolder={"Wprowadz nowy post..."}
				handleClose={changeDisplayEditor}
			>
				<Comment
					avatar={{
						type: commentData.type,
						base64PhotoData: commentData.base64PhotoData,
					}}
					nick={commentData.nick}
					createdAt={commentData.createdAt}
					content={commentData.content}
					id={commentData.idComment}
				/>
				{/* <Require
					req={{
						authLogged: true,
					}}
				> */}
					<OptionDropdown
						handleEdit={changeDisplayEditor}
						handleDelete={() => setShowDeleteModal(true)}
						handleReport={() => setShowReportModal(true)}
						handleNewView={() => navigate(`/posts/${commentData.idPost}/${commentData.idComment}`)}
						owner={commentData.idUser}
					/>
				{/* </Require> */}
			</EditContentInputWrapper>

			<ReportModal
				show={showReportModal}
				setShow={setShowReportModal}
				url={`/reportCommentPost`}
				reportedContentId={{ idComment: commentData.idComment }}
			/>

			<DeleteModal
				show={showDeleteModal}
				setShow={setShowDeleteModal}
				isDeleted={isDeleted}
				setIsDeleted={setIsDeleted}
				url={`/posts/comment/${commentData.idComment}`}
				reportedContentId={{ idComment: commentData.idComment }}
			/>
		</DeleteContentWrapper>
	);
}
