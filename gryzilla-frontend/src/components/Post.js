import {React, useState} from "react";
import {BsFillChatLeftTextFill} from "react-icons/bs"
import {AiFillWarning} from "react-icons/ai"
import {Button} from 'react-bootstrap';
import Comments from "./Comments";

export default function Post(props) {

    const postData = props.postData;
    const indexNumber = (props.indexNumber + 0.3) * 0.6;

    console.log("Moj indeks" + indexNumber);

    const [displayComments, setDisplayComments] = useState(false);

    const changeDisplayComments = async () => {
        setDisplayComments(!displayComments);
    };

    return (
        <div className="data-container" style={{animationDuration : indexNumber + "s"}}>
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
            
            <div onClick={changeDisplayComments} className="d-flex widget-container">
                <Button variant="success">{postData.comments} <BsFillChatLeftTextFill/></Button>
                {/* <Button variant="warning"><AiFillWarning/></Button> */}
            </div>
            
            {displayComments && <Comments idPost={postData.idPost}></Comments>}
        </div>
    );
}