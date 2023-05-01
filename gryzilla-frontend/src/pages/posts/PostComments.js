import axios from "axios";
import { React, useEffect, useState } from "react";
import InputMockup from "../../components/InputMockup";
import useAxios from "../../hooks/useAxios";
import Comment from "../../components/Comment";
import ContentInput from "../../components/Editor/ContentInput";
import { useAuth } from "../../context/AuthContext";

export default function PostComments(props) {
	const idPost = props.idPost;
	const [displayCommentInput, setDisplayCommentInput] = useState(false);
	const auth = useAuth()

	//tutaj pobieranie samych komentarzy powinno być, nie całego posta z komentarzami
	const [data, errorData, loadingData] = useAxios({
		method: "GET",
		url: `/posts/${idPost}`,
		headers: { accept: "*/*" },
	});

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
					<div className="ms-2 m-md-3">
						{!displayCommentInput ? (
							<InputMockup handleClick={() => auth.isLogged ? setDisplayCommentInput(true) : alert("Zaloguj się aby dodawać treści")}>
								Dodaj nowy komentarz...
							</InputMockup>
						) : (
							<ContentInput
								addNew={addNewComment}
								url={"posts/comment"}
								method={'POST'}
								apiData={{ idUser: 6, idPost: idPost }}
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
									nick={comment.nick}
									description={comment.content}
									highlight={comment.idComment == props.idHighlight ? true : false}
								/>
							))}

					{data && data.comments.length == 0 && (
						<div className="comment-data-container">
							Brak komentarzy do wyświetlenia
						</div>
					)}
				</div>
			</div>

			{loadingData && (
				<div className="loading-block">Ładowanie komentarzy...</div>
			)}
		</>
	);
}
