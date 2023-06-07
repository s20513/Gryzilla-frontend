import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import ChangePasswordModal from "./components/ChangePasswordModal";
import { useAuth } from "../../context/AuthContext";
import ChangeDetailsModal from "./components/ChangeDetailsModal";

export default function ProfilePanel() {
	const auth = useAuth();
	const [showChangePassModal, setShowChangePassModal] = useState(false);
	const [showChangeDetailsModal, setShowChangeDetailsModal] = useState(false);

	return (
		<Container className="main-panel">
			<Container className="d-flex justify-content-between">
				<h2>Panel użytkownika {auth.nick}</h2>
			</Container>

			<div className="content-container">
				<h4>Zmiana hasła</h4>

				<Button onClick={() => setShowChangePassModal(true)}>
					Kliknij tutaj aby zmienić hasło
				</Button>
				<ChangePasswordModal
					show={showChangePassModal}
					setShow={setShowChangePassModal}
				/>
			</div>

			<div className="content-container">
				<h4>Zmiana danych konta</h4>
				<Button onClick={() => setShowChangeDetailsModal(true)}>
					Kliknij tutaj aby zmienić dane konta
				</Button>
				<ChangeDetailsModal
					show={showChangeDetailsModal}
					setShow={setShowChangeDetailsModal}
				/>
			</div>
		</Container>
	);
}
