import axios from 'axios';
import {React, useEffect, useState} from 'react';

export default function Comments(props) {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const idPost = props.idPost;
    const commentsLoding = props.onChangeLoading;
    commentsLoding(loading);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`/posts/${idPost}`);
            setData(response.data);
            setError(null);
        } catch(err) {
            setError(err.message);
            setData(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
       }, []);

       return (
        <>
            {data && data.comments.map((comment) => (
                <div className="comment-data-container">
                    <span className="user-nick">{comment.nick}</span>
                    <br/>
                    {comment.description}
                </div>
            ))}
        </>
       );


}