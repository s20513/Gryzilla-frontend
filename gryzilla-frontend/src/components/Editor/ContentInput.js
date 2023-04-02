import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import useAxios from "../../hooks/useAxios";
import Tag from "./Tag";

import { AiFillWarning, AiOutlinePicture } from "react-icons/ai";
import { BsTypeBold, BsTypeItalic } from "react-icons/bs";
import { GrBlockQuote } from "react-icons/gr";
import { MdFormatListBulleted, MdEmojiEmotions } from "react-icons/md";
import { FiAlertCircle } from "react-icons/fi";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../assets/Editor.scss";
import { Container } from "react-bootstrap";
import TextEditor from "./TextEditor";
import { useAuth } from "../../context/AuthContext";
import { useNavbar } from "../../context/NavbarContext";

export default function ContentInput(props) {
	const postData = props.initialContent;
	const textPlaceHolder = props.placeHolder;
	const url = props.url;
	const enableTags = props.enableTags;
	const enableTitle = props.enableTitle;
	const apiData = props.apiData;
	const method = props.method;
	const contentAtributeName = props.atrName ? props.atrName : "content";
	const auth = useAuth();
	const navbar = useNavbar();

	const scrollRef = useRef(null);

	const [showInput, setShowInput] = useState(false);

	const [title, setTitle] = useState("");

	const childTextContentRef = useRef();
	const childTagsRef = useRef();

	const [newContent, error, loading, runRequest] = useAxios({
		method: method,
		url: url,
		headers: { accept: "*/*" },
	});

	// useEffect(() => {
	// 	scrollRef.current.scrollIntoView();
	// }, []);

	//po otrzymaniu wartości z bazy
	useEffect(() => {
		if (newContent != undefined && newContent != null)
			props.addNew([newContent]);
	}, [newContent]);

	const handleSubmit = (event) => {
		console.log("submit");
		event.preventDefault();
		runRequest({
			data: {
				idUser: auth.id,
				...apiData,
				[contentAtributeName]: childTextContentRef.current.getPostContent(),
				...(enableTags && { tags: childTagsRef.current.getPostTags() }),
				...(enableTitle && { title: title }),
			},
		});
	};

	return (
		<div className="content-wrapper" ref={scrollRef}>
			<div className="content-container">
				<form onSubmit={handleSubmit}>
					{enableTitle && (
						<input
							className="article-title-input"
							type="text"
							id="fname"
							name="fname"
							placeholder="Wprowadz tytuł artykuły.."
							onChange={(e) => setTitle(e.target.value)}
						/>
					)}

					<TextEditor
						initialContent={postData ? postData.content : undefined}
						ref={childTextContentRef}
					/>

					{enableTags && (
						<div style={{ marginTop: "8px" }}>
							<Tag
								initialContent={postData ? postData.tags : undefined}
								ref={childTagsRef}
							/>
						</div>
					)}
					<hr className="hr-line" />
					<div className="d-flex justify-content-center gap-2 mt-2">
						<button
							className="widget-button"
							type="button"
							onClick={() => props.handleClose()}
						>
							Zamknij
						</button>
						<button className="widget-button" type="submit">
							Wyślij post
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
