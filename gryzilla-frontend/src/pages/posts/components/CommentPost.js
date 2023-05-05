import { useState } from "react";
import Comment from "../../../components/Comment";
import { Button } from "react-bootstrap";
import ContentInput from "../../../components/Editor/ContentInput";
import { Dropdown } from "react-bootstrap";
import ReportModal from "../../../components/ReportModal";

export default function CommentPost({ commentData }) {
	const [displayEditor, setDisplayEditor] = useState(false);

	const [showReportModal, setShowReportModal] = useState(false);

	const changeDisplayEditor = () => {
		setDisplayEditor((prev) => !prev);
	};

	const setNewPostData = (data) => {
		commentData.content = data.content;
		setDisplayEditor(false);
	};

	return (
		<>
			{!displayEditor ? (
				<>
					<Comment
						avatar={null}
						nick={commentData.nick}
						createdAt={commentData.createdAt}
						content={commentData.content}
					/>
					<Dropdown align="start">
						<Dropdown.Toggle
							className="widget-button-comment"
							id="dropdown-basic"
						>
							opcje
						</Dropdown.Toggle>

						<Dropdown.Menu className="dropdown-menu-right dropdown-menu-dark">
							<Dropdown.Item onClick={changeDisplayEditor}>
								Edytuj
							</Dropdown.Item>
							<Dropdown.Item>Usuń</Dropdown.Item>
							<Dropdown.Item onClick={()=>setShowReportModal(true)}>Zgłoś</Dropdown.Item>
							{/* <Dropdown.Item>
						<ReportModal
							url="/reportPost"
							reportedContentId={{ idPost: idPost }}
						/>
					</Dropdown.Item> */}
						</Dropdown.Menu>
					</Dropdown>
				</>
			) : (
				<ContentInput
					initialContent={commentData}
					addNew={setNewPostData}
					url={`/posts/comment/${commentData.idComment}`}
					method={"PUT"}
					apiData={{
						idPost: commentData.idPost,
						idComment: commentData.idComment,
					}}
					enableTags={false}
					placeHolder={"Wprowadz nowy post..."}
					handleClose={changeDisplayEditor}
				/>
			)}

			<ReportModal
				show={showReportModal}
				setShow={setShowReportModal}
				url={`/reportCommentPost`}
				reportedContentId={{idComment: commentData.idComment}}
			/>
		</>
	);
}
