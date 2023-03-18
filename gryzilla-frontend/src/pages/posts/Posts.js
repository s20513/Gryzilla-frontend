import axios from "axios";
import { useState, useEffect, useRef, useCallback } from "react";
import { Container, Dropdown } from "react-bootstrap";
import useFetchPosts from "../../hooks/useFetchPosts";
import LoadingBanner from "../../components/LoadingBanner";
import Post from "./Post";

import ContentInput from "../../components/Editor/ContentInput";
import InputMockup from "../../components/InputMockup";
import DropdownList from "../../components/DropdownList";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Link } from "react-router-dom";
import { useNavbar } from "../../context/NavbarContext";
import { useAuth } from "../../context/AuthContext";


export default function Posts(props) {
	const navigation = useNavbar();
	const auth = useAuth();

	const [sortType, setSortType] = useLocalStorage("sortType", "byDateDesc");

	// const [showInput, setShowInput] = useState(navigation.showInput);
	const [pageNumber, setPageNumber] = useState(5);

	const [newPosts, setNewPosts] = useState(null);
	const { posts, hasMore, loading, error } = useFetchPosts(
		sortType,
		pageNumber
	);

	const addNewPost = (newPost) => {
		setNewPosts(newPost);
		navigation.setShowInput(false);
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
			
			{ !navigation.showInput ? (
				<InputMockup
					handleClick={() => navigation.setShowInput(true)}
					placeHolder={"Dodaj nowy post..."}
				/>
			) : (
				<ContentInput
					addNew={addNewPost}
					url={'posts'}
					method={'POST'}
					apiData={{}}
					enableTags={true}
					placeHolder={"Wprowadz nowy post..."}
					handleClose={navigation.setShowInput(false)}
				/>
			)}

			{newPosts && 
				<div className="content-container"><Link to={`/posts/${newPosts[0].idPost}`}>Dodano nowy post, sprawdź tutaj...</Link></div>}

			{posts &&
				posts.map((post) => {
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
