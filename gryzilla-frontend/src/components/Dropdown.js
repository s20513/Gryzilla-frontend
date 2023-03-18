// import axios from 'axios';
// import {useState, useEffect, useRef, useCallback } from "react";
// import {Container, Dropdown} from 'react-bootstrap';
// import useFetchPosts from '../hooks/useFetchPosts';
// import LoadingBanner from './LoadingBanner';
// import Post from './Posts/Post';
// import PostInput from './Posts/PostInput';


// export default function Dropdown() {
//     const [sortType, setSortType] = useState(() => {
//         const savedSortType = localStorage.getItem('sortType');
//         return savedSortType || "byDateDesc";
//     });

//     return (
//         <Dropdown align="end">
//             <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
//                 Sortuj
//             </Dropdown.Toggle>

//             <Dropdown.Menu className="dropdown-menu-right dropdown-menu-dark">
//                 <Dropdown.Item
//                     onClick={() => {setSortType('byDateDesc')}}
//                     active={sortType === "byDateDesc" ? true : false}
//                     href="xddddddddddddddd">
//                     Najnowsze
//                 </Dropdown.Item>d
//                 <Dropdown.Item
//                     onClick={() => {setSortType("byDateAsc")}}
//                     active={sortType === "byDateAsc" ? true : false}
//                     href="#/action-3">
//                     Najstarsze
//                 </Dropdown.Item>
//                 <Dropdown.Item onClick={() => {setSortType('byLikesDesc')}}
//                     active={sortType === "byLikesDesc" ? true : false}
//                     href="#/action-1">
//                     Najpopularniejsze
//                 </Dropdown.Item>
//                 <Dropdown.Item
//                     onClick={() => {setSortType("byCommentsDesc")}}
//                     active={sortType === "byCommentsDesc" ? true : false}
//                     href="#/action-3">
//                     Najwięcej komentarzy
//                 </Dropdown.Item>
//             </Dropdown.Menu>
//         </Dropdown>
//     );
// }
