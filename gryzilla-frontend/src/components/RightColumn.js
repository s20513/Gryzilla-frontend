import {Container} from 'react-bootstrap';

export default function MainPage() {
    return (
        <>
            <Container className="column-container">
                <h3>Znajomi</h3>
            </Container>
            <Container className="column-container">
                <h3>Hity</h3>
            </Container>
            <Container className="column-container">
                <h3>Top posty</h3>
            </Container>
        </>
    );
}
