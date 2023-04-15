import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import Post from "../posts/Post";

export default function ProfilePotst({ idUser }) {
	const [posts, errorPosts, loadingPosts] = useAxios({
		method: "GET",
		url: `/posts/user/${idUser}`,
		headers: { accept: "*/*" },
	});

	const [showMore, setShowMore] = useState(false);
	const limit = 3;

	return (
		<>
			{posts &&
				posts.map((post, index) => {
					if (showMore === false && index > (limit - 1)) return;
					return <Post key={post.idPost} postData={post}></Post>;
				})}

			{posts && !showMore && (
				<div
					className="content-container content-container-hover text-center"
					onClick={() => setShowMore(true)}
				>
					Pokaż więcej
				</div>
			)}

			{posts && showMore && (
				<div
					className="content-container content-container-hover text-center"
					onClick={() => setShowMore(false)}
				>
					Pokaż mniej
				</div>
			)}
		</>
	);
}
