import {React, useState} from "react";
import {BsFillChatLeftTextFill} from "react-icons/bs"
import {AiFillWarning} from "react-icons/ai"
import {Button} from 'react-bootstrap';
import Comments from "./Comments";

export default function Post(props) {

    const postData = props.postData;
    const indexNumber = (props.indexNumber + 0.3) * 0.6;

    const [commentsLoading, setCommentsLoading] = useState(false);
    const [displayComments, setDisplayComments] = useState(false);

    const changeDisplayComments = async () => {
        if(postData.comments > 0)
            setDisplayComments(!displayComments);
    };

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
                <div onClick={changeDisplayComments} className={'' + ( displayComments ? 'comment-icon-enable' : 'comment-icon-disable' )}>
                        {!commentsLoading ?  <>{postData.comments} <BsFillChatLeftTextFill/></> : (<div class="lds-dual-ring"></div>) }
                </div>
                <div onClick={changeDisplayComments} className="comment-icon">
                       xd
                </div>
                <div onClick={changeDisplayComments} className={'' + ( displayComments ? 'comment-icon-enable' : 'comment-icon-disable' )}>
                       xd
                </div>
            </div>
            
            {displayComments && <Comments idPost={postData.idPost} onChangeLoading={setCommentsLoading}></Comments>}
        </div>
    );
}