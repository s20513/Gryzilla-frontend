import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import Post from "../posts/Post";
import { useEffect } from "react";
import PostComments from "../posts/PostComments";

export default function PostDetails() {
	const params = useParams();
	const idCommentHighlight = params.idComment ? params.idComment : null;

	const [data, errorData, loadingData, runRequest] = useAxios({
		method: "GET",
		url: `/posts/${params.idPost}`,
		headers: { accept: "*/*" },
	});

	useEffect(()=>{
		runRequest();
	},[params.idPost])

	return (
		<Container className="main-panel">
			<div className="content-wrapper">
				<h3>Post</h3>

				{data && (
					<Post
						postData={data}
						displayComments={true}
						detailsLink={false}
					></Post>
				)}

				{data && (
					<PostComments idPost={data.idPost} idHighlight={idCommentHighlight} />
				)}
			</div>
		</Container>
	);
}
