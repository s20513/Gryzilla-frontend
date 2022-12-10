import { Profiler } from "react";
import { Container } from "react-bootstrap";

export default function Profile() {
    return (
        <Container className="column-container">
            <Container className="d-flex justify-content-between">
                <h2>Mój profil</h2>
            </Container>
            <img 
                    className="profile-img"
                    src="https://picsum.photos/250"
                    alt="profile picture"
                />
        </Container>
    );
}