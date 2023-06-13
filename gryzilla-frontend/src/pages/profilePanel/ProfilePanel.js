import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import ChangePasswordModal from "./components/ChangePasswordModal";
import { useAuth } from "../../context/AuthContext";
import ChangeDetailsModal from "./components/ChangeDetailsModal";
import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router-dom";
import ChangePasswordAdminModal from "./components/ChangePasswordAdminModal";
import Require from "../../context/Require";
import { FaSteam, FaXbox } from "react-icons/fa";
import ChangeLinkModal from "./components/ChangeLinkModal";
import { SiEpicgames } from "react-icons/si";
import { BsDiscord } from "react-icons/bs";

export default function ProfilePanel() {
	const auth = useAuth();
	const [showChangePassModal, setShowChangePassModal] = useState(false);
	const [showChangePassAdminModal, setshowChangePassAdminModal] =
		useState(false);
	const [showChangeDetailsModal, setShowChangeDetailsModal] = useState(false);
	const params = useParams();

	const [showXboxModal, setShowXboxModal] = useState(false);
	const [showSteamModal, setShowSteamModal] = useState(false);
	const [showEpicModal, setShowEpicModal] = useState(false);
	const [showDiscordModal, setShowDiscordModal] = useState(false);

	const [profile, errorProfile, loadingProfile, runRequest] = useAxios({
		method: "GET",
		url: `/users/${params.idUser}`,
		headers: { accept: "*/*" },
	});

	useEffect(() => {
		runRequest();
	},[params.idUser])

	return (
		<Container className="main-panel">
			{profile && (
				<>
					<Container className="d-flex justify-content-between">
						<h2>Panel użytkownika {profile.nick}</h2>
					</Container>
					<Require req={{ authRole: ["Admin"] }}>
						<div className="content-container">
							<h4>Resetowanie hasła użytkownika</h4>

							<Button onClick={() => setshowChangePassAdminModal(true)}>
								Kliknij tutaj, aby zmienić hasło jako administrator
							</Button>
							<ChangePasswordAdminModal
								show={showChangePassAdminModal}
								setShow={setshowChangePassAdminModal}
								userData={profile}
							/>
						</div>
					</Require>

					<Require req={{ authOwner: true,  idOwner: profile.idUser }}>
						<div className="content-container">
							<h4>Zmiana hasła</h4>

							<Button onClick={() => setShowChangePassModal(true)}>
								Kliknij tutaj, aby zmienić hasło
							</Button>
							<ChangePasswordModal
								show={showChangePassModal}
								setShow={setShowChangePassModal}
								userData={profile}
							/>
						</div>
					</Require>

					<div className="content-container">
						<h4>Zmiana danych konta</h4>
						<Button onClick={() => setShowChangeDetailsModal(true)}>
							Kliknij tutaj, aby zmienić dane konta
						</Button>
						<ChangeDetailsModal
							show={showChangeDetailsModal}
							setShow={setShowChangeDetailsModal}
							userData={profile}
						/>
					</div>

					<div className="content-container">
						<h4>Zmiana linków konta</h4>
						<div className="d-flex gap-3 flex-wrap">
							<Button onClick={() => setShowXboxModal(true)}>
								Zmiana konta Xbox <FaXbox className="button-web-link-icon" />
							</Button>
							<ChangeLinkModal
								title={"Zmiana linku do Xbox"}
								show={showXboxModal}
								setShow={setShowXboxModal}
								linkTail={profile.linkXbox}
								linkHead={"https://account.xbox.com/pl-pl/Profile?"}
								idUser={params.idUser}
								link={"xbox"}
							/>

							<Button onClick={() => setShowDiscordModal(true)}>
								Zmiana konta Discord{" "}
								<BsDiscord className="button-web-link-icon" />
							</Button>
							<ChangeLinkModal
								title={"Zmiana linku do Discord"}
								show={showDiscordModal}
								setShow={setShowDiscordModal}
								linkTail={profile.linkDiscord}
								linkHead={"https://discord.gg/"}
								idUser={params.idUser}
								link={"discord"}
							/>

							<Button onClick={() => setShowSteamModal(true)}>
								Zmiana konta Steam <FaSteam className="button-web-link-icon" />
							</Button>
							<ChangeLinkModal
								title={"Zmiana linku do Steam"}
								show={showSteamModal}
								setShow={setShowSteamModal}
								linkTail={profile.linkSteam}
								linkHead={"https://steamcommunity.com/profiles/"}
								idUser={params.idUser}
								link={"steam"}
							/>

							<Button onClick={() => setShowEpicModal(true)}>
								Zmiana konta Epic{" "}
								<SiEpicgames className="button-web-link-icon" />
							</Button>
							<ChangeLinkModal
								title={"Zmiana linku do Epic"}
								show={showEpicModal}
								setShow={setShowEpicModal}
								linkTail={profile.linkEpic}
								linkHead={"https://launcher.store.epicgames.com/u/"}
								idUser={params.idUser}
								link={"epic"}
							/>
						</div>
					</div>
				</>
			)}
		</Container>
	);
}
