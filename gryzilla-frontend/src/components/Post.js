import {React, useState} from "react";
import {BsFillChatLeftTextFill} from "react-icons/bs"
import {BiText} from "react-icons/bi"
import {AiFillWarning} from "react-icons/ai"

import Comments from "./Comments";
import CommentInput from "./CommentInput";

export default function Post(props) {

    const postData = props.postData;
    const indexNumber = (props.indexNumber + 0.3) * 0.6;

    const [commentsLoading, setCommentsLoading] = useState(false);
    const [displayComments, setDisplayComments] = useState(false);
    const [displayInput, setDisplayInput] = useState(false);

    const changeDisplayComments = async () => {
        if(postData.comments > 0)
            setDisplayComments(!displayComments);
    };

    const changeDisplayInput = () => {
        setDisplayInput(!displayInput);
    }

    return (
        <div className="data-container" style={{animationDuration : indexNumber + "s"}}>
            <div className="post-wrapper">
                <div className="upper-data-container">
                    <span className="likes-count">+{postData.likes}</span>
                    <span className="user-nick">{postData.nick}</span>
                    <span className="timestamp">{postData.createdAt.replace("T"," ")}</span>
                    <hr className="hr-line"/>
                    <span>{postData.content}</span>
                </div>
                
                <div className="lower-tag-container">
                    {postData.tags.map((tag) => (
                                <span>#{tag.nameTag} </span>
                        ))
                    }
                </div>
            </div>


            {/* <div className="d-flex .justify-content-center .align-items-center"> */}
            <div className="widget-box">
                <button type="button" title="coś tam" onClick={changeDisplayComments} class="btn btn-outline-success action-button">Komentarze {postData.comments} <BsFillChatLeftTextFill/></button>
                <button type="button" onClick={changeDisplayInput} class="btn btn-outline-primary action-button">Odpowiedz <BiText/></button>
                <button type="button" class="btn btn-outline-warning action-button">Uwagi <AiFillWarning/></button>
                {/* <div onClick={changeDisplayComments} className={'' + ( displayComments ? 'comment-icon-enable' : 'comment-icon-disable' )}>
                        {!commentsLoading ?  <>{postData.comments} <BsFillChatLeftTextFill/></> : (<div class="lds-dual-ring"></div>) }
                </div> */}
            </div>

            {displayInput && <CommentInput/>}           

            <div className="comments-wrapper">
                <div className="comments-vertical-line"></div>
                <div>
                    {displayComments && <Comments idPost={postData.idPost} onChangeLoading={setCommentsLoading}></Comments>}
                </div>
            </div>
            
            
        </div>
    );
}