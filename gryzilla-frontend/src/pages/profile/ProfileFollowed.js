import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import ProfileFollow from "./components/ProfileFollow";
import LoadingBanner from "../../components/LoadingBanner";
import EmptyContentInfo from "../../components/EmptyContentInfo";

export default function ProfileFollowed({ idUser }) {
	const [followed, errorPosts, loadingPosts, runRequest] = useAxios({
		method: "GET",
		url: `/friends/${idUser}`,
		headers: { accept: "*/*" },
	});

	useEffect(() => {
		runRequest();
	}, [idUser]);

	const [showMore, setShowMore] = useState(false);
	const limit = 5;

	return (
		<>
			<div className="d-flex flex-wrap">
				{followed && !loadingPosts &&
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

			<EmptyContentInfo content={followed} />

			<LoadingBanner
				loading={loadingPosts}
				error={errorPosts}
				placeHolder={"Ładowanie listy obserwowanych"}
			/>
		</>
	);
}
