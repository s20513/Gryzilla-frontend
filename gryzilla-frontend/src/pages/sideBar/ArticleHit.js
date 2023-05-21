import { React, useEffect, useState } from "react";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { BiText } from "react-icons/bi";
import { AiFillWarning } from "react-icons/ai";
import useAxios from "../../hooks/useAxios";
import { Container } from "react-bootstrap";
import Post from "../posts/Post";
import { DbDateConvert } from "../../utils/DataUtlis";
import LoadingBlock from "../../components/LoadingBlock";
import { Link } from "react-router-dom";

export default function ArticleHit() {
	const [article, errorArticle, loadingArticle] = useAxios({
		method: "GET",
		url: `/articles/top`,
		headers: { accept: "*/*" },
	});

	return (
		<Container className="main-panel">
			<h3>Popularne artykuły</h3>
			<div className="top-three">
				{!article && (
					<LoadingBlock
						blocksNum={3}
						topSize="25px"
						bottomLines={1}
						hrLine={false}
					/>
				)}
				{article &&
					article.map((article, index) => {
						return (
							<Link to={`articles/${article.idArticle}`}>
								<div key={index} className="content-container">
									<h5 className="mb-0">{article.title}</h5>
									<span className="article-label">
										Twórca {article.author.nick}, utworzono{" "}
										{DbDateConvert(article.createdAt).time}{" "}
										{DbDateConvert(article.createdAt).date}
									</span>
								</div>
							</Link>
						);
					})}
			</div>
		</Container>
	);
}
