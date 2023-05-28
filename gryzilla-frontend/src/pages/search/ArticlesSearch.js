import { useEffect, useCallback, useRef, useState } from "react";
import useFetchPosts from "../../hooks/useFetchPosts";
import PostAndComments from "../posts/PostAndComments";
import LoadingBanner from "../../components/LoadingBanner";
import useAxiosSearch from "../../hooks/useAxiosSearch";
import ArticlePreview from "../articles/ArticlePreview";

export default function ArticlesSearch({ searchType, searchPhrase }) {
	const observer = useRef();
	const [pageNumber, setPageNumber] = useState(5);

	const [articles, loading, error, hasMore] = useAxiosSearch({
		content: "articles",
		url:
			searchType === "phrase"
				? `/search/getArticlesByWord/`
				: `/search/getArticlesByTag`,
		searchType: searchType,
		searchPhrase: searchPhrase,
		pageNumber: pageNumber,
	});

	useEffect(() => {
		setPageNumber(5);
	}, [searchPhrase, searchType]);

	const lastPostRef = useCallback(
		(node) => {
			if (loading) return;
			if (observer.current) observer.current.disconnect();

			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPageNumber((prevPageNumber) => prevPageNumber + 5);
				}
			});
			if (node) observer.current.observe(node);
		},
		[loading, hasMore]
	);

	return (
		<div>
			{articles &&
				articles.map((article) => {
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

			{articles && articles.length === 0 && (
				<div className="content-container text-center">
					Brak artykułów do wyświetlenia
				</div>
			)}

			{!loading && <div ref={lastPostRef}></div>}

			<LoadingBanner
				loading={loading}
				error={error}
				placeHolder={"Ładowanie postów"}
			/>
		</div>
	);
}
