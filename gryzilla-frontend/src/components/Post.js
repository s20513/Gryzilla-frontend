import React from "react";

export default function Post(props) {

    const { postData } = props;
    
    console.log(postData);

    return (
        <div className="data-container">
            <div className="upper-data-container">
                <span className="likes-count">+{postData.likes}</span>
                <span className="user-nick">{postData.nick}</span>
                <span className="timestamp">{postData.createdAt}</span>
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
    );
}