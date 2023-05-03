import { useAuth } from "../../../context/AuthContext";
import useAxios from "../../../hooks/useAxios";
import axios from "axios";
import { useEffect, useState } from "react";

export default function JoinButton({ idGroup }) {
	const auth = useAuth();

	const [isJoin, setIsJoin] = useState(false);

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
			const result = await axios.request({
				method: method,
				url: `/groups/user/${idGroup}`,
				headers: { accept: "*/*" },
                data: {
                    idGroup: idGroup,
                    idUser: auth.id
                }
			});
			//setResponse(result.data);
		} catch (error) {
			//setError(error);
		} finally {
			setIsJoin((prev) => {
				return !prev;
			});
		}
	};

	return (
		<div onClick={()=> handleClick()} className={isJoin && auth.isLogged ? "likes-box-liked" : "likes-box"} style={{width: "150px", textAlign:"center"}}>
			{!isJoin && <span>Dołącz</span>}
			{isJoin && <span>Opuść</span>}
		</div>
	);
}
