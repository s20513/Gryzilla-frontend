import { useState } from "react";
import PostComments from "./PostComments";
import Post from "./Post";
import Comment from "../../components/Comment";
import VerticalLineWrapper from "./components/VerticalLineWrapper";
import DeleteContentWrapper from "../../components/wrappers/DeleteContentWrapper";

export default function PostAndComments({ postData }) {
	const [displayComments, setDisplayComments] = useState(false);
	const [isDeleted, setIsDeleted] = useState(false);

	const toggleDisplayComments = () => {
		setDisplayComments((prev) => !prev);
		return !displayComments;
	};

	return (
		<div className="content-wrapper">
			<DeleteContentWrapper
				isDeleted={isDeleted}
				placeholder={"Post został usunięty"}
			>
				<Post postData={postData} isDdeleted={isDeleted} setIsDeleted={setIsDeleted} toggleComments={toggleDisplayComments} />

				{displayComments && <PostComments idPost={postData.idPost} />}
			</DeleteContentWrapper>
		</div>
	);
}
