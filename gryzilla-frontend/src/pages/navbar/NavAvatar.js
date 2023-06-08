import { useEffect } from "react";
import AvatarMini from "../../components/AvatarMini";
import { useVatarChange } from "../../context/AvatarChangeContext";
import useAxios from "../../hooks/useAxios";

export default function NavAvatar({idUser}) {

    const avatarContext = useVatarChange();

    const [data, error, loading, runRequest] = useAxios({
		method: "GET",
		headers: { accept: "*/*" },
        url: `/users/photo/${idUser}`
	});

    useEffect(()=> {
        runRequest();
    },[avatarContext.avatar])

    return (
        <>
            {data &&
                <AvatarMini avatar={{type: data.type, base64PhotoData: data.base64PhotoData}}/>
            }
        </>
    )
}