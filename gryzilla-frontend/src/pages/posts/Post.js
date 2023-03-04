import {React, useState} from "react";
import {BsFillChatLeftTextFill} from "react-icons/bs"
import {BiText} from "react-icons/bi"
import {AiFillWarning} from "react-icons/ai"

import PostComments from "./PostComments";
import DataBar from "../../components/DataBarPost";
import ContentInput from "../../components/Editor/ContentInput";

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

    const changeDisplayEditor = () => {
        setDisplayPostEditor(!displayPostEditor);
    }

    const setNewPostData = (editedPost) => {
        postData.tags = editedPost[0].tags;
        postData.content = editedPost[0].content;
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
                    <ContentInput
                        initialContent={postData}
                        addNew={setNewPostData}
                        url={`posts/${postData.idPost}`}
                        method={'PUT'}
                        apiData={ {idPost: postData.idPost} }
                        enableTags={true}
                        placeHolder={"Wprowadz nowy post..."}
				    />
                )
            }

            <div className="widget-box">
                <button type="button" onClick={changeDisplayComments} className={"btn action-button " + (displayComments ? "btn-success" : "btn-outline-success")}>{postData.comments} <BsFillChatLeftTextFill/></button>
                {/* <button type="button" onClick={changeDisplayInput} className={"btn action-button " + (displayCommentInput ? "btn-primary" : "btn-outline-primary")}><BiText/></button> */}
                <button type="button" className="btn btn-outline-warning action-button"><AiFillWarning/></button>
                <button type="button" onClick={changeDisplayEditor} className="btn btn-outline-warning action-button">Edit</button>
            </div>          

            {displayComments && 
                <PostComments
                    idPost={postData.idPost}
                />
            }

        </div>
    );
}