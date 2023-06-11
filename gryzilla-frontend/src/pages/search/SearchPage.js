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
	const [searchData, setSearchData] = useState(() => {
		return params.searchData ? params.searchData : "posts";
	});

	const debouncedSearchPhrase = useDebounce(searchPhrase, 500);

	useEffect(() => {
		setSearchPhrase(params.searchPhrase ? params.searchPhrase : "");
		setSearchData(params.searchData ? params.searchData : "");
	}, [navigate]);

	const test = () => {
		console.log("click");
		setSearchData("articles");
	};

	useEffect(() => {
		if (searchPhrase)
			navigate(`/search/${searchData}/${searchType}/${debouncedSearchPhrase}`);
		else navigate(`/search/${searchData}`);
	}, [debouncedSearchPhrase, searchType, searchData]);

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
							Wyszukiwanie po frazie
						</Dropdown.Item>
						<Dropdown.Item onClick={() => setSearchType("tag")}>
							Wyszukiwanie po tagu
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
				//defaultActiveKey={searchData}
				activeKey={searchData}
				id="fill-tab-example"
				transition={true}
				className="tabs-style mb-3"
				justify
				onSelect={(key) => setSearchData(key)}
			>
				<Tab				
					eventKey="posts"
					title="Posty"
				>
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

				<Tab
					eventKey="users"
					title="Użytkownicy"
				>
					<ProfileSearch
						searchPhrase={debouncedSearchPhrase}
						searchType={searchType}
					/>
				</Tab>
				<Tab
					eventKey="groups"
					title="Grupy"
				>
					<GroupSearch
						searchPhrase={debouncedSearchPhrase}
						searchType={searchType}
					/>
				</Tab>
			</Tabs>
			{!debouncedSearchPhrase && (
				<div className="content-container text-center">
					Wprowadź dane do wyszkukania, aby uzyskać wyniki
				</div>
			)}
		</Container>
	);
}
