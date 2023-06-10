import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import Post from "../posts/Post";
import PostAndComments from "../posts/PostAndComments";
import GroupPreview from "../groups/GroupPreview";
import LoadingBanner from "../../components/LoadingBanner";

export default function ProfileGroups({ idUser }) {
	const [groups, errorGropups, loadingGroups, runRequest] = useAxios({
		method: "GET",
		url: `/groups/user/${idUser}`,
		headers: { accept: "*/*" },
	});

	useEffect(() => {
		runRequest();
	}, [idUser]);

	const [showMore, setShowMore] = useState(false);
	const limit = 3;

	return (
		<>
			{groups &&
				!loadingGroups &&
				groups.map((group, index) => {
					// if (showMore === false && index > limit - 1) return;
					//return <Post key={post.idPost} postData={post}></Post>;
					return <GroupPreview key={group.idGroup} data={group} />;
				})}

			<LoadingBanner
				loading={loadingGroups}
				error={errorGropups}
				placeHolder={"Ładowanie listy grup..."}
			/>

			{/* {groups && !showMore && (
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
			)} */}
		</>
	);
}
