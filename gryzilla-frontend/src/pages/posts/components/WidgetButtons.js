import { React, useState } from "react";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { BiText } from "react-icons/bi";
import { AiFillWarning } from "react-icons/ai";

import PostComments from "../PostComments";
import DataBar from "../../../components/DataBarPost";
import ContentInput from "../../../components/Editor/ContentInput";
import { Link, useNavigate } from "react-router-dom";
import { Button, Nav } from "react-bootstrap";
import { DbDateConvert } from "../../../utils/DataUtlis";
import { Dropdown } from "react-bootstrap";
import ReportModal from "../../../components/modals/ReportModal";
import LikeButton from "../../../components/LikeButton";
import { MdThumbUp } from "react-icons/md";
import OptionDropdown from "../../../components/OptionDropdown";

export default function WidgetButtons({
	handleComments,
	handleEdit,
	handleDelete,
	handleReport,
	commentsNumber,
	idPost,
	showDetailsButton,
	likes,
	url,
	owner
}) {

	const navigate = useNavigate();
	return (
		<div className="widget-box">
			
			<LikeButton
				likesNum={likes}
				id={idPost}
				url={"likesPost"}
			/>

			<Button type="button" onClick={handleComments} className="widget-button">
				<BsFillChatLeftTextFill /> {commentsNumber} 
			</Button>

			<OptionDropdown
				handleNewView={() => navigate(`/posts/${idPost}`)}
				handleEdit={handleEdit}
				handleDelete={handleDelete}
				handleReport={handleReport}
				upper={true}
				owner={owner}
			/>
		</div>
	);
}
