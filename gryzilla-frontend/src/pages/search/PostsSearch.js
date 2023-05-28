import { useEffect, useCallback, useRef, useState } from "react";
import useFetchPosts from "../../hooks/useFetchPosts";
import PostAndComments from "../posts/PostAndComments";
import LoadingBanner from "../../components/LoadingBanner";
import useAxiosSearch from "../../hooks/useAxiosSearch";

export default function PostsSearch({ searchType, searchPhrase }) {
	const observer = useRef();
	const [pageNumber, setPageNumber] = useState(5);

	const [posts, loading, error, hasMore] = useAxiosSearch({
		content: "posts",
		url:
			searchType === "phrase"
				? `/search/getPostsByWord/`
				: `/search/getPostsByTag`,
		searchType: searchType,
		searchPhrase: searchPhrase,
		pageNumber: pageNumber,
	});

	useEffect(() => {
		setPageNumber(5);
	}, [searchPhrase, searchType]);

	const lastPostRef = useCallback(
		(node) => {
			if (loading) return;
			if (observer.current) observer.current.disconnect();

			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPageNumber((prevPageNumber) => prevPageNumber + 5);
				}
			});
			if (node) observer.current.observe(node);
		},
		[loading, hasMore]
	);

	return (
		<div>
			{posts &&
				posts.map((post) => {
					//return <Post key={post.idPost} postData={post}></Post>;
					return <PostAndComments key={post.idPost} postData={post} />;
				})}

			{posts && posts.length === 0 && (
				<div className="content-container text-center">
					Brak postów do wyświetlenia
				</div>
			)}

			{!loading && <div ref={lastPostRef}></div>}

			<LoadingBanner
				loading={loading}
				error={error}
				placeHolder={"Ładowanie postów"}
			/>
		</div>
	);
}
