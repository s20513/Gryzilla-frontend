import { Container } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import GroupPreview from "./GroupPreview";
import { Link } from "react-router-dom";
import InputMockup from "../../components/InputMockup";

export default function Groups() {

    const [data, errorData, loadingData] = useAxios({
		method: "GET",
		url: `/groups/`,
		headers: { accept: "*/*" },
	});

    return (
        <Container className="main-panel">
			<h3>Grupy</h3>
            <Link to={"/groups/new"}><InputMockup>Utwórz nową grupę...</InputMockup></Link>
            {data && data.map((group) => {
                return <GroupPreview data={group}/>
            })}
        </Container>
    );
}