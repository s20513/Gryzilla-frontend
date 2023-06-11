import { useEffect, useState } from "react";
import FormInput from "../../../components/Form/FormInput";
import {
	Button,
	Dropdown,
	DropdownButton,
	Form,
	InputGroup,
} from "react-bootstrap";
import useDebounce from "../../../hooks/useDebounce";
import useAxios from "../../../hooks/useAxios";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { DbDateConvert } from "../../../utils/DataUtlis";

export default function RankChanger({ chosenUserFromReport }) {
	const [nick, setNick] = useState("");
	const nickDebounce = useDebounce(nick, 400);

	const [chosenUser, setChosenUser] = useState(null);
	const [chosenRank, setChosenRank] = useState(null);

	const [blockComment, setBlockComment] = useState(null);
	const [commentReport, setCommentReport] = useState(null);

	const auth = useAuth();
	const nav = useNavigate();

	// useEffect(()=>{
	// 	if(!auth.isLogged) nav('/')
	// },[auth.isLogged])

	useEffect(() => {
		if (!chosenUserFromReport) return;
		setBlockComment(chosenUserFromReport.reason);
		setNick(chosenUserFromReport.nickReported);
	}, [chosenUserFromReport]);

	const [users, errorUsers, loadingUsers, runRequestUsers] = useAxios({
		method: "GET",
		url: `/search/getUsersByName`,
		headers: { accept: "*/*" },
		executeOnRender: false,
	});

	const [userHistory, errorHistory, loadingHistory, runRequestHistory] =
		useAxios({
			method: "GET",
			headers: { accept: "*/*" },
			executeOnRender: false,
		});

	const [ranks, errorRanks, loadingRanks, runRequestRanks] = useAxios({
		method: "GET",
		url: `/rank`,
		headers: { accept: "*/*" },
		executeOnRender: true,
	});

	const [rankChange, errorChange, loadingChange, runRequestChange] = useAxios({
		method: "PUT",
		url: `/users/rank`,
		headers: { accept: "*/*" },
		executeOnRender: false,
	});

	const [block, errorBlock, loadingBlock, runRequestBlock] = useAxios({
		method: "POST",
		url: `/block`,
		headers: { accept: "*/*" },
		executeOnRender: false,
	});

	const [unblock, errorUnblock, loadingUnblock, runRequestUnblock] = useAxios({
		method: "DELETE",
		headers: { accept: "*/*" },
		executeOnRender: false,
	});

	useEffect(() => {
		if (!chosenUser) return;
		runRequestHistory({ url: `/block/${chosenUser.idUser}` });
	}, [chosenUser]);

	useEffect(() => {
		if (!nickDebounce) {
			setChosenUser(null);
			return;
		}
		runRequestUsers({
			params: { nick: nickDebounce },
		});
	}, [nickDebounce]);

	const handleBlock = () => {
		setChosenUser(null);
		runRequestBlock({
			data: {
				idUserBlocking: auth.id,
				idUserBlocked: chosenUser.idUser,
				comment: blockComment,
			},
		});
	};

	const handleUnblock = () => {
		setChosenUser(null);
		runRequestUnblock({ url: `/block/${chosenUser.idUser}` });
	};

	useEffect(() => {
		if(!nickDebounce) return;
		runRequestUsers({
			params: { nick: nickDebounce },
		});
	}, [block, unblock, rankChange]);

	const handleSubmit = () => {
		if (!chosenUser || !chosenRank) return;
		runRequestChange({
			data: { idUser: chosenUser.idUser, idRank: chosenRank.idRank },
		});
	};

	return (
		<>
			<div className="content-container pt-3 pb-2">
				<div className="d-flex justify-content-center">
					<InputGroup className="mb-2" style={{ width: "500px" }}>
						<Form.Control
							placeholder="Wpisz nazwę użytkownika"
							value={nick ? nick : ""}
							onChange={(e) => setNick(e.target.value)}
						/>

						<DropdownButton
							variant="secondary"
							title={chosenUser ? chosenUser.nick : "Nie Wybrano"}
							id="input-group-dropdown-2"
							disabled={
								nickDebounce && !loadingUsers && users?.length > 0
									? false
									: true
							}
						>
							{users &&
								users.map((user) => {
									return (
										<Dropdown.Item
											key={user.idUser}
											onClick={() =>
												setChosenUser((prev) => {
													setChosenRank({
														idRank: user.idRank,
														name: user.rankName,
													});
													return user;
												})
											}
										>
											{user.nick}
										</Dropdown.Item>
									);
								})}
						</DropdownButton>
					</InputGroup>
				</div>

				<div className="d-flex justify-content-center">
					{chosenUser &&
						auth.role == "Admin" &&
						chosenUser.rankName != "Blocked" && (
							<>
								<div className="d-flex flex-row align-items-center gap-2 justify-content-center change-rank-button">
									<span>Zmień range z {chosenUser?.rankName} na:</span>

									<Dropdown>
										<Dropdown.Toggle
											style={{ height: "30px", padding: "0px 20px" }}
											id="dropdown-button-dark-example1"
											variant="secondary"
										>
											{chosenRank ? chosenRank.name : "nie wybrano"}
										</Dropdown.Toggle>

										<Dropdown.Menu variant="dark">
											{ranks &&
												ranks
													.filter((rank) => rank.name != "Blocked")
													.map((rank) => {
														return (
															<Dropdown.Item
																key={rank.idRank}
																onClick={() => setChosenRank(rank)}
															>
																{rank.name}
															</Dropdown.Item>
														);
													})}
										</Dropdown.Menu>
									</Dropdown>
								</div>
							</>
						)}
				</div>
				<div className="d-flex justify-content-center mt-3">
					{chosenRank &&
						chosenUser &&
						chosenRank.name !== chosenUser.rankName && (
							<Button onClick={handleSubmit}>
								Zmień rangę użytkownika {chosenUser.nick} na {chosenRank.name}
							</Button>
						)}
				</div>
				<div className="d-flex justify-content-center mt-1">
					{loadingChange && (
						<span style={{ color: "gray" }}>Przetwarzam żądanie...</span>
					)}
					{rankChange && !loadingChange && (
						<span style={{ color: "green" }}>Ranga została zmieniona</span>
					)}
					{errorRanks && !loadingChange && (
						<span style={{ color: "red" }}>Błąd przy zmienianiu rangi</span>
					)}
				</div>

				{chosenUser && chosenUser.rankName != "Admin" && (
					<div className="d-flex justify-content-center flex-column">
						<hr className="hr-line" />
						<div className="d-flex justify-content-center">
							<h4>Zarządanie blokadami użytkowników</h4>
						</div>

						<div className="d-flex flex-row justify-content-center mb-3">
							<Form.Control
								style={{ width: "500px" }}
								placeholder="Wpisz komentarz do zakładanej blokady"
								value={blockComment ? blockComment : ""}
								onChange={(e) => setBlockComment(e.target.value)}
							/>
						</div>

						<div className="d-flex flex-row gap-2 justify-content-center">
							<Button
								style={{ width: "120px" }}
								disabled={chosenUser.rankName == "Blocked" ? true : false}
								onClick={handleBlock}
							>
								Zablokuj
							</Button>
							<Button
								style={{ width: "120px" }}
								disabled={chosenUser.rankName == "Blocked" ? false : true}
								onClick={handleUnblock}
							>
								Odblokuj
							</Button>
						</div>

						{userHistory?.history.length > 0 ? (
							<>
								<div className="d-flex justify-content-center mt-3">
									<h5>Historia założonych blokad</h5>
								</div>

								{userHistory.history.map((history, index) => {
									return (
										<div key={index} className="d-flex flex-column mb-2 text-center history-report">
											<span>
												Blokowany przez: {history.userBlockingNick} (
												{history.userBlockingRankName})
											</span>
											<span>Komentarz do blokady: {history.comment}</span>
											<span>
												Data założenia blokady:{" "}
												{DbDateConvert(history.start).time}{" "}
												{DbDateConvert(history.start).date}
											</span>
										</div>
										// <span key={index}>
										// 	Blokował: {history.userBlockingNick} Komentarz:{" "}
										// 	{history.comment}
										// </span>
									);
								})}
							</>
						) : (
							<div className="d-flex justify-content-center mt-3">
								<h5>Brak historii założonych blokad</h5>
							</div>
						)}
					</div>
				)}
				{/* {chosenUser && (
					<div className="d-flex justify-content-center mt-1">
						{loadingBlock || loadingUnblock && (
								<span style={{ color: "gray" }}>Przetwarzam żądanie...</span>
							)}
						{((block && !loadingBlock) || (unblock && !loadingUnblock)) && (
							<span style={{ color: "green" }}>
								Status blokady został zaktualizowany
							</span>
						)}
						{errorRanks && !loadingChange && (
								<span style={{ color: "red" }}>Błąd przy zmienianiu rangi</span>
							)}
					</div>
				)} */}
			</div>
		</>
	);
}
