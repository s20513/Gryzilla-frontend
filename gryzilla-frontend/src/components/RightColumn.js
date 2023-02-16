import {Container} from 'react-bootstrap';
import ArticleHit from './Posts/ArticleHit';
import PostHit from './Posts/PostHit';

export default function MainPage() {
    return (
        <>
            <PostHit/>
            <ArticleHit/>
            <Container className="main-panel">
                <h3>Hity</h3>
            </Container>
            <Container className="main-panel">
                <h3>Top posty</h3>
            </Container>
        </>
    );
}
