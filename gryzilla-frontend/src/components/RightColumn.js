import {Container} from 'react-bootstrap';

export default function MainPage() {
    return (
        <>
            <Container className="column-container">
                <h2>Znajomi</h2>
            </Container>
            <Container className="column-container">
                <h2>Hity</h2>
            </Container>
            <Container className="column-container">
                <h2>Top posty</h2>
            </Container>
        </>
    );
}
