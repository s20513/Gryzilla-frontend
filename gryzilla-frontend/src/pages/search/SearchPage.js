import { Container } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import PostsSearch from "./PostsSearch";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import InputGroup from "react-bootstrap/InputGroup";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import ArticlesSearch from "./ArticlesSearch";
import ProfileSearch from "./ProfilesSearch";
import GroupSearch from "./GroupSearch";

export default function SearchPage() {
	const params = useParams();
	const navigate = useNavigate();

	const [searchType, setSearchType] = useState(() => {
		return params.searchType ? params.searchType : "phrase";
	});
	const [searchPhrase, setSearchPhrase] = useState(() => {
		return params.searchPhrase ? params.searchPhrase : "";
	});
	const debouncedSearchPhrase = useDebounce(searchPhrase, 500);

	useEffect(() => {
		setSearchPhrase(params.searchPhrase ? params.searchPhrase : "");
	}, [navigate]);

	useEffect(() => {
		if (searchPhrase)
			navigate(`/search/${searchType}/${debouncedSearchPhrase}`);
		else navigate("/search");
	}, [debouncedSearchPhrase, searchType]);

	const getPolishSearchtype = () => {
		return searchType === "phrase" ? "fraza" : "tag";
	};

	return (
		<Container className="main-panel">
			<h3>Wyszukiwanie</h3>
			<div>
				<InputGroup className="mb-3">
					<DropdownButton
						variant="outline-secondary"
						title={getPolishSearchtype()}
						id="input-group-dropdown-1"
					>
						<Dropdown.Item onClick={() => setSearchType("phrase")}>
							Wyszukiwanie po frazie i tagu
						</Dropdown.Item>
						<Dropdown.Item onClick={() => setSearchType("tag")}>
							Wyszukiwanie po tagu lub frazie
						</Dropdown.Item>
					</DropdownButton>

					<Form.Control
						onChange={(e) => setSearchPhrase(e.target.value)}
						placeholder="Szukana fraza"
						value={searchPhrase}
						aria-label="Text input with dropdown button"
					/>
				</InputGroup>
			</div>
			<Tabs
				defaultActiveKey="posts"
				id="fill-tab-example"
				transition={true}
				className="tabs-style mb-3"
				justify
			>
				<Tab eventKey="posts" title="Posty">
					<PostsSearch
						searchPhrase={debouncedSearchPhrase}
						searchType={searchType}
					/>
				</Tab>
				<Tab eventKey="articles" title="Artykuły">
					<ArticlesSearch
						searchPhrase={debouncedSearchPhrase}
						searchType={searchType}
					/>
				</Tab>
				<Tab eventKey="users" title="Użytkownicy">
					<ProfileSearch
						searchPhrase={debouncedSearchPhrase}
						searchType={searchType}
					/>
				</Tab>
				<Tab eventKey="groups" title="Grupy">
					<GroupSearch
						searchPhrase={debouncedSearchPhrase}
						searchType={searchType}
					/>
				</Tab>
			</Tabs>
			{!debouncedSearchPhrase && (
				<div className="content-container text-center">
					Wprowadz dane do wyszukiwania aby uzyskać wyniki
				</div>
			)}
		</Container>
	);
}
