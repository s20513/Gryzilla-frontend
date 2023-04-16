import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import ProfileFollow from "./components/ProfileFollow";

export default function ProfileFollowed({ idUser }) {
	const [followed, errorPosts, loadingPosts] = useAxios({
		method: "GET",
		url: `/friends/${idUser}`,
		headers: { accept: "*/*" },
	});

	const [showMore, setShowMore] = useState(false);
	const limit = 5;

	return (
		<>
			<div className="d-flex flex-wrap">
				{followed &&
					followed.map((followedUser, index) => {
						return (
							<ProfileFollow
								key={followedUser.idUser}
								idUser={followedUser.idUser}
								nick={followedUser.nick}
							/>
						);
					})}
			</div>

			{/* {followed && !showMore && (
				<div
					className="content-container content-container-hover text-center"
					onClick={() => setShowMore(true)}
				>
					Pokaż więcej
				</div>
			)}

			{followed && showMore && (
				<div
					className="content-container content-container-hover text-center"
					onClick={() => setShowMore(false)}
				>
					Pokaż mniej
				</div>
			)} */}
		</>
	);
}
