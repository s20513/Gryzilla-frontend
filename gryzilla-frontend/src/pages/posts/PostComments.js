import axios from "axios";
import { React, useEffect, useState } from "react";
import InputMockup from "../../components/InputMockup";
import useAxios from "../../hooks/useAxios";
import Comment from "../../components/Comment";
import ContentInput from "../../components/Editor/ContentInput";
import { useAuth } from "../../context/AuthContext";
import VerticalLineWrapper from "./components/VerticalLineWrapper";
import CommentPost from "./components/CommentPost";

export default function PostComments(props) {
	const idPost = props.idPost;
	const [displayCommentInput, setDisplayCommentInput] = useState(false);
	const auth = useAuth()

	//tutaj pobieranie samych komentarzy powinno być, nie całego posta z komentarzami
	const [data, errorData, loadingData] = useAxios({
		method: "GET",
		url: `/posts/comment/${idPost}`,
		headers: { accept: "*/*" },
	});

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
							<InputMockup handleClick={() => auth.isLogged ? setDisplayCommentInput(true) : alert("Zaloguj się aby dodawać treści")}>
								Dodaj nowy komentarz...
							</InputMockup>
						) : (
							<ContentInput
								addNew={addNewComment}
								url={"posts/comment"}
								method={'POST'}
								apiData={{ idPost: idPost }}
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
								<CommentPost commentData={comment} />
							))}

					{data && data.comments.length == 0 && (
						<div className="comment-data-container">
							Brak komentarzy do wyświetlenia
						</div>
					)}
			</VerticalLineWrapper>

			{loadingData && (
				<div className="loading-block">Ładowanie komentarzy...</div>
			)}
		</>
	);
}
