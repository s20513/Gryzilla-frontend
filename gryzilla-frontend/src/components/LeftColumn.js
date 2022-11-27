import {useState, useEffect} from "react";
import {Container} from 'react-bootstrap';
import Post from './Post';

export default function LeftColumn() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://192.168.0.221:1337/api/posts`)
         .then((response) => console.log(response));
       }, []);

    console.log("test");

    return (
        <Container className="column-container">
            <h2>Wszystkie posty</h2>
            <Post></Post>
            <Post></Post>
            <Post></Post>
        </Container>
    );
}
