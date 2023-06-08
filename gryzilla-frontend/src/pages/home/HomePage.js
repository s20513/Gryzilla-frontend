import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function HomePage() {

	const navigate = useNavigate();

	useEffect(() => {
		navigate("/posts");
	})

	return (
		<Container className="main-panel">
			<div className="d-flex justify-content-between">
				<h3>Przekierowanie na stronę główną...</h3>
			</div>
		</Container>
	);
}
