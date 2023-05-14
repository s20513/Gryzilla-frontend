import { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";

export default function useFetchPosts(content, url, sortType, pageNumber) {
	const [cancelToken, setCancelToken] = useState(null);

	const [isCancel, setIsCancel] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [posts, setPosts] = useState(null);
	const [hasMore, setHasMore] = useState(false);
	
	const [timeStamp, setTimeStamp] = useState(() => {
		const date = new Date(Date.now() + 2 * 60 * 60 * 1000);
		return date.toISOString();
	});

	useEffect(() => {
		setPosts(null);
	}, [sortType]);

	useEffect(() => {
		console.log("2. pobieranie danych")

		if (cancelToken) {
			cancelToken.cancel();
			console.log("2.1. poszedł cancel - zmienił się sortType, pageNumber")
		}
		
		const source = axios.CancelToken.source();
		setCancelToken(source);

		setIsCancel(false);
		setLoading(true);
		setError(null);

		const fetchData = async () => {
			try {
				const response = await axios.get(
					`${url}${sortType}/${pageNumber}`,
					{
						params: { time: timeStamp },
						cancelToken: source.token,
					}
				);

				//console.log(response.data[content])
				
				setPosts((prevPosts) => {
					if(prevPosts)
						return [...prevPosts, ...response.data[content]];
					return [...response.data[content]]
				});
				console.log("3. dane zostały pobrane")

				setHasMore(response.data.isNext);
				setError(null);
				
			} catch (err) {
				if (axios.isCancel(err)) {
					setIsCancel(true);
				} else {
					setError(err.message);
				}
			} finally {
				setLoading(false);
				console.log("4. koniec ładowania")
			}
		};
		fetchData();

		return () => {
			if (cancelToken) {
			  cancelToken.cancel();
			  console.log("5. useEffect końcowy, cancel")
			}
		  };

	}, [pageNumber, sortType]);

	return [ posts, loading, error, isCancel, hasMore];
}
