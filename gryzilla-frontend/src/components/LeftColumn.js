import axios from 'axios';
import {useState, useEffect, useRef, useCallback } from "react";
import {Container, Dropdown} from 'react-bootstrap';
import useFetchPosts from '../hooks/useFetchPosts';
import Post from './Posts/Post';
import PostInput from './Posts/PostInput';


export default function LeftColumn() {
    //const [data, setData] = useState(null);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    const [sortType, setSortType] = useState(() => {
        const savedSortType = localStorage.getItem('sortType');
        return savedSortType || "byDateDesc";
    });

    const [pageNumber, setPageNumber] = useState(5);

    const {
        posts,
        hasMore,
        loading,
        error
      } = useFetchPosts(sortType, pageNumber);

      const observer = useRef()
      const lastPostRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting && hasMore) {
            console.log("jest wiecej")
            setPageNumber(prevPageNumber => prevPageNumber + 5)
          }
        })
        if (node) observer.current.observe(node)
      }, [loading, hasMore])


    useEffect(() => {
        localStorage.setItem('sortType', sortType);
        //setPageNumber(5);
    }, [sortType]);

    return (
        <Container className="main-panel">
            <Container className="d-flex justify-content-between">
                <h3>Wszystkie posty</h3>
                <Dropdown align="end">
                    <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
                        Sortuj
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="dropdown-menu-right dropdown-menu-dark">
                        <Dropdown.Item
                            onClick={() => {setSortType('byDateDesc')}}
                            active={sortType === "byDateDesc" ? true : false}
                            href="#/action-2">
                            Najnowsze
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => {setSortType("byDateAsc")}}
                            active={sortType === "byDateAsc" ? true : false}
                            href="#/action-3">
                            Najstarsze
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => {setSortType('byLikesDesc')}}
                            active={sortType === "byLikesDesc" ? true : false}
                            href="#/action-1">
                            Najpopularniejsze
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => {setSortType("byCommentsDesc")}}
                            active={sortType === "byCommentsDesc" ? true : false}
                            href="#/action-3">
                            Najwięcej komentarzy
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Container>

            <PostInput></PostInput>
            
            {posts && 
                posts.map((post, index) => {
                    if( index + 1== posts.length){
                        return <Post key={post.idPost} postData={post} indexNumber={index}></Post>
                    } else {
                        return <Post key={post.idPost} postData={post} indexNumber={index}></Post>
                    }
                })
            }

            {!loading && <div ref={lastPostRef}></div>}

            {loading && 
                <div className="loading-block">
                    Ładowanie postów...
                </div>}

            {error && 
                <div className="error-loading">
                    {error}
                </div>}
        </Container>
    );
}
