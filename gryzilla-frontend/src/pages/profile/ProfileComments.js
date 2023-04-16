import { useState } from "react";
import InputMockup from "../../components/InputMockup";
import { useAuth } from "../../context/AuthContext";
import ContentInput from "../../components/Editor/ContentInput";
import ProfileComment from "./components/ProfileComment";
import useAxios from "../../hooks/useAxios";

export default function ProfileComments({ idUser }) {
	const auth = useAuth();
	const [showInput, setShowInput] = useState(false);
	const [newComment, setNewComment] = useState(null);

	const [reviews, error, loading] = useAxios({
		method: "GET",
		url: `/profileComments/${idUser}`,
		headers: { accept: "*/*" },
	});

	const addNewComment = (newComment) => {
		setNewComment(newComment);
		console.log(newComment);
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
						/>
					);
				})}

			{/* <ProfileComment
				idComment={1}
				nick={"damian"}
				createdAt={"2022-11-27T00:00:00"}
				content={"dobrze"}
			/>

			<ProfileComment
				idComment={1}
				nick={"damian"}
				createdAt={"2022-11-27T00:00:00"}
				content={"dobrze"}
			/> */}
		</>
	);
}
