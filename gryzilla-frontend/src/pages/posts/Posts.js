import axios from "axios";
import { useState, useEffect, useRef, useCallback } from "react";
import { Container, Dropdown } from "react-bootstrap";
import useFetchPosts from "../../hooks/useFetchPosts";
import LoadingBanner from "../../components/LoadingBanner";
import Post from "./Post";
import InputAddPost from "./InputAddPost";
import InputMockup from "../../components/InputMockup";
import DropdownList from "../../components/DropdownList";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function Posts() {
	const [sortType, setSortType] = useLocalStorage("sortType", "byDateDesc");

	const [showInput, setShowInput] = useState(false);
	const [pageNumber, setPageNumber] = useState(5);

	const [newPosts, setNewPosts] = useState([]);
	const { posts, hasMore, loading, error } = useFetchPosts(
		sortType,
		pageNumber
	);

	const addNewPost = (newPost) => {
		setNewPosts(newPost);
		setShowInput(false);
	};

	const changeSortType = (sortType) => {
		setPageNumber(5);
		setSortType(sortType);
	};

	const observer = useRef();
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
		<Container className="main-panel">
			<div className="d-flex justify-content-between">
				<h3>Wszystkie posty</h3>
				<DropdownList sortType={sortType} setSortType={changeSortType} />
			</div>

			{!showInput ? (
				<InputMockup
					handleClick={() => {
						setShowInput(true);
					}}
					placeHolder={"Dodaj nowy post..."}
				/>
			) : (
				<InputAddPost
					addNew={addNewPost}
					url={'posts'}
					method={'POST'}
					apiData={ {idUser: 6} }
					enableTags={true}
					placeHolder={"Wprowadz nowy post..."}
				/>
			)}

			{posts &&
				newPosts.concat(posts).map((post) => {
					return <Post key={post.idPost} postData={post}></Post>;
				})}

			{!loading && <div ref={lastPostRef}></div>}

			<LoadingBanner
                loading={loading}
                error={error}
				placeHolder={"Ładowanie postów"}
			/>
		</Container>
	);
}
