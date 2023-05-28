import { React, useEffect, useState } from "react";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { BiText } from "react-icons/bi";
import { AiFillWarning } from "react-icons/ai";

import PostComments from "./PostComments";
import DataBar from "../../components/DataBarPost";
import ContentInput from "../../components/Editor/ContentInput";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { DbDateConvert } from "../../utils/DataUtlis";
import WidgetButtons from "./components/WidgetButtons";
import useAxios from "../../hooks/useAxios";
import LikeButton from "../../components/LikeButton";
import EditContentInputWrapper from "../../components/wrappers/EditContentInputWrapper";
import ReportModal from "../../components/modals/ReportModal";
import DeleteModal from "../../components/modals/DeleteModal";
import DeleteContentWrapper from "../../components/wrappers/DeleteContentWrapper";

export default function Post({
	postData,
	isDeleted,
	setIsDeleted,
	detailsLink,
	toggleComments,
}) {
	const detailsLink2 = detailsLink || detailsLink == false ? false : true;

	const [displayPostEditor, setDisplayPostEditor] = useState(false);

	const [showReportModal, setShowReportModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const changeDisplayEditor = () => {
		setDisplayPostEditor(!displayPostEditor);
	};

	const setNewPostData = (editedPost) => {
		console.log(editedPost);
		postData.tags = editedPost.tags;
		postData.content = editedPost.content;
		changeDisplayEditor();
	};

	return (
		<>
			<EditContentInputWrapper
				displayEditor={displayPostEditor}
				initialContent={postData}
				addNew={setNewPostData}
				url={`/posts/${postData.idPost}`}
				method={"PUT"}
				apiData={{ idPost: postData.idPost }}
				enableTags={true}
				placeHolder={"Wprowadz nowy post..."}
				handleClose={changeDisplayEditor}
			>
				<div className="content-container mb-1">
					<div className="d-flex align-items-center gap-2">
						<DataBar
							idUser={postData.idUser}
							nick={postData.nick}
							date={DbDateConvert(postData.createdAt)}
							avatar={{
								type: postData.type,
								base64PhotoData: postData.base64PhotoData,
							}}
						/>
					</div>

					<hr className="hr-line" />

					<div className={"html-text"}><span  dangerouslySetInnerHTML={{ __html: postData.content }}></span></div>

					<div className="lower-tag-container">
						{postData.tags.map((tag, index) => (
							<span key={index}>#{tag} </span>
						))}
					</div>
				</div>
				<WidgetButtons
					handleComments={toggleComments}
					handleEdit={changeDisplayEditor}
					handleDelete={() => setShowDeleteModal(true)}
					handleReport={() => setShowReportModal(true)}
					commentsNumber={postData.commentsNumber}
					idPost={postData.idPost}
					showDetailsButton={detailsLink2}
					likes={postData.likes}
					url={"likesPost"}
					owner={postData.idUser}
				/>
			</EditContentInputWrapper>

			<ReportModal
				show={showReportModal}
				setShow={setShowReportModal}
				url={`/reportPost`}
				reportedContentId={{ idPost: postData.idPost }}
			/>

			<DeleteModal
				show={showDeleteModal}
				setShow={setShowDeleteModal}
				isDeleted={isDeleted}
				setIsDeleted={setIsDeleted}
				url={`/posts/${postData.idPost}`}
				reportedContentId={{ idPost: postData.idPost }}
			/>
		</>
	);
}
