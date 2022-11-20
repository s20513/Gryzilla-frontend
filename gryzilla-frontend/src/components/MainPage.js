import {Container} from 'react-bootstrap';
import Post from './Post';

export default function MainPage() {
    return (
        <Container className="MainPage" bg="red">
            <h2>Wszystkie posty</h2>
            <Post></Post>
            <Post></Post>
            <Post></Post>
            
        </Container>
    );
}