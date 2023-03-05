import React from "react";
import { Container } from "react-bootstrap";
import InputMockup from "../../components/InputMockup";
import useAxios from "../../hooks/useAxios";
import ArticlePreview from "./ArticlePreview";

export default function Articles() {
	const [data, error, loading] = useAxios({
		method: "GET",
		url: `articles`,
		headers: { accept: "*/*" },
	});

	return (
		<Container className="main-panel">
			<h3>Wszystkie artykuły</h3>
			<InputMockup>Dodaj nowy artykuł...</InputMockup>

			{data &&
				data.map((article) => {
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
		</Container>
	);
}
