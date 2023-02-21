import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import useAxios from "../hooks/useAxios";

import Tag from "./Tag";

import { AiFillWarning, AiOutlinePicture } from "react-icons/ai"
import { BsTypeBold, BsTypeItalic } from "react-icons/bs"
import { GrBlockQuote } from "react-icons/gr"
import { MdFormatListBulleted, MdEmojiEmotions } from "react-icons/md"
import { FiAlertCircle } from "react-icons/fi"

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../assets/Editor.scss';
import { Container } from "react-bootstrap";

export default function PostInput(props) {
    const [showInput, setShowInput] = useState(false);
    const [tags, setTags] = useState([]);
    const [editorState, setEditorState] = useState(
            () => EditorState.createEmpty(),
        );

    const [newPost, error, loading, runRequest] = useAxios({
        method: 'POST',
        url: `posts`,
        headers: {accept: '*/*'},
        data: {
            idUser: "6",
            title: "shoud_there_be_a_title?",
            content: convertToHTML(editorState.getCurrentContent()),
            tags: tags
        }
    });

    

    // useEffect( ()=> {
    //     let html = convertToHTML(editorState.getCurrentContent());
    //     console.log(html)
    // }, [editorState])

    // useEffect( ()=> {
    //     if(profile){
    //         console.log("przeładowanie")
    //         window.location.reload(false);
    //     }  
    // },[profile])

    useEffect(()=>{
        if(newPost != undefined && newPost != null)
            props.addNew([newPost])
    },[newPost])

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("postowanie");
        runRequest();
      }

    return (
        <div className="content-wrapper">
                <div className="content-container">
                    <form onSubmit={handleSubmit}>
                        <Editor
                        editorState={editorState}
                        onEditorStateChange={setEditorState}
                        placeholder="Wprowadź treść posta..."
                        toolbarClassName="toolbar-class"
                        toolbar={{
                            options : ['inline'],
                            inline : {
                                options : ['bold', 'italic', 'underline','strikethrough']
                            }
                        }}
                        />
                        <div style={{marginTop : "8px"}}>
                            <Tag setTags={setTags}/>
                        </div>
                        <input type="submit"/>
                 </form>
            </div>
        </div>
    );
}