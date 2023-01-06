import {Container} from 'react-bootstrap';

export default function MainPage() {
    return (
        <>
            <Container className="main-panel">
                <h3>Znajomi</h3>
            </Container>
            <Container className="main-panel">
                <h3>Hity</h3>
            </Container>
            <Container className="main-panel">
                <h3>Top posty</h3>
            </Container>
        </>
    );
}
