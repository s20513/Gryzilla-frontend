import { useState } from "react";
import { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {


    const navigate = useNavigate();
    const [searchPhrase, setSearchPhrase] = useState("");

    const handleSubmit = () => {
        if(searchPhrase)
            navigate(`/search/phrase/${searchPhrase}`)
        else
            navigate('/search')
    }

	return (
		<Form className="d-flex ">
			<Form.Control
				type="search"
				placeholder="Szukana fraza"
				aria-label="Search"
                onChange={(e)=>setSearchPhrase(e.target.value)}
			/>
			<Button onClick={() => handleSubmit()} variant="outline-success" className="ms-1">
				Szukaj
			</Button>
		</Form>
	);
}
