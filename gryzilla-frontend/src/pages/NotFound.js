import { React, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<Container className="main-panel">
			<div className="d-flex justify-content-between">
				<h3>404 Nie znaleziono strony</h3>
			</div>
			<div className="content-container">
				Strona o tym adresie nie została znaleziona.<br></br>
				Kliknij{" "}
				<Link to="/">
					<span style={{ color: "#71CFE2", textDecoration: "underline" }}>
						tutaj
					</span>
				</Link>{" "}
				aby wrócić na stronę główną, lub zacznij przeglądać{" "}
				<Link to="/posts">
					<span style={{ color: "#71CFE2", textDecoration: "underline" }}>
						posty
					</span>
				</Link>
				.
			</div>
		</Container>
	);
}
