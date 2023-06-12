import { useEffect, useState } from "react";
import InputMockup from "../../components/InputMockup";
import { useAuth } from "../../context/AuthContext";
import ContentInput from "../../components/Editor/ContentInput";
import useAxios from "../../hooks/useAxios";

import GroupComment from "./components/GroupComment";
import Require from "../../context/Require";
import EmptyContentInfo from "../../components/EmptyContentInfo";

export default function GroupComments({ idGroup, idUserCreatorGroup, isMember }) {
	const auth = useAuth();

	const [showInput, setShowInput] = useState(false);
	const [newComments, setNewComments] = useState([]);

	const [message, error, loading] = useAxios({
		method: "GET",
		url: `/groupsMessage/${idGroup}`,
		headers: { accept: "*/*" },
	});

	const addNewComment = (newComment) => {
		setNewComments((prev) => {
			return [...prev, newComment];
		});
		setShowInput(false);
	};

	return (
		<>
			<Require req={{ authLogged: true }}>
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
			</Require>

			{message &&
				message.concat(newComments).map((msg) => {
					return (
						<GroupComment
							key={msg.idMessage}
							idMessage={msg.idMessage}
							idUserMessage={msg.idUser}
							idUserCreatorGroup={idUserCreatorGroup}
							avatar={{
								type: msg.type,
								base64PhotoData: msg.base64PhotoData,
							}}
							nick={msg.nick}
							content={msg.content}
							createdAt={msg.createdAt}
						/>
					);
				})}

				{message && <EmptyContentInfo content={message.concat(newComments)} />}
		</>
	);
}
