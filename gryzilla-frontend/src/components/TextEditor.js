import React from "react";
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

export default function TextEditor(props){

    const content = props.content;
    const placeHolder = props.placeHolder;

    const [editorState, setEditorState] = useState( () => {
        if( props.initialContent ){
            const blocksFromHTML = convertFromHTML(content)
            const contentState = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
            );
            return EditorState.createWithContent(contentState)
        } else {
            return EditorState.createEmpty()
        }
    });

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
}