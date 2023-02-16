import {React, useEffect, useState} from "react";
import {BsFillChatLeftTextFill} from "react-icons/bs"
import {BiText} from "react-icons/bi"
import {AiFillWarning} from "react-icons/ai"
import useAxios from "../../hooks/useAxios";
import { Container } from "react-bootstrap";
import Post from "./Post";

import Comments from "./Comments";
import CommentInput from "./CommentInput";

export default function ArticleHit() {

    const [posts, errorPosts, loadingPosts] = useAxios({method: 'GET',url: `posts`,headers: {accept: '*/*'},
    });

    useEffect(()=>{
        console.log(posts)
    },[posts])

    return (
        <Container className="main-panel">
                <h3>Najlepsze artykuły</h3>
                {posts && 
                        posts.map((post, index) => {
                            if(index < 3)
                                return <div className="content-container">{post.title}</div>
                        })
                     }
        </Container>
    );
}