import {React, useState} from "react";
import {BsFillChatLeftTextFill} from "react-icons/bs"
import Comments from "./Comments";

export default function Post(props) {

    const { postData } = props;

    const [displayComments, setDisplayComments] = useState(false);

    const changeDisplayComments = async () => {
        setDisplayComments(!displayComments);
    };

    return (
        <div className="data-container">
            <div className="upper-data-container">
                <span className="likes-count">+{postData.likes}</span>
                <span className="user-nick">{postData.nick}</span>
                <span className="timestamp">{postData.createdAt.replace("T"," ")}</span>
                <hr className="hr-line"/>
                <span>{postData.content}</span>
            </div>
            <div className="flex-row">
                <div onClick={changeDisplayComments} className="lower-tag-container" style={{backgroundColor:"green"}}>
                    <span>{postData.comments} </span><BsFillChatLeftTextFill/>
                </div>
                <div className="lower-tag-container">
                    {postData.tags.map((tag) => (
                            <span>#{tag.nameTag} </span>
                        ))
                    }
                </div>
            </div>
            
            {displayComments && <Comments idPost={postData.idPost}></Comments>}
        </div>
    );
}