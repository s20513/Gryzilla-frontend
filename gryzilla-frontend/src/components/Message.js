import { useEffect } from "react";
import { useRef } from "react";

export default function Comment({nick, description, highlight}) {

	const scrollRef = useRef(null);

	const scrollInto = () => {
		scrollRef.current.scrollIntoView()
	}

	useEffect(()=>{
		if(highlight)
			scrollInto();
	},[])


	return (
		<div className={ (highlight ? ("content-container-highlight") : "") + " content-container ms-2 m-md-3"} ref={scrollRef}>
			<span className="user-nick">{nick}</span>
			<br />
			<span dangerouslySetInnerHTML={{ __html: description }} />
		</div>
	);
}
