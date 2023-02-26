import React, { forwardRef, useImperativeHandle } from "react";
import { useState } from "react";

import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';

import {
    EditorState,
    convertToRaw,
    ContentState,
    convertFromHTML
  } from "draft-js";

  /// JAK POBRAĆ Z STĄD TEXT DO InputEditPost ???

const TextEditor =  forwardRef((props, _ref) =>{

    const initialContent = props.initialContent;
    const placeHolder = props.placeHolder;

    const [editorState, setEditorState] = useState( () => {
        if( initialContent != undefined){
            const blocksFromHTML = convertFromHTML(initialContent)
            const contentState = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
            );
            return EditorState.createWithContent(contentState)
        } else {
            return EditorState.createEmpty()
        }
    });

    useImperativeHandle(_ref, () => ({
        getPostContent: () => {
            return convertToHTML(editorState.getCurrentContent());
        }
    }));

    // useImperativeHandle(ref, () => {
    //     const getContent = () => {
    //         return convertToHTML(editorState.getCurrentContent());
    //     }
    // });

    return (
        <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            placeholder={placeHolder}
            toolbarClassName="toolbar-class"
            toolbar={{
                options : ['inline'],
                inline : {
                     options : ['bold', 'italic', 'underline','strikethrough']
                }
            }}
        />  
    );
})

export default TextEditor;