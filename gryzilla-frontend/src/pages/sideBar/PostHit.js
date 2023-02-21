import {React, useEffect, useState} from "react";
import {BsFillChatLeftTextFill} from "react-icons/bs"
import {BiText} from "react-icons/bi"
import {AiFillWarning} from "react-icons/ai"
import useAxios from "../../hooks/useAxios";
import { Container } from "react-bootstrap";
import Post from "../posts/Post";

import Comments from "../../components/Comments";
import CommentInput from "../../components/CommentInput";

export default function PostHit() {

    const [posts, errorPosts, loadingPosts] = useAxios({method: 'GET',url: `posts/top`,headers: {accept: '*/*'},
    });

    useEffect(()=>{
        console.log(posts)
    },[posts])

    return (
        <Container className="main-panel">
                <h3>Popularne posty</h3>
                <div className="top-three">
                {posts && 
                        posts.map((post, index) => {
                            return (<div className="content-container content-wrapper">
                                        <span className="likes-count">+{post.likes} </span>
                                        <span className="user-nick">{post.nick}</span><br/>
                                        {post.content.substring(0,120) + "..."}
                                    </div>)
                        })
                     }
                </div>
        </Container>
    );
}