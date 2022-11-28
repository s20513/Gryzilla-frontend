import {React, useEffect, useState} from 'react';

export default function Comments(props) {

    const {idPost} = props;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`https://192.168.0.221:1337/api/posts/one/` + idPost)
         .then((response) => response.json())
         .then((data) => {
            setData(data);
            setError(null);
         })
         .catch((err) => {
            setError(err.message);
            setData(null);
         })
         .finally(() => {
            setLoading(false);
         });
       }, []);

       console.log(data);

       return (
        <>
            {data && data.comments.map((comment) => (
                <div className="upper-data-container">{comment.description}</div>
            ))}
        </>
       );


}