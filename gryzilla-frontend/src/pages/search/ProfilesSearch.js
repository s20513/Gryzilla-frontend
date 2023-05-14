import { useEffect, useCallback, useRef, useState } from "react";
import useFetchPosts from "../../hooks/useFetchPosts";
import PostAndComments from "../posts/PostAndComments";
import LoadingBanner from "../../components/LoadingBanner";
import useAxiosSearch from "../../hooks/useAxiosSearch";
import ArticlePreview from "../articles/ArticlePreview";
import ProfileFollow from "../profile/components/ProfileFollow";

export default function ProfileSearch({ searchType, searchPhrase }) {
	//const observer = useRef();
	const [pageNumber, setPageNumber] = useState(5);

	const [followed, loading, error, hasMore] = useAxiosSearch({
		content: "users",
		url: `/search/getUsersByName`,
		searchType: searchType,
		searchPhrase: searchPhrase,
		pageNumber: pageNumber,
	});

	// useEffect(()=>{
	// 	setPageNumber(5);
	// },[searchPhrase, searchType])

	// const lastPostRef = useCallback(
	// 	(node) => {
	// 		if (loading) return;
	// 		if (observer.current) observer.current.disconnect();

	// 		observer.current = new IntersectionObserver((entries) => {
	// 			if (entries[0].isIntersecting && hasMore) {
	// 				setPageNumber((prevPageNumber) => prevPageNumber + 5);
	// 			}
	// 		});
	// 		if (node) observer.current.observe(node);
	// 	},
	// 	[loading, hasMore]
	// );

	return (
		<div>
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

			{/* {!loading && <div ref={lastPostRef}></div>} */}

			{followed && followed.length === 0 && (
				<div className="content-container text-center">
					Brak profili do wyświetlenia
				</div>
			)}

			<LoadingBanner
				loading={loading}
				error={error}
				placeHolder={"Ładowanie postów"}
			/>
		</div>
	);
}
