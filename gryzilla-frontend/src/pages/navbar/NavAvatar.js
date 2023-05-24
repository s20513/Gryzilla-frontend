import AvatarMini from "../../components/AvatarMini";
import useAxios from "../../hooks/useAxios";

export default function NavAvatar({idUser}) {

    const [data, error, loading] = useAxios({
		method: "GET",
		headers: { accept: "*/*" },
        url: `/users/photo/${idUser}`
	});

    return (
        <>
            {data &&
                <AvatarMini avatar={{type: data.type, base64PhotoData: data.base64PhotoData}}/>
            }
        </>
    )
}