import axios from 'axios';
import {useState, useEffect, useRef, useCallback } from "react";
import {Container, Dropdown} from 'react-bootstrap';
import useFetchPosts from '../../hooks/useFetchPosts';
import LoadingBanner from '../../components/LoadingBanner';
import Post from './Post';
import TextInput from './InputAddPost';


export default function LeftColumn() {
    const [showInput, setShowInput] = useState(false);
    const [newPosts, setNewPosts] = useState(null);

    const [sortType, setSortType] = useState(() => {
        const savedSortType = localStorage.getItem('sortType');
        return savedSortType || "byDateDesc";
    });

    const [pageNumber, setPageNumber] = useState(5);

    const addNewPost = (newPost) => {
        setNewPosts(newPost);
        setShowInput(false);
    };

    const changeSortType = (sortType) => {
        setPageNumber(5);
        setSortType(sortType);
    }

    useEffect(() => {
        localStorage.setItem('sortType', sortType);
    }, [sortType]);

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
            setPageNumber(prevPageNumber => prevPageNumber + 5)
          }
        })
        if (node) observer.current.observe(node)
        }, [loading, hasMore])

    
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
                            onClick={() => {changeSortType('byDateDesc')}}
                            active={sortType === "byDateDesc" ? true : false}
                            href="#/action-2">
                            Najnowsze
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => {changeSortType("byDateAsc")}}
                            active={sortType === "byDateAsc" ? true : false}
                            href="#/action-3">
                            Najstarsze
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => {changeSortType('byLikesDesc')}}
                            active={sortType === "byLikesDesc" ? true : false}
                            href="#/action-1">
                            Najpopularniejsze
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => {changeSortType("byCommentsDesc")}}
                            active={sortType === "byCommentsDesc" ? true : false}
                            href="#/action-3">
                            Najwięcej komentarzy
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Container>

            {!showInput && <div className="content-container" onClick={() => setShowInput(true)}>Wprowadz nowego posta...</div>}

            {showInput && <TextInput addNew={addNewPost}>Wprowadź nowy post...</TextInput>}

            {newPosts && 
                newPosts.map((post) => {
                    return <Post key={post.idPost} postData={post}></Post>
                })
            }
            
            {posts && 
                posts.map((post) => {
                    return <Post key={post.idPost} postData={post}></Post>
                })
            }

            {!loading && <div ref={lastPostRef}></div>}
            
            <LoadingBanner
                loading={loading}
                error={error}>
                    Ładowanie postów...
            </LoadingBanner>
           
        </Container>
    );
}
