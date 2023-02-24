import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import useAxios from "../../hooks/useAxios";

import Tag from "../../components/Tag";

import { AiFillWarning, AiOutlinePicture } from "react-icons/ai"
import { BsTypeBold, BsTypeItalic } from "react-icons/bs"
import { GrBlockQuote } from "react-icons/gr"
import { MdFormatListBulleted, MdEmojiEmotions } from "react-icons/md"
import { FiAlertCircle } from "react-icons/fi"

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../assets/Editor.scss';
import { Container } from "react-bootstrap";

export default function TextInput(props) {
    const textPlaceHolder = props.children;
    const [showInput, setShowInput] = useState(false);
    //const isDataFetched = useRef(false);

    const [tags, setTags] = useState([]);
    const [editorState, setEditorState] = useState(
            () => EditorState.createEmpty(),
        );

    const [newPost, error, loading, runRequest] = useAxios({
        method: 'POST',
        url: `posts`,
        headers: {accept: '*/*'},
    });

    useEffect(()=>{
        if(newPost != undefined && newPost != null)
            props.addNew([newPost])
    },[newPost])

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("postowanie");
        console.log(tags);
        runRequest({
                data: {
                    idUser: "6",
                    title: "shoud_there_be_a_title?",
                    content: convertToHTML(editorState.getCurrentContent()),
                    tags: tags.map((tag) => {
                        return tag.text;
                    })
                }
            });
      }

    return (
        <div className="content-wrapper">
                <div className="content-container">
                    <form onSubmit={handleSubmit}>
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={setEditorState}
                            placeholder={textPlaceHolder}
                            toolbarClassName="toolbar-class"
                            toolbar={{
                                options : ['inline'],
                                inline : {
                                    options : ['bold', 'italic', 'underline','strikethrough']
                                }
                            }}
                        />
                        <div style={{marginTop : "8px"}}>
                            <Tag
                                tagsState={tags} 
                                onTagStateChange={setTags}
                            />
                        </div>
                        <input type="submit"/>
                 </form>
            </div>
        </div>
    );
}