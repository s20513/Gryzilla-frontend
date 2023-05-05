import useAxios from "../hooks/useAxios";
import { GetBase64Img } from "../utils/PictureUtils";
import defaultAvatar from "../assets/avatar-default.png";
import defaualtGroupAvatar from "../assets/group-default.png";
import { useState } from "react";

export default function AvatarMini({avatar, isGroup}) {

	const isPhotoGroup = isGroup && isGroup == true ? true : false;

	const [useAvatar, setUseAvatar] = useState(()=>{
		if(avatar && avatar.type != null && avatar.base64PhotoData != null){
			return true;
		}
		return false;
	})

    return (
        <div style={{display:"inline-block"}}>
				{useAvatar ? (
					<img
						className={isPhotoGroup ? "profile-img-max" : "profile-img-mini"}
						src={GetBase64Img(avatar)}
						//src="https://picsum.photos/250"
						alt="profile picture"
					/>
				) : (
					<img
						className={isPhotoGroup ? "profile-img-max" : "profile-img-mini"}
						src={isPhotoGroup ? defaualtGroupAvatar : defaultAvatar}
						alt="profile picture"
					/>
				)}
			</div>
    );
}