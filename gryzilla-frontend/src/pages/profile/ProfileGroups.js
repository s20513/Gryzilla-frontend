import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import Post from "../posts/Post";
import PostAndComments from "../posts/PostAndComments";
import GroupPreview from "../groups/GroupPreview";

export default function ProfileGroups({ idUser }) {
	const [groups, errorGropups, loadingGroups, runRequest] = useAxios({
		method: "GET",
		url: `/groups/user/${idUser}`,
		headers: { accept: "*/*" },
	});

	useEffect(()=>{
		runRequest();
	},[idUser])

	const [showMore, setShowMore] = useState(false);
	const limit = 3;

	return (
		<>
			{groups &&
				groups.map((group, index) => {
					if (showMore === false && index > (limit - 1)) return;
					//return <Post key={post.idPost} postData={post}></Post>;
					return <GroupPreview key={group.idGroup} data={group} />;
				})}

			{groups && !showMore && (
				<div
					className="content-container content-container-hover text-center"
					onClick={() => setShowMore(true)}
				>
					Pokaż więcej
				</div>
			)}

			{groups && showMore && (
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
