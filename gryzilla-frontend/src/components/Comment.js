import { useEffect } from "react";
import { useRef } from "react";
import DataBar from "./DataBarPost";
import { DbDateConvert } from "../utils/DataUtlis";

export default function Comment({ avatar, nick, createdAt, content }) {
	const scrollRef = useRef(null);

	const scrollInto = () => {
		scrollRef.current.scrollIntoView();
	};

	// useEffect(() => {
	// 	if (highlight) scrollInto();
	// }, []);

	return (
		// <div className={ (highlight ? ("content-container-highlight") : "") + " content-container ms-2 m-md-3"} ref={scrollRef}>
		// 	<span className="user-nick">{nick}</span>
		// 	<br />
		// 	<span dangerouslySetInnerHTML={{ __html: description }} />
		// </div>
		<div className="content-container" ref={scrollRef}>
			<DataBar
				nick={nick}
				date={DbDateConvert(createdAt)}
				avatar={avatar}
			/>
			<hr className="hr-line" />
			<span dangerouslySetInnerHTML={{ __html: content }}></span>
		</div>
	);
}
