import React from "react";
import DataBar from "../../components/DataBarPost";
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import LikeButton from "../../components/LikeButton";
import { DbDateConvert } from "../../utils/DataUtlis";

export default function ArticlePreview({idArticle, title, content, nick, date, likes}){
    const dateReady = DbDateConvert(date);

    return (
        <div className="content-container">
            <div className="data-bar">
                <LikeButton likesNum={likes} id={idArticle} url={"likesArticle"}/>
                <Nav.Link as={Link} to={"" + idArticle} className="article-title">{title}</Nav.Link>
            </div>
            <span className="article-label">Artykuł użytkownika {nick}, utworzono {dateReady.time} {dateReady.date}</span>
            {/* <hr className="hr-line"/> */}
            <div>
                <div className="text-fade-out">{content}</div>
            </div>
        </div>
    );
}