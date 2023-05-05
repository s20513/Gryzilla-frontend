import { useState } from "react";
import PostComments from "./PostComments";
import Post from "./Post";
import Comment from "../../components/Comment";
import VerticalLineWrapper from "./components/VerticalLineWrapper";

export default function PostAndComments({ postData }) {
	const [displayComments, setDisplayComments] = useState(false);

	const toggleDisplayComments = () => {
		setDisplayComments((prev) => !prev);
		return !displayComments;
	};

	return (
		<div className="content-wrapper">
			<Post postData={postData} toggleComments={toggleDisplayComments} />

			{/* {!displayComments && postData.commentsDtos.length > 0 && (
				<VerticalLineWrapper>
					{postData.commentsDtos.map((comment) => (
						<Comment
							key={comment.idComment}
							nick={comment.nick}
							description={comment.content}
						/>
					))}
				</VerticalLineWrapper>
			)} */}

			{displayComments && <PostComments idPost={postData.idPost} />}
		</div>
	);
}
