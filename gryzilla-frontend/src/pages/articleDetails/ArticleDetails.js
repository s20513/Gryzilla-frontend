import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import ArticleComments from "./ArticleComments";
import LikeButton from "../../components/LikeButton";

export default function ArticleDetails() {
	
	const params = useParams();
	const idCommentHighlight = params.idComment ? params.idComment : null;

	const [data, errorData, loadingData] = useAxios({
		method: "GET",
		url: `/articles/${params.idArticle}`,
		headers: { accept: "*/*" },
	});

	return (
		<Container className="main-panel">
			<h3>Szczegóły artykułu</h3>

			{data && (
				<div className="content-container">
					<div className="data-bar">
						<LikeButton
							likesNum={data.likesNum}
							id={data.idArticle}
							url={"likesArticle"}
						/>
						<span className="article-title">{data.title}</span>
					</div>
					<hr className="hr-line" />
					<div>
						<div dangerouslySetInnerHTML={{ __html: data.content }}></div>
					</div>
					<span className="article-label">
						Artykuł użytkownika {data.author.nick}, utworzono {data.createdAt}
					</span>

					<div className="lower-tag-container">
						{data &&
							data.tags.map((tag, index) => <span key={index}>#{tag} </span>)}
					</div>
				</div>
			)}

			<h3>Komentarze</h3>

			<ArticleComments data={data} idHighlight={idCommentHighlight} />
		</Container>
	);
}
