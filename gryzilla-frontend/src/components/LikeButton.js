import { useAuth } from "../context/AuthContext";
import useAxios from "../hooks/useAxios";
import axios from "axios";
import { useEffect, useState } from "react";

export default function LikeButton(props) {
	const auth = useAuth();

	const [likesNum, setLikesNum] = useState(props.likesNum);
	const idContent = props.id;
	const url = props.url;
    const [isLiked, setIsLiked] = useState(false);

	const [data, error, loading, runRequest] = useAxios({
		method: "GET",
		headers: { accept: "*/*" },
		executeOnRender: false,
	});

    useEffect(() => {
		if(data && data == true) setIsLiked(true);
	}, [data]);

	useEffect(() => {
		if (!auth.isLogged) return;
		runRequest({ url: `/${url}/${auth.id}/${idContent}/` });
	}, [auth.isLogged]);

	const handleClick = async () => {
		if (!auth.isLogged) {
			return;
			//tuaj alert że potrzebne zalogowanie
		}

        try {
            const method = isLiked ? "DELETE" : "POST";
            const result = await axios.request({
                method: method,
		        url: `/${url}/${auth.id}/${idContent}`,
		        headers: { accept: "*/*" },
            });
            //setResponse(result.data);

          } catch( error ) {
            //setError(error);
          } finally {
            setLikesNum((prev) => {
                if(isLiked) return --prev;
                return ++prev;
            })

           setIsLiked( (prev)=> {
                return !prev;
           })
          }
	};

	return (
		<div onClick={() => handleClick()} className={ isLiked ? ("likes-box-liked") : ("likes-box")}>
            {/* {data == true ? "Tak" : "Nie" } */}
			<span>+{likesNum}</span>
		</div>
	);
}
