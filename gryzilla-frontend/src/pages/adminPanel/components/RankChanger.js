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

export default function RankChanger({chosenUserFromReport}) {
	const [nick, setNick] = useState("");
	const nickDebounce = useDebounce(nick, 400);

	const [chosenUser, setChosenUser] = useState(null);
	const [chosenRank, setChosenRank] = useState(null);

    useEffect(() => {
        console.log(chosenUserFromReport)
        setNick(chosenUserFromReport);
    },[chosenUserFromReport])

	const [users, error, loading, runRequest] = useAxios({
		method: "GET",
		url: `/search/getUsersByName`,
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

	useEffect(() => {
		if (!nickDebounce) return;
		runRequest({
			params: { nick: nickDebounce },
		});
	}, [nickDebounce]);

	const handleSubmit = () => {
		if (!chosenUser || !chosenRank) return;
		runRequestChange({
			data: { idUser: chosenUser.idUser, idRank: chosenRank.idRank },
		});
	};

	return (
		<>
			<div className="content-container pt-3 pb-3">
				<div className="d-flex justify-content-center">
					<InputGroup className="mb-3" style={{ width: "500px" }}>
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
								nickDebounce && !loading && users?.length > 0 ? false : true
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
					{chosenUser && (
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
										ranks.map((rank) => {
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
					)}
				</div>
				<div className="d-flex justify-content-center mt-3">
					{chosenRank && chosenUser && chosenRank.name !== chosenUser.rankName && (
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
			</div>
		</>
	);
}
