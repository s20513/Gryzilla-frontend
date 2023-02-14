import React from "react";
import { useState } from "react";
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import Tag from "../Tag";

import { AiFillWarning, AiOutlinePicture } from "react-icons/ai"
import { BsTypeBold, BsTypeItalic } from "react-icons/bs"
import { GrBlockQuote } from "react-icons/gr"
import { MdFormatListBulleted, MdEmojiEmotions } from "react-icons/md"
import { FiAlertCircle } from "react-icons/fi"

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../Styles/Editor.scss';
import { Container } from "react-bootstrap";

export default function PostInput() {
    const [isFocused, setIsFocused] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
      );

    const handleFocusIn = () => {
        setIsFocused(true);
        console.log("focus in")
    };

    const handleBlur = () => {
        setIsFocused(false);
        console.log("blur")
    };

    return (
        <div className="content-wrapper">
            {!showInput && <div className="content-container" onClick={() => setShowInput(true)}>Wprowadz nowego posta...</div>}

            {showInput && 
                <div className="content-container">
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

                    // hashtag={{
                    //     separator: ' ',
                    //     trigger: '#',
                    //     suggestions: [
                    //         { text: 'JavaScript', value: 'javascript', url: 'js' },
                    //         { text: 'Golang', value: 'golang', url: 'go' },
                    //       ]
                    // }}

                    // mention={{
                    //     separator: ' ',
                    //     trigger: '@',
                    //     suggestions: [
                    //       { text: 'JavaScript', value: 'javascript', url: 'js' },
                    //       { text: 'Golang', value: 'golang', url: 'go' },
                    //     ],
                    //   }}
                />
                <div style={{marginTop : "8px"}}>
                    <Tag/>
                </div>
                
                </div>}
            </div>
    );
}