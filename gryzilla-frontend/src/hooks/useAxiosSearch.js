import { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";

export default function useAxiosSearch({content, url, searchType, searchPhrase, pageNumber}) {
	const abortController = useRef(null);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [posts, setPosts] = useState(null);

	const [hasMore, setHasMore] = useState(false);

	const [timeStamp, setTimeStamp] = useState(() => {
		const date = new Date(Date.now() + 2 * 60 * 60 * 1000);
		return date.toISOString();
	});

	useEffect(() => {
		setPosts(null);
	}, [searchType, searchPhrase]);

	useEffect(() => {
        console.log("wyszukana: " + searchPhrase)
        if(!searchPhrase) return;

		console.log("pobieranie")

		setLoading(true);
		setError(false);

		const fetchData = async () => {
			try {
				const response = await axios.get(
					`${url}/${pageNumber}`,
					{
						params: { time: timeStamp, word: searchPhrase },
						// signal: abortController.current.signal,
					}
				);

				console.log(response.data[content])
				
				setPosts((prevPosts) => {
					if(prevPosts)
						return [...prevPosts, ...response.data[content]];
					return [...response.data[content]]
				});

				setHasMore(response.data.isNext);
				setError(null);
			} catch (err) {
				if (!axios.isCancel(err)) setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [pageNumber, searchType, searchPhrase, url]);

	return [ posts, loading, error, hasMore];
}
