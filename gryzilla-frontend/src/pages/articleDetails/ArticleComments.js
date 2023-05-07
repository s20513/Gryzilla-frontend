import axios from "axios";
import { React, useEffect, useState } from "react";
import InputMockup from "../../components/InputMockup";
import useAxios from "../../hooks/useAxios";
import InputAddArticleComment from "../articles/InputAddArticleComment";
import ContentInput from "../../components/Editor/ContentInput";
import Comment from "../../components/Comment";
import VerticalLineWrapper from "../posts/components/VerticalLineWrapper";

export default function ArticleComments(props) {
	const data = props.data;

	const [displayCommentInput, setDisplayCommentInput] = useState(false);

	//tutaj pobieranie samych komentarzy powinno być, nie całego posta z komentarzami
	// const [data, errorData, loadingData] = useAxios({
	// 	method: "GET",
	// 	url: `posts/${idPost}`,
	// 	headers: { accept: "*/*" },
	// });

	const [newComment, setNewComment] = useState([]);

	const addNewComment = (newComment) => {
		setNewComment(newComment);
		setDisplayCommentInput(false);
	};

	return (
		<>
			<VerticalLineWrapper>
					<div className="mt-3">
						{!displayCommentInput ? (
							<InputMockup handleClick={() => setDisplayCommentInput(true)}>
								Dodaj nowy komentarz...
							</InputMockup>
						) : (
							<ContentInput
								addNew={addNewComment}
								url={"comments"}
								method={"POST"}
								apiData={{ idUser: 6, idArticle: data.idArticle }}
								enableTags={false}
								placeHolder={"Wprowadz nowy komentarz..."}
								handleClose={() => setDisplayCommentInput(false)}
							/>
						)}
					</div>

					{data &&
						data.comments
							.concat(newComment)
							.map((comment) => (
								<Comment
									key={comment.idComment}
									avatar={{type: comment.niema, base: "xd"}}
									nick={comment.nick}
									createdAt={comment.createdAt}
									content={comment.content}
									highlight={comment.idComment == props.idHighlight ? true : false}
								/>
							))}

					{data && data.comments.length == 0 && (
						<div className="comment-data-container">
							Brak komentarzy do wyświetlenia
						</div>
					)}
			</VerticalLineWrapper>

			{/* {loadingData && (
				<div className="loading-block">Ładowanie komentarzy...</div>
			)} */}
		</>
	);
}
