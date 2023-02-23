import {React, useState} from "react";
import {BsFillChatLeftTextFill} from "react-icons/bs"
import {BiText} from "react-icons/bi"
import {AiFillWarning} from "react-icons/ai"

import Comments from "../../components/Comments";
import CommentInput from "../../components/CommentInput";
import TextInput from "../../components/TextInput";
import EditPostInput from "../profile/EditPostInput";

export default function Post(props) {

    let postData = props.postData;

    const [commentsLoading, setCommentsLoading] = useState(false);
    const [displayComments, setDisplayComments] = useState(false);
    const [displayInput, setDisplayInput] = useState(false);
    const [displayEditor, setDisplayEditor] = useState(false);

    const changeDisplayComments = async () => {
        if(postData.comments > 0)
            setDisplayComments(!displayComments);
    };

    const changeDisplayInput = () => {
        setDisplayInput(!displayInput);
    }

    const changeDisplayEditor = () => {
        setDisplayEditor(!displayEditor);
    }

    const setNewPostData = (editedPost) => {
        postData.tags = editedPost.tags;
        postData.content = editedPost.content;
        changeDisplayEditor();
    }

    return (
        <div className="content-wrapper">
            {!displayEditor &&
                <div className="content-container">
                    <span>ID {postData.idPost}</span>
                    <span className="likes-count">+{postData.likes}</span>
                    <span className="user-nick">{postData.nick}</span>
                    <span className="timestamp">{postData.createdAt.replace("T"," ")}</span>
                    <hr className="hr-line"/>

                    <span dangerouslySetInnerHTML={{__html: postData.content}}></span>
                    
                    <div className="lower-tag-container">
                        {postData.tags.map((tag, index) => (
                                    <span key={index}>#{tag} </span>
                            ))
                        }
                    </div>
                </div>}

            {displayEditor &&
                <EditPostInput setNewPostData={setNewPostData} postData={postData}/>}


            {/* <div className="d-flex .justify-content-center .align-items-center"> */}
            <div className="widget-box">
                <button type="button" onClick={changeDisplayComments} className={"btn action-button " + (displayComments ? "btn-success" : "btn-outline-success")}>{postData.comments} <BsFillChatLeftTextFill/></button>
                <button type="button" onClick={changeDisplayInput} className={"btn action-button " + (displayInput ? "btn-primary" : "btn-outline-primary")}><BiText/></button>
                <button type="button" className="btn btn-outline-warning action-button"><AiFillWarning/></button>
                <button type="button" onClick={changeDisplayEditor} className="btn btn-outline-warning action-button">Edit</button>
                {/* <div onClick={changeDisplayComments} className={'' + ( displayComments ? 'comment-icon-enable' : 'comment-icon-disable' )}>
                        {!commentsLoading ?  <>{postData.comments} <BsFillChatLeftTextFill/></> : (<div class="lds-dual-ring"></div>) }
                </div> */}
            </div>
            
            <div className="mx-3">
                {displayInput && <TextInput>Wprowadź komentarz</TextInput>} 
            </div>
            
            {commentsLoading && 
                <div className="loading-block">
                    Ładowanie komentarzy...
                </div>}          

            {displayComments && <Comments idPost={postData.idPost} onChangeLoading={setCommentsLoading}></Comments>}

        </div>
    );
}