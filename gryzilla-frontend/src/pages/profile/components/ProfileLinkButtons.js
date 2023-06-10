import { Button } from "react-bootstrap";
import { FaSteam } from "react-icons/fa";
import { SiEpicgames } from "react-icons/si";
import { BsDiscord } from "react-icons/bs";
import { FaPlaystation, FaXbox } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ProfileLinkButtons({
	linkDiscord,
	linkEpic,
	linkPs,
	linkSteam,
	linkXbox,
}) {
	return (
		<div className="content-container d-flex  justify-content-center gap-3">
			{/* <div className="flex-items"> */}
			<a href={linkSteam ? linkSteam : null}>
				<Button disabled={linkSteam ? false : true} className="button-web-link">
					<FaSteam className="button-web-link-icon" />
					<span className="d-none d-md-inline"> Steam</span>
				</Button>
			</a>
			<a href={linkEpic ? linkEpic : null}>
				<Button disabled={linkEpic ? false : true} className="button-web-link">
					<SiEpicgames className="button-web-link-icon" />
					<span className="d-none d-md-inline"> Epic</span>
				</Button>
			</a>
			<a href={linkDiscord ? linkDiscord : null}>
				<Button
					disabled={linkDiscord ? false : true}
					className="button-web-link"
				>
					<BsDiscord className="button-web-link-icon" />
					<span className="d-none d-md-inline"> Discord</span>
				</Button>
			</a>
			{/* <Link to={linkPs ? linkPs : ""} ></Lik><Button disabled={linkPs ? false : true} className="button-web-link"><FaPlaystation className="button-web-link-icon"/><span className="d-none d-md-inline"> PlayStation</span></Button> */}
			<a href={linkXbox ? linkXbox : null}>
				<Button disabled={linkXbox ? false : true} className="button-web-link">
					<FaXbox className="button-web-link-icon" />
					<span className="d-none d-md-inline"> Xbox</span>
				</Button>
			</a>
		</div>
	);
}
