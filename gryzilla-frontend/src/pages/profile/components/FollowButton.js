import { useAuth } from "../../../context/AuthContext";
import useAxios from "../../../hooks/useAxios";
import axios from "axios";
import { useEffect, useState } from "react";

export default function FollowButton({ idUser }) {
	const auth = useAuth();

	const [isLiked, setIsLiked] = useState(false);

	const [data, error, loading, runRequest] = useAxios({
		method: "GET",
		headers: { accept: "*/*" },
		executeOnRender: false,
	});

	useEffect(()=>{
		if (!auth.isLogged) return;
		runRequest({ url: `/friends/${auth.id}/` });
	},[idUser])

	useEffect(() => {
		if (!auth.isLogged) return;
		runRequest({ url: `/friends/${auth.id}/` });
	}, [auth.isLogged]);

	useEffect(() => {
		if (!data) return;
		data.map((fallowed) => {
			if (fallowed.idUser == idUser) {
				//console.log("liked");
				setIsLiked(true);
			}
		});
	}, [data]);


	const handleClick = async () => {
		if (!auth.isLogged) {
			return;
			//tuaj alert że potrzebne zalogowanie
		}

		try {
			const method = isLiked ? "DELETE" : "POST";
			const result = await axios.request({
				method: method,
				url: `/friends/${auth.id}/${idUser}`,
				headers: { accept: "*/*" },
			});
			//setResponse(result.data);
		} catch (error) {
			//setError(error);
		} finally {
			setIsLiked((prev) => {
				return !prev;
			});
		}
	};

	return (
		<div onClick={()=> handleClick()} className={isLiked && auth.isLogged ? "likes-box-liked" : "likes-box"} style={{width: "150px", textAlign:"center"}}>
			{!isLiked && <span>Obserwuj</span>}
			{isLiked && <span>Od obserwuj</span>}
		</div>
	);
}
