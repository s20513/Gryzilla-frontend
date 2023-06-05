import { useAuth } from "../../../context/AuthContext";
import useAxios from "../../../hooks/useAxios";
import axios from "axios";
import { useEffect, useState } from "react";

export default function JoinButton({ idGroup, idOwner }) {
	const auth = useAuth();

	const [isJoin, setIsJoin] = useState(false);
	const [loadingF, setLoadingF] = useState(false);

	const [data, error, loading, runRequest] = useAxios({
		method: "GET",
		headers: { accept: "*/*" },
		executeOnRender: false,
	});

	useEffect(() => {
		if (!auth.isLogged) return;
		runRequest({ url: `/groups/${auth.id}/${idGroup}` });
	}, [auth.isLogged]);

	useEffect(() => {
		if (!data) return;
		setIsJoin(data.member);
	}, [data]);

	const handleClick = async () => {
		if (!auth.isLogged) {
			return;
			//tuaj alert że potrzebne zalogowanie
		}

		try {
			const method = isJoin ? "DELETE" : "POST";

			setLoadingF(true);
			const result = await axios.request({
				method: method,
				url: `/groups/user/${idGroup}`,
				headers: { accept: "*/*", ...auth.getJwtToken() },
				data: {
					idGroup: idGroup,
					idUser: auth.id,
				},
			});
			setIsJoin((prev) => {
				return !prev;
			});
		} catch (error) {
			console.log("Błąd przy dołączaniu do grupy");
		} finally {
			setLoadingF(false);
		}
	};

	return (
		<>
			{idOwner && idOwner != auth.id ? (
				<>
					<div
						onClick={() => handleClick()}
						className={
							isJoin && auth.isLogged ? "likes-box-liked" : "likes-box"
						}
						style={{ width: "150px", textAlign: "center" }}
					>
						{!loadingF ? (
							<>
								{!isJoin && <span>Dołącz</span>}
								{isJoin && <span>Dołączono</span>}
							</>
						) : (
							<span>Przetwarzam...</span>
						)}
					</div>
				</>
			) : (
				<div
					className={"likes-box-liked"}
					style={{ width: "150px", textAlign: "center" }}
				>
					Założyciel
				</div>
			)}
		</>
	);
}
