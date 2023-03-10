import axios from "axios";
import { React, useEffect, useState } from "react";
import InputMockup from "../../components/InputMockup";
import useAxios from "../../hooks/useAxios";
import InputAddArticleComment from "./InputAddArticleComment";
import ContentInput from "../../components/Editor/ContentInput";
import Comment from "../../components/Comment";

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
			<div className="d-flex">
				<div className="comments-vertical-line"></div>

				<div style={{ flexGrow: "1" }}>
					<div className="m-3">
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
								atrName={"description"}
							/>
						)}
					</div>

					{data &&
						data.comments
							.concat(newComment)
							.map((comment) => (
								<Comment
									key={comment.idComment}
									nick={comment.nick}
									description={comment.content}
								/>
							))}

					{data && data.comments.length == 0 && (
						<div className="comment-data-container">
							Brak postów do wyświetlenia
						</div>
					)}
				</div>
			</div>

			{/* {loadingData && (
				<div className="loading-block">Ładowanie komentarzy...</div>
			)} */}
		</>
	);
}
