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

export default function Post({ postData, detailsLink, toggleComments }) {
	//const postData = postData;

	const detailsLink2 = detailsLink || detailsLink == false ? false : true;

	// const [displayComments, setDisplayComments] = useState(() =>
	// 	props.displayComments ? true : false
	// );

	const [displayPostEditor, setDisplayPostEditor] = useState(false);

	const [deletedPost, setDeletedPost] = useState(false);

	const [data, error, loading, runRequest] = useAxios({
		method: "DELETE",
		headers: { accept: "*/*" },
		url: `/posts/${postData.idPost}`,
		executeOnRender: false,
	});

	useEffect(() => {
		if (data == null) return;
		setDeletedPost(true);
	}, [data]);

	const changeDisplayEditor = () => {
		setDisplayPostEditor(!displayPostEditor);
	};

	const deleteContent = () => {
		if (!window.confirm("Czy na pewno chcesz usunąć posta?")) return;
		runRequest();
	};

	const setNewPostData = (editedPost) => {
		console.log(editedPost);
		postData.tags = editedPost.tags;
		postData.content = editedPost.content;
		changeDisplayEditor();
	};

	if (deletedPost)
		return (
			<div className="content-container" style={{ color: "red" }}>
				Post został usunięty
			</div>
		);

	return (
		<>
			{!displayPostEditor ? (
				<>
					<div className="content-container mb-1">
						<div className="d-flex align-items-center gap-2">
							{/* <LikeButton
								likesNum={postData.likes}
								id={postData.idPost}
								url={"likesPost"}
							/> */}
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

						{!deletedPost ? (
							<span
								dangerouslySetInnerHTML={{ __html: postData.content }}
							></span>
						) : (
							<span>Post został usunięty</span>
						)}

						<div className="lower-tag-container">
							{postData.tags.map((tag, index) => (
								<span key={index}>#{tag} </span>
							))}
						</div>
					</div>
					<WidgetButtons
						handleComments={toggleComments}
						handleEdit={changeDisplayEditor}
						handleDelete={deleteContent}
						commentsNumber={postData.commentsNumber}
						idPost={postData.idPost}
						showDetailsButton={detailsLink2}
						likes={postData.likes}
						url={"likesPost"}
					/>
				</>
			) : (
				<ContentInput
					initialContent={postData}
					addNew={setNewPostData}
					url={`/posts/${postData.idPost}`}
					method={"PUT"}
					apiData={{ idPost: postData.idPost }}
					enableTags={true}
					placeHolder={"Wprowadz nowy post..."}
					handleClose={changeDisplayEditor}
				/>
			)}
		</>
	);
}
