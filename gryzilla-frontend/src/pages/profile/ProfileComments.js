import { useEffect, useState } from "react";
import InputMockup from "../../components/InputMockup";
import { useAuth } from "../../context/AuthContext";
import ContentInput from "../../components/Editor/ContentInput";
import ProfileComment from "./components/ProfileComment";
import useAxios from "../../hooks/useAxios";

export default function ProfileComments({ idUser }) {
	const auth = useAuth();
	const [showInput, setShowInput] = useState(false);
	const [newComment, setNewComment] = useState(null);

	const [reviews, error, loading, runRequest] = useAxios({
		method: "GET",
		url: `/profileComments/${idUser}`,
		headers: { accept: "*/*" },
	});

	useEffect(()=>{
		runRequest();
	},[idUser])

	const addNewComment = (newComment) => {
		setNewComment(newComment);
		setShowInput(false)
	};

	return (
		<>
			{!showInput ? (
				<InputMockup
					handleClick={() =>
						auth.isLogged
							? setShowInput(true)
							: alert("Zaloguj się aby dodawać treści")
					}
					placeHolder={"Dodaj nowy komentarz o użytkowniku..."}
				/>
			) : (
				<ContentInput
					addNew={addNewComment}
					url={`/profileComments`}
					method={"POST"}
					apiData={{ idUserComment: idUser }}
					enableTags={false}
					enableTitle={false}
					placeHolder={"Wprowadz komentarz o użytkowniku..."}
					handleClose={() => setShowInput(false)}
				/>
			)}

			{newComment && (
				<div className="content-container">
					nowy
					{/* <Link to={`/posts/${newPosts[0].idPost}`}>
						Dodano nowy komentarz, sprawdź tutaj...
					</Link> */}
				</div>
			)}

			{reviews &&
				reviews.map((review) => {
					return (
						<ProfileComment
							key={review.idProfileComment}
							idComment={review.idProfileComment}
							nick={review.nick}
							createdAt={review.createdAt}
							content={review.content}
							avatar={{type: review.type, base64PhotoData: review.base64PhotoData}}
						/>
					);
				})}
		</>
	);
}
