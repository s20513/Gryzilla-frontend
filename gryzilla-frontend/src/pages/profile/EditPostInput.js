import React from "react";
import { useState, useEffect } from "react";
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import Tag from "../../components/Tag";
import useAxios from "../../hooks/useAxios";

import {
    EditorState,
    convertToRaw,
    ContentState,
    convertFromHTML
  } from "draft-js"

export default function EditPostInput(props) {
    const postData = props.postData;
    const textPlaceHolder = props.children;

    const [showInput, setShowInput] = useState(false);

    const [tags, setTags] = useState(() => {
        let arr =  postData.tags.map((tag) => {
            return {id: tag, text: tag};
        });

        if( arr == null ){
            return ([]);
        }
           
    });

    useEffect(() => {
        console.log(tags)
    },[tags])

    const [editorState, setEditorState] = useState(() => {
        const blocksFromHTML = convertFromHTML(postData.content)
        const contentState = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        )
        return EditorState.createWithContent(contentState)
    })

    const [newPost, error, loading, runRequest] = useAxios({
        method: 'PUT',
        url: `posts/${postData.idPost}`,
        headers: {accept: '*/*'},
    });

    useEffect(()=>{
        if(newPost == undefined || newPost == null)
            return;

        props.setNewPostData(newPost);
    },[newPost])

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("postowanie");
        runRequest({
                data: {
                    idPost: postData.idPost,
                    title: "shoud_there_be_a_title?",
                    content: convertToHTML(editorState.getCurrentContent()),
                    tags: (tags.map((tag) => {
                        return tag.text;
                    }))
                }
            });
      }

    return (
        <div className="content-container">
            <form onSubmit={handleSubmit}>
                <Editor
                    editorState={editorState}
                    defaultEditorState={editorState}
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
    );
}