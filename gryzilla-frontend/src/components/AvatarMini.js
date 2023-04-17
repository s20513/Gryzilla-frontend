import useAxios from "../hooks/useAxios";
import { GetBase64Img } from "../utils/PictureUtils";
import defaultAvatar from "../assets/avatar-default.png";

export default function AvatarMini({idUser}) {

    const [photo, errorPhoto, loadingPhoto] = useAxios({
		method: "GET",
		url: `/users/photo/${idUser}`,
		headers: { accept: "*/*" },
	});


    return (
        <div style={{display:"inline-block"}}>
				{photo ? (
					<img
						className="profile-img-mini"
						src={GetBase64Img(photo)}
						//src="https://picsum.photos/250"
						alt="profile picture"
					/>
				) : (
					<img
						className="profile-img-mini"
						src={defaultAvatar}
						alt="profile picture"
					/>
				)}
			</div>
    );
}