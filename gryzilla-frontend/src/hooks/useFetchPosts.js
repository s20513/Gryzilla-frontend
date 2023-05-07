import { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";

export default function useFetchPosts(content, url, sortType, pageNumber) {
	const abortController = useRef(null);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [posts, setPosts] = useState(null);

	const [hasMore, setHasMore] = useState(false);
	const [timeStamp, setTimeStamp] = useState(() => {
		const date = new Date(Date.now() + 2 * 60 * 60 * 1000);
		return date.toISOString();
	});

	const cancelRequest = () => {
    //console.log("abort")
		if (abortController.current) {
			abortController.current.abort();
		}
	};

	useEffect(() => {
    //cancelRequest();
		setPosts([]);
	}, [sortType]);

	useEffect(() => {
		console.log("pobieranie")
		setLoading(true);
		setError(false);
		let cancel;

		const fetchData = async () => {
	
      //abortController.current = new AbortController();

			try {
				const response = await axios.get(
					`${url}${sortType}/${pageNumber}`,
					{
						params: { time: timeStamp },
						// signal: abortController.current.signal,
					}
				);

				console.log(response.data[content])
				
				setPosts((prevPosts) => {
					return [...prevPosts, ...response.data[content]];
				});
        //console.log("dane");

				setHasMore(response.data.isNext);
				setError(null);
			} catch (err) {
				if (!axios.isCancel(err)) setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [pageNumber, sortType]);

	return [ posts, loading, error, hasMore];
}
