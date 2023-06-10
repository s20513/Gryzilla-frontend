import useAxios from "../../hooks/useAxios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import Post from "../posts/Post";
import { useEffect, useState } from "react";
import PostComments from "../posts/PostComments";

export default function PostDetails() {
	const params = useParams();
	const idCommentHighlight = params.idComment ? params.idComment : null;

	const [isDeleted, setIsDeleted] = useState(false);
	const navigate = useNavigate();

	const [data, errorData, loadingData, runRequest] = useAxios({
		method: "GET",
		url: `/posts/${params.idPost}`,
		headers: { accept: "*/*" },
	});

	useEffect(() => {
		runRequest();
	}, [params.idPost]);

	useEffect(() => {
		if (isDeleted) navigate("/posts");
	}, [isDeleted]);

	return (
		<Container className="main-panel">
			<div className="content-wrapper">
				<h3>Widok szczegółowy posta</h3>

				{data && (
					<Post
						postData={data}
						displayComments={true}
						detailsLink={false}
						isDeleted={isDeleted}
						setIsDeleted={setIsDeleted}
					></Post>
				)}

				{data && (
					<PostComments idPost={data.idPost} idHighlight={idCommentHighlight} />
				)}

				{errorData && errorData.response?.status == 404 && <span>Nie odnaleziono szukanego posta</span>}
			</div>
		</Container>
	);
}
