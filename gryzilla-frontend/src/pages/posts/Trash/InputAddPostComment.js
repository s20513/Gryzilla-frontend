// import React from "react";
// import { useRef, useEffect } from "react";
// import useAxios from "../../hooks/useAxios";
// import TextEditor from "../../components/TextEditor";

// export default function InputAddPostComment(props) {

//     const textPlaceHolder = props.placeHolder;
//     const idPost = props.idPost;

//     const childPostContentRef = useRef();

//     const [newPost, error, loading, runRequest] = useAxios({
//         method: 'POST',
//         url: `posts/comment`,
//         headers: {accept: '*/*'},
//     });

//     useEffect(()=>{
//         if(newPost != undefined && newPost != null)
//             props.addNew([newPost])
//     },[newPost])

//     const handleSubmit = (event) => {
//         event.preventDefault();

//         runRequest({
//                 data: {
//                     idUser: "6",
//                     idPost: idPost,
//                     content: childPostContentRef.current.getPostContent(),
//                 }
//             });
//     }

//     return (
//         <div className="content-wrapper">
//                 <div className="content-container">
//                     <form onSubmit={handleSubmit}>
//                         <TextEditor
//                             ref={childPostContentRef}
//                         />
//                         <input type="submit"/>
//                  </form>
//             </div>
//         </div>
//     );
// }