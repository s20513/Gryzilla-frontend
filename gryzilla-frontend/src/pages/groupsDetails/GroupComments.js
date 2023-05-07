import { useState } from "react";
import InputMockup from "../../components/InputMockup";
import { useAuth } from "../../context/AuthContext";
import ContentInput from "../../components/Editor/ContentInput";
import useAxios from "../../hooks/useAxios";
import Comment from "../../components/Comment";

export default function GroupComments({ idGroup }) {
	const auth = useAuth();

	const [showInput, setShowInput] = useState(false);
	const [newComment, setNewComment] = useState(null);

	const [message, error, loading] = useAxios({
		method: "GET",
		url: `/groupsMessage/${idGroup}`,
		headers: { accept: "*/*" },
	});

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
					placeHolder={"Dodaj nową wiadomość na grupie..."}
				/>
			) : (
				<ContentInput
					addNew={addNewComment}
					url={`/groupsMessage`}
					method={"POST"}
					apiData={{ idGroup: idGroup }}
					enableTags={false}
					enableTitle={false}
					placeHolder={"Wprowadz nową wiadomość..."}
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

			{message &&
				message.map((msg) => {
					return (
                        <Comment avatar={null} nick={msg.nick} content={msg.content} createdAt={msg.createdAt} />
						
					);
				})}
		</>
	);
}
