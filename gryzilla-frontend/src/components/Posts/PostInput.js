import React from "react";
import { useState } from "react";
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import TagsInput from "../TagsInput";
import Tag from "../Tag";

import { AiFillWarning, AiOutlinePicture } from "react-icons/ai"
import { BsTypeBold, BsTypeItalic } from "react-icons/bs"
import { GrBlockQuote } from "react-icons/gr"
import { MdFormatListBulleted, MdEmojiEmotions } from "react-icons/md"
import { FiAlertCircle } from "react-icons/fi"

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function PostInput() {
    const [isFocused, setIsFocused] = useState(false);
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
            <div className="content-container">
            <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}

                toolbarClassName="toolbar-class"
                toolbar={{
                    options : ['inline'],
                    inline : {
                        options : ['bold', 'italic', 'underline','strikethrough']
                    }
                }}
                hashtag={{
                    separator: ' ',
                    trigger: '#',
                    suggestions: [
                        { text: 'JavaScript', value: 'javascript', url: 'js' },
                        { text: 'Golang', value: 'golang', url: 'go' },
                      ]
                }}

                mention={{
                    separator: ' ',
                    trigger: '@',
                    suggestions: [
                      { text: 'JavaScript', value: 'javascript', url: 'js' },
                      { text: 'Golang', value: 'golang', url: 'go' },
                    ],
                  }}
             />
             <Tag/>
            {/* <TagsInput/> */}
                {/* <textarea onBlur={handleBlur} placeholder="Napisz nowy post..." onFocus={handleFocusIn} class="form-control content-input" id="exampleFormControlTextarea1" rows={isFocused ? "6" : "1"}></textarea>
                
                {isFocused && 
                    <div className="widget-box">
                        <button type="button" className="btn btn-outline-primary input-action-button"><BsTypeBold/></button>
                        <button type="button" className="btn btn-outline-primary input-action-button"><BsTypeItalic/></button>
                        <button type="button" className="btn btn-outline-primary input-action-button"><GrBlockQuote/></button>
                        <button type="button" className="btn btn-outline-primary input-action-button"><FiAlertCircle/></button>
                        <button type="button" className="btn btn-outline-primary input-action-button"><MdFormatListBulleted/></button>
                        <button type="button" className="btn btn-outline-primary input-action-button"><MdEmojiEmotions/></button>
                        <button type="button" className="btn btn-outline-primary input-action-button"><AiOutlinePicture/></button>
                        <span style={{flex: 1}}></span>
                        <button type="button" className="btn btn-outline-danger action-button">Anuluj <AiFillWarning/></button>
                        <button type="button" className="btn btn-outline-success action-button">Wyślij <AiFillWarning/></button>
                    </div>} */}
            </div>
        </div>
    );
}