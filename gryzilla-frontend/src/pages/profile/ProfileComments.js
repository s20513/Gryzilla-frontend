import { useState } from "react";
import InputMockup from "../../components/InputMockup";
import { useAuth } from "../../context/AuthContext";
import ContentInput from "../../components/Editor/ContentInput";
import ProfileComment from "./components/ProfileComment";

export default function ProfileComments({ idUser }) {
	const auth = useAuth();
	const [showInput, setShowInput] = useState(false);
	const [newComment, setNewComment] = useState(null);

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
					url={`/profileComments/${idUser}`}
					method={"POST"}
					apiData={{ idUserComment: auth.id }}
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

			<ProfileComment
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
			/>
		</>
	);
}
