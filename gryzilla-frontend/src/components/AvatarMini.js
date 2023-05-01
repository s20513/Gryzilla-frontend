import useAxios from "../hooks/useAxios";
import { GetBase64Img } from "../utils/PictureUtils";
import defaultAvatar from "../assets/avatar-default.png";
import { useState } from "react";

export default function AvatarMini({avatar}) {

	const [useAvatar, setUseAvatar] = useState(()=>{
		if(avatar.type != null && avatar.base64PhotoData != null){
			console.log(false);
			return true;
		}
		console.log(true)
		return false;
	})

    return (
        <div style={{display:"inline-block"}}>
				{useAvatar ? (
					<img
						className="profile-img-mini"
						src={GetBase64Img(avatar)}
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