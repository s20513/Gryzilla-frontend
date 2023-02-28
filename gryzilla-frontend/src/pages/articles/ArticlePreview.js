import React from "react";
import DataBar from "../../components/DataBarPost";
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

export default function ArticlePreview({idArticle, title, content, nick, date, likes}){

    return (
        <div className="content-container">
            <div className="d-flex">
                <div className="likes-box">
                    <span>+{likes}</span>
                </div>
                <Nav.Link as={Link} to={"10"} className="article-title">{title}</Nav.Link>
            </div>
            <span className="article-label">Artykuł użytkownika {nick}, utworzono {date}</span>
            {/* <hr className="hr-line"/> */}
            <div>
                <div className="text-fade-out">{content}</div>
            </div>
        </div>
    );
}