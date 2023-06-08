import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import Post from "../posts/Post";
import PostAndComments from "../posts/PostAndComments";
import LoadingBanner from "../../components/LoadingBanner";

export default function ProfilePotst({ idUser }) {
	const [posts, errorPosts, loadingPosts, runRequest] = useAxios({
		method: "GET",
		url: `/posts/user/${idUser}`,
		headers: { accept: "*/*" },
	});

	useEffect(() => {
		runRequest();
	}, [idUser]);

	const [showMore, setShowMore] = useState(false);
	const limit = 3;

	return (
		<>
			{posts &&
				!loadingPosts &&
				posts.map((post, index) => {
					if (showMore === false && index > limit - 1) return;
					//return <Post key={post.idPost} postData={post}></Post>;
					return <PostAndComments key={post.idPost} postData={post} />;
				})}

			<LoadingBanner
				loading={loadingPosts}
				error={errorPosts}
				placeHolder={"Ładowanie postów..."}
			/>

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
