import { React, useState } from "react";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { BiText } from "react-icons/bi";
import { AiFillWarning } from "react-icons/ai";

import PostComments from "../PostComments";
import DataBar from "../../../components/DataBarPost";
import ContentInput from "../../../components/Editor/ContentInput";
import { Link } from "react-router-dom";
import { Button, Nav } from "react-bootstrap";
import { DbDateConvert } from "../../../utils/DataUtlis";
import { Dropdown } from "react-bootstrap";
import ReportModal from "../../../components/ReportModal";
import LikeButton from "../../../components/LikeButton";
import { MdThumbUp } from "react-icons/md";

export default function WidgetButtons({
	handleComments,
	handleEdit,
	handleDelete,
	commentsNumber,
	idPost,
	showDetailsButton,
	likes,
	url
}) {
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
			

			<Dropdown align="start">
				<Dropdown.Toggle className="widget-button" id="dropdown-basic">
					Opcje
				</Dropdown.Toggle>

				<Dropdown.Menu className="dropdown-menu-right dropdown-menu-dark">
					<Dropdown.Item onClick={handleEdit}>Edytuj</Dropdown.Item>

					<Dropdown.Item>Dodaj do ulubionych</Dropdown.Item>

					{showDetailsButton && (
						<Dropdown.Item as={Link} to={"" + idPost}>
							Widok w nowym oknie
						</Dropdown.Item>
					)}

					<Dropdown.Item onClick={handleDelete}>Usuń</Dropdown.Item>

					<Dropdown.Item>
						<ReportModal
							url="/reportPost"
							reportedContentId={{ idPost: idPost }}
						/>
					</Dropdown.Item>

					<Dropdown.Item>Info: Id-{idPost}</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>

			{/* <button
				type="button"
				onClick={handleEdit}
				className="widget-button"
			>
				Opcje
			</button> */}
		</div>
	);
}
