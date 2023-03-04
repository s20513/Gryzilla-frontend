// import React from "react";
// import { useState, useEffect, useRef } from "react";
// import Tag from "../../components/Tag";
// import useAxios from "../../hooks/useAxios";
// import TextEditor from "../../components/TextEditor";

// export default function InputEditPost(props) {
    
//     const postData = props.postData;

//     const [showInput, setShowInput] = useState(false);

//     const childPostContentRef = useRef();
//     const childPostTagsRef = useRef();

//     // const [tags, setTags] = useState(() => {
//     //     return postData.tags.map((tag) => {
//     //         return {id: tag, text: tag};
//     //     });
//     // });

//     const [newPost, error, loading, runRequest] = useAxios({
//         method: 'PUT',
//         url: `posts/${postData.idPost}`,
//         headers: {accept: '*/*'},
//     });
    
//     //po zaladowaniu ustaw zedytowanego posta
//     useEffect(()=>{
//         if(newPost == undefined || newPost == null)
//             return;
//         props.setNewPostData(newPost);
//     },[newPost])

//     const handleSubmit = (event) => {
//         event.preventDefault();
        
//         runRequest({
//                 data: {
//                     idPost: postData.idPost,
//                     content: childPostContentRef.current.getPostContent(),
//                     tags: childPostTagsRef.current.getPostTags()
//                 }
//             });
//       }

//     return (
//         <div className="content-container">
//             <form onSubmit={handleSubmit}>
//                 <TextEditor
//                     initialContent={postData.content}
//                     ref={childPostContentRef}
//                 />
//                 <div style={{marginTop : "8px"}}>
//                     <Tag
//                         initialContent={postData.tags}
//                         ref={childPostTagsRef}
//                         // tagsState={tags} 
//                         // onTagStateChange={setTags}
//                     />
//                 </div>
//                 <input type="submit"/>
//             </form>
//         </div>
//     );
// }