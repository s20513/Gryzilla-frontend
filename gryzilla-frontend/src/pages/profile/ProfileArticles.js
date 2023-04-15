import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import ArticlePreview from "../articles/ArticlePreview";

export default function ProfileArticles({idUser}) {
	const [articles, errorPosts, loadingPosts] = useAxios({
		method: "GET",
		url: `/articles/user/${idUser}`,
		headers: { accept: "*/*" },
	});

	const [showMore, setShowMore] = useState(false);
	const limit = 3;

	return (
		<>
			{articles &&
				articles.map((article, index) => {
					if (showMore === false && index > (limit - 1)) return;
					return (
						<ArticlePreview
							key={article.idArticle}
							idArticle={article.idArticle}
							title={article.title}
							content={article.content}
							nick={article.author.nick}
							date={article.createdAt}
							likes={article.likesNum}
						/>
					);
				})}

			{articles && !showMore && (
				<div
					className="content-container content-container-hover text-center"
					onClick={() => setShowMore(true)}
				>
					Pokaż więcej
				</div>
			)}

			{articles && showMore && (
				<div
					className="content-container content-container-hover text-center"
					onClick={() => setShowMore(false)}
				>
					Pokaż mniej
				</div>
			)}
		</>
	);
}
