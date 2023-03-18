import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import Post from "../posts/Post";
import { useEffect } from "react";

export default function PostDetails() {
	const params = useParams();

	const [data, errorData, loadingData] = useAxios({
		method: "GET",
		url: `${params.idPost}`,
		headers: { accept: "*/*" },
	});

	return (
		<Container className="main-panel">
			<h3>Post</h3>

			{data && 
				<Post postData={data} displayComments={true} detailsLink={false}></Post>
			}

			{/* <h3>Komentarze</h3> */}

			{/* <ArticleComments data={data} /> */}
		</Container>
	);
}
