import { Container } from "react-bootstrap";
import ArticleHit from "./ArticleHit";
import PostHit from "./PostHit";
import useViewport from "../../hooks/useViewport";
import { useEffect } from "react";

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

import { AiOutlineMenu } from "react-icons/ai";

import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";

export default function RightColumn() {
	const { width } = useViewport();
	const breakpoint = 1400;

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			{width >= breakpoint ? (
				<>
					<PostHit />
					<ArticleHit />
				</>
			) : (
				<div
					className="d-flex justify-content-end pb"
					style={{ height: "0px" }}
				>
					<Offcanvas
						className="off-canvas"
						show={show}
						scroll={false}
						backdrop={true}
						placement={"end"}
						onHide={handleClose}
					>
						{/* <Offcanvas.Header closeButton>
							<Offcanvas.Title>Offcanvas</Offcanvas.Title>
						</Offcanvas.Header>
						<Offcanvas.Body>
							Some text as placeholder. In real life you can have the elements
							you have chosen. Like, text, images, lists, etc.
						</Offcanvas.Body> */}
						<Button variant="primary" onClick={handleClose}>
							X
						</Button>

						<PostHit />
						<ArticleHit />
					</Offcanvas>

					<Button
						className="button-sidebar"
						variant="primary"
						onClick={handleShow}
					>
						<AiOutlineMenu />
					</Button>
				</div>
			)}
		</>
	);
}
