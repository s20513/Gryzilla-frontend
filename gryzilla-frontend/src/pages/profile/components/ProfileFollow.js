import { Link, useNavigate } from "react-router-dom";

export default function ProfileFollow({ idUser, nick }) {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/profile/${idUser}`);
    }

	return (
		// <Link to={`/profile/${idUser}`}>
		// 	<span className="content-container" style={{ display: "block" }}>
        //         {nick}
		// 	</span>
		// </Link>

		<div onClick={()=>handleClick()} className="content-container follow-container user-nick" style={{width: "auto"}}>
		    {nick}
		</div>
	);
}
