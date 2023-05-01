import { useState } from "react";
import PostComments from "./PostComments";
import Post from "./Post";
import Comment from "../../components/Comment";

export default function PostAndComments({ postData }) {
	const [displayComments, setDisplayComments] = useState(false);

	const toggleDisplayComments = () => {
		setDisplayComments((prev) => !prev);
		return !displayComments;
	};

	return (
		<div className="content-wrapper">
			<Post postData={postData} toggleComments={toggleDisplayComments} />
            
			{(!displayComments && postData.commentsDtos.length > 0) && (
				<>
					<div className="d-flex">
						<div className="comments-vertical-line"></div>
						<div style={{ flexGrow: "1" }}>
							{postData.commentsDtos.map((comment) => (
								<Comment
									key={comment.idComment}
									nick={comment.nick}
									description={comment.content}
								/>
							))}
						</div>
					</div>
				</>
			)}
			{displayComments && <PostComments idPost={postData.idPost} />}
		</div>
	);
}
