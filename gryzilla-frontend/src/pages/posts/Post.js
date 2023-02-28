import {React, useState} from "react";
import {BsFillChatLeftTextFill} from "react-icons/bs"
import {BiText} from "react-icons/bi"
import {AiFillWarning} from "react-icons/ai"

import Comments from "./Comments";
import CommentInput from "../../components/CommentInput";
import TextInput from "./InputAddPost";
import InputEditPost from "./InputEditPost";
import InputAddComment from "./InputAddComment";
import DataBar from "../../components/DataBarPost";

export default function Post(props) {

    const postData = props.postData;

    const [commentsLoading, setCommentsLoading] = useState(false);

    const [displayComments, setDisplayComments] = useState(false);
    const [displayCommentInput, setDisplayCommentInput] = useState(false);
    const [displayPostEditor, setDisplayPostEditor] = useState(false);

    const changeDisplayComments = async () => {
        // if(postData.comments > 0)
        setDisplayComments(!displayComments);
    };

    const changeDisplayInput = () => {
        setDisplayCommentInput(!displayCommentInput);
    }

    const changeDisplayEditor = () => {
        setDisplayPostEditor(!displayPostEditor);
    }

    const setNewPostData = (editedPost) => {
        postData.tags = editedPost.tags;
        // if(postData.tags == undefined || postData.tags == null){
        //     postData.tags = [];
        // }
        postData.content = editedPost.content;
        changeDisplayEditor();
    }

    return (
        <div className="content-wrapper">
            
            {!displayPostEditor ? (
                <div className="content-container">
                    <DataBar likes={postData.likes} nick={postData.nick} date={postData.createdAt.replace("T"," ")}/>
                    <hr className="hr-line"/>
                    <span dangerouslySetInnerHTML={{__html: postData.content}}></span>
                    <div className="lower-tag-container">
                        {postData.tags.map((tag, index) => (
                                    <span key={index}>#{tag} </span>
                            ))
                        }
                    </div>
                </div>
                ):(
                    <InputEditPost
                        setNewPostData={setNewPostData}
                        postData={postData}
                    /> 
                )
            }

            <div className="widget-box">
                <button type="button" onClick={changeDisplayComments} className={"btn action-button " + (displayComments ? "btn-success" : "btn-outline-success")}>{postData.comments} <BsFillChatLeftTextFill/></button>
                <button type="button" onClick={changeDisplayInput} className={"btn action-button " + (displayCommentInput ? "btn-primary" : "btn-outline-primary")}><BiText/></button>
                <button type="button" className="btn btn-outline-warning action-button"><AiFillWarning/></button>
                <button type="button" onClick={changeDisplayEditor} className="btn btn-outline-warning action-button">Edit</button>
            </div>          

            {displayComments && 
                <Comments
                    idPost={postData.idPost}
                    displayCommentInput={displayCommentInput}
                    setDisplayCommentInput={setDisplayCommentInput}
                />
            }

        </div>
    );
}