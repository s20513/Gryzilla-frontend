import { React, useEffect, useState } from "react";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { BiText } from "react-icons/bi";
import { AiFillWarning } from "react-icons/ai";
import useAxios from "../../hooks/useAxios";
import { Container } from "react-bootstrap";
import Post from "../posts/Post";
import LikeButton from "../../components/LikeButton";
import { DbDateConvert } from "../../utils/DataUtlis";
import DataBar from "../../components/DataBarPost";
import Skeleton from "react-loading-skeleton";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LoadingBlock from "../../components/LoadingBlock";

export default function PostHit() {
	const [posts, errorPosts, loadingPosts] = useAxios({
		method: "GET",
		url: `/posts/top`,
		headers: { accept: "*/*" },
	});

	return (
		<Container className="main-panel">
			<h3>Popularne posty</h3>

			{/* <div className="content-container">
				<div style={{ height: "32px" }}></div>
				<hr className="hr-line" />
				<div style={{ height: "70px" }}></div>
			</div> */}

			<div className="top-three">
				{!posts && <LoadingBlock blocksNum={3} topSize="25px" bottomLines={3} hrLine={true}/>}

				{posts &&
					posts.map((post, index) => {
						return (
							<div key={index} className="content-container content-wrapper">
								{/* <span className="likes-count">+{post.likes} </span> */}
								<DataBar
									
									idPost={post.idPost}
									likes={post.likes}
									nick={post.nick}
									date={DbDateConvert(post.createdAt)}
								/>
								<hr className="hr-line" />
								<div
									className="text-fade-out"
									dangerouslySetInnerHTML={{ __html: post.content }}
								></div>
							</div>
						);
					})}
			</div>
		</Container>
	);
}
