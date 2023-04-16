import { Button } from "react-bootstrap";
import { FaSteam } from "react-icons/fa";
import { SiEpicgames } from "react-icons/si";
import { BsDiscord } from "react-icons/bs";
import { FaPlaystation, FaXbox } from "react-icons/fa";

export default function ProfileLinkButtons() {
	return (
		<div className="content-container d-flex justify-content-around ">
			{/* <div className="flex-items"> */}
				<Button className="button-web-link"><FaSteam className="button-web-link-icon"/><span className="d-none d-md-inline"> Steam</span></Button>
				<Button className="button-web-link"><SiEpicgames className="button-web-link-icon"/><span className="d-none d-md-inline"> Epic</span></Button>
				<Button className="button-web-link"><BsDiscord className="button-web-link-icon"/><span className="d-none d-md-inline"> Discord</span></Button>
				<Button className="button-web-link"><FaPlaystation className="button-web-link-icon"/><span className="d-none d-md-inline"> PlayStation</span></Button>
				<Button className="button-web-link"><FaXbox className="button-web-link-icon"/><span className="d-none d-md-inline"> Xbox</span></Button>
			{/* </div> */}
		</div>
	);
}
