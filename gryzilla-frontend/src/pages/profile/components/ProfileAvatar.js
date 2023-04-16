import defaultAvatar from "../../../assets/avatar-default.png";
import useAxios from "../../../hooks/useAxios";

export default function ProfileAvatar({idUser}) {

    const [photo, errorPhoto, loadingPhoto] = useAxios({
		method: "GET",
		url: `/users/photo/${idUser}`,
		headers: { accept: "*/*" },
	});

    function getBase64Img() {
		return `data:image/${photo.type};base64,${photo.base64PhotoData}`;
	}

	return (
		<div>
			{photo ? (
				<img
					className="profile-img"
					src={getBase64Img()}
					//src="https://picsum.photos/250"
					alt="profile picture"
				/>
			) : (
				<img
					className="profile-img"
					src={defaultAvatar}
					alt="profile picture"
				/>
			)}
		</div>
	);
}
