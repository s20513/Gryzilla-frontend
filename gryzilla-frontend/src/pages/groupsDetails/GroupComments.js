import { useEffect, useState } from "react";
import InputMockup from "../../components/InputMockup";
import { useAuth } from "../../context/AuthContext";
import ContentInput from "../../components/Editor/ContentInput";
import useAxios from "../../hooks/useAxios";
import Comment from "../../components/Comment";

export default function GroupComments({ idGroup, isMember }) {
	const auth = useAuth();

	const [showInput, setShowInput] = useState(false);
	const [newComments, setNewComments] = useState([]);

	const [message, error, loading] = useAxios({
		method: "GET",
		url: `/groupsMessage/${idGroup}`,
		headers: { accept: "*/*" },
	});

	// const [dataMember, errorMember, loadingMember, runRequestMember] = useAxios({
	// 	method: "GET",
	// 	headers: { accept: "*/*" },
	// 	executeOnRender: false,
	// });

	// useEffect(() => {
	// 	if (!auth.isLogged) return;
	// 	runRequestMember({ url: `/groups/${auth.id}/${idGroup}` });
	// }, [auth.isLogged]);

	const addNewComment = (newComment) => {
		setNewComments((prev) => {
			return [...prev, newComment];
		});
		setShowInput(false);
	};

	return (
		<>
			{isMember && (
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
				</>
			)}

			{message &&
				message.concat(newComments).map((msg) => {
					return (
						<Comment
							key={msg.idMessage}
							avatar={null}
							nick={msg.nick}
							content={msg.content}
							createdAt={msg.createdAt}
						/>
					);
				})}
		</>
	);
}
