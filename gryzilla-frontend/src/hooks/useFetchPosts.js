import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useFetchPosts(sortType, pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [posts, setPosts] = useState(null)
  const [hasMore, setHasMore] = useState(false)
  const [timeStamp, setTimeStamp] = useState(() => {
    const date = new Date(Date.now() + (60*60*1000));
    return date.toISOString();
  })

  useEffect(() => {
    setPosts([]);
  }, [sortType])

  useEffect( () => {
    setLoading(true)
    setError(false)
    let cancel;

    const fetchData = async () => {
      try {
        console.log(timeStamp)
        const response =  await axios.get(`/posts/qty/${sortType}/${pageNumber}`,{params: {time: timeStamp}});
        setPosts( (prevPosts) => {
          return ([...prevPosts, ...response.data.posts]);
        });
        setHasMore(response.data.isNext)
        setError(null);
      } catch(err) {
        // if( err.response.data == "No posts found"){
        //   setHasMore(false);
        // }
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [pageNumber, sortType])

  return { loading, error, posts, hasMore }
}
