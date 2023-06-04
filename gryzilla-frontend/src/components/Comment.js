import { useEffect } from "react";
import { useRef } from "react";
import DataBar from "./DataBarPost";
import { DbDateConvert } from "../utils/DataUtlis";
import { useParams } from "react-router-dom";

export default function Comment({ avatar, nick, createdAt, content, id }) {
	const scrollRef = useRef(null);
	const {idComment} = useParams();

	const scrollInto = () => {
		scrollRef.current.scrollIntoView();
	};

	const isHighlight = () => {
		if( !id || !idComment ) return false;
		if(id == idComment) return true;
		return false;
	}

	useEffect(() => {
		if (isHighlight()) scrollInto();
	}, []);

	return (
		<div className="content-container" ref={scrollRef} style={{borderColor: isHighlight() ? "#72DBF0" : "", border: isHighlight() ? "1px solid #72DBF0" : ""}}>
			<DataBar
				nick={nick}
				date={DbDateConvert(createdAt)}
				avatar={avatar}
			/>
			<hr className="hr-line" />
			{/* <span>Id {id}</span> */}
			<span dangerouslySetInnerHTML={{ __html: content }}></span>
		</div>
	);
}
