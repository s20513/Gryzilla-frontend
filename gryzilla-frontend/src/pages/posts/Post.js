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
import WidgetButtons from "./WidgetButtons";
import useAxios from "../../hooks/useAxios";

export default function Post(props) {
	const postData = props.postData;

	const detailsLink =
		props.detailsLink || props.detailsLink == false ? false : true;

	const [displayComments, setDisplayComments] = useState(() =>
		props.displayComments ? true : false
	);

	const [displayPostEditor, setDisplayPostEditor] = useState(false);

	const [deletedPost, setDeletedPost] = useState(false);

	const [data, error, loading, runRequest] = useAxios({
		method: "DELETE",
		headers: { accept: "*/*" },
		url: `/posts/${postData.idPost}`,
		executeOnRender: false,
	});

	useEffect(()=>{
		if(data == null) return;
		setDeletedPost(true);
	},[data])

	const changeDisplayComments = () => {
		// if(postData.comments > 0)
		setDisplayComments(!displayComments);
	};

	const changeDisplayEditor = () => {
		setDisplayPostEditor(!displayPostEditor);
	};

	const deleteContent = () => {
		if(!window.confirm("Czy na pewno chcesz usunąć posta?")) return
		runRequest();
	}

	const setNewPostData = (editedPost) => {
		console.log(editedPost)
		postData.tags = editedPost[0].tags;
		postData.content = editedPost[0].content;
		changeDisplayEditor();
	};

	if(deletedPost)
		return <div className="content-container" style={{color:"red"}}>Post został usunięty</div>

	return (
		<div className="content-wrapper">
			{!displayPostEditor ? (
				<div className="content-container">
					<DataBar
						idUser={postData.idUser}
						idPost={postData.idPost}
						likes={postData.likes}
						nick={postData.nick}
						date={DbDateConvert(postData.createdAt)}
					/>
					<hr className="hr-line" />
					{!deletedPost && <span dangerouslySetInnerHTML={{ __html: postData.content }}></span>}
					{deletedPost && <span>Post został usunięty</span>}
					<div className="lower-tag-container">
						{postData.tags.map((tag, index) => (
							<span key={index}>#{tag} </span>
						))}
					</div>
					<WidgetButtons
						handleComments={changeDisplayComments}
						handleEdit={changeDisplayEditor}
						handleDelete={deleteContent}
						commentsNumber={postData.commentsNumber}
						idPost={postData.idPost}
						showDetailsButton={detailsLink}
					/>
				</div>
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

			{displayComments && <PostComments idPost={postData.idPost} />}
		</div>
	);
}
