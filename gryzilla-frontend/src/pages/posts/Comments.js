import axios from 'axios';
import {React, useEffect, useState} from 'react';
import InputMockup from '../../components/InputMockup';
import useAxios from '../../hooks/useAxios';
import InputAddComment from './InputAddComment';

export default function Comments(props) {

    const idPost = props.idPost;
    const displayCommentInput = props.displayCommentInput;
    const setDisplayCommentInput = props.setDisplayCommentInput;

    //tutaj pobieranie samych komentarzy powinno być, nie całego posta z komentarzami 
    const [data, errorData, loadingData] = useAxios({method: 'GET',url: `posts/${idPost}`,headers: {accept: '*/*'},
    });

    const [newComment, setNewComment] = useState();

    const addNewComment = (newComment) => {
        setNewComment(newComment);
        setDisplayCommentInput(false);
    }

       return (
        <>  
            <div className="d-flex">
                <div className="comments-vertical-line"></div>

                <div style={{"flexGrow" : "1"}}>

                    {!displayCommentInput &&
                        <div className="m-3">
                            <InputMockup handleClick={ () => setDisplayCommentInput(true)}>
                                Dodaj nowy komentarz...
                            </InputMockup>
                        </div>
                    }

                    {displayCommentInput && 
                        <div className="m-3">
                            <InputAddComment
                            placeHolder={"Wprowadź komentarz..."}
                            addNew={addNewComment}
                            idPost={idPost}
                            />
                        </div>
                    }

                    {newComment && newComment.map((comment) => (
                        <div className="content-container m-3">
                            <span className="user-nick">{comment.nick}</span>
                            <br/>
                            <span dangerouslySetInnerHTML={{__html: comment.description}}/>
                        </div>
                    ))}

                    {data && data.comments.map((comment) => (
                        <div className="content-container m-3">
                            <span className="user-nick">{comment.nick}</span>
                            <br/>
                            <span dangerouslySetInnerHTML={{__html: comment.description}}/>
                        </div>
                    ))}

                    {(data && data.comments.length == 0) &&
                        <div className="comment-data-container">
                            Brak postów do wyświetlenia
                        </div>
                    }

                </div>
            </div>

            {loadingData && 
                <div className="loading-block">
                    Ładowanie komentarzy...
                </div>
            }
        </>
       );


}