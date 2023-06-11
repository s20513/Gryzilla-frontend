import React from "react";
import { Container } from "react-bootstrap";
import InputMockup from "../../components/InputMockup";
import useAxios from "../../hooks/useAxios";
import ArticlePreview from "./ArticlePreview";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import DropdownList from "../../components/DropdownList";
import { useState } from "react";
import useFetchPosts from "../../hooks/useFetchPosts";
import { useRef } from "react";
import { useCallback } from "react";
import LoadingBanner from "../../components/LoadingBanner";
import Require from "../../context/Require";

export default function Articles() {
	const observer = useRef();
	const navigate = useNavigate();

	const [sortType, setSortType] = useLocalStorage(
		"sortTypeArticles",
		"byDateDesc"
	);
	const [pageNumber, setPageNumber] = useState(5);

	const [articles, loading, error, isCancel, hasMore] = useFetchPosts(
		"articles",
		"/articles/qty/",
		sortType,
		pageNumber
	);

	const changeSortType = (sortType) => {
		setPageNumber(5);
		setSortType(sortType);
	};

	const lastArticleRef = useCallback(
		(node) => {
			if (loading || isCancel) return;
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
		<Container className="main-panel">
			<div className="d-flex justify-content-between">
				<h3>Wszystkie artykuły</h3>
				<DropdownList sortType={sortType} setSortType={changeSortType} />
			</div>

			<Require
				req={{
					authRole: ["Redactor", "Admin"],
				}}
			>
				{/* <Link to={"/articles/new"}> */}
					<InputMockup handleClick={() => navigate("/articles/new")} >Dodaj nowy artykuł...</InputMockup>
				{/* </Link> */}
			</Require>

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

			{!loading && <div ref={lastArticleRef}></div>}

			<LoadingBanner
				loading={loading}
				error={error}
				placeHolder={"Ładowanie artykułów"}
			/>
		</Container>
	);
}
