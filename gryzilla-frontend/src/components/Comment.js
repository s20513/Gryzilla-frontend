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
