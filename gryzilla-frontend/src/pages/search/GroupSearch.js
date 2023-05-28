import { useEffect, useCallback, useRef, useState } from "react";
import useFetchPosts from "../../hooks/useFetchPosts";
import PostAndComments from "../posts/PostAndComments";
import LoadingBanner from "../../components/LoadingBanner";
import useAxiosSearch from "../../hooks/useAxiosSearch";
import GroupPreview from "../groups/GroupPreview";

export default function GroupSearch({ searchType, searchPhrase }) {
	const observer = useRef();
	const [pageNumber, setPageNumber] = useState(5);

	const [groups, loading, error, hasMore] = useAxiosSearch({
		content: "groups",
		url: `/search/getGroupsByWord/`,
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
			{groups &&
				groups.map((group) => {
					return <GroupPreview data={group} />;
				})}

			{groups && groups.length === 0 && (
				<div className="content-container text-center">
					Brak grup do wyświetlenia
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
