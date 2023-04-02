import {Container} from 'react-bootstrap';
import ArticleHit from './ArticleHit';
import PostHit from './PostHit';

export default function RightColumn() {
    return (
        <>
            <PostHit/>
            <ArticleHit/>
            {/* <Container className="main-panel">
                <h3>Hity</h3>
            </Container>
            <Container className="main-panel">
                <h3>Top posty</h3>
            </Container> */}
        </>
    );
}
