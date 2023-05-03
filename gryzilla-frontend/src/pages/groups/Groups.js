import { Container } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import GroupPreview from "./GroupPreview";

export default function Groups() {

    const [data, errorData, loadingData] = useAxios({
		method: "GET",
		url: `/groups/`,
		headers: { accept: "*/*" },
	});

    return (
        <Container className="main-panel">
			<h3>Grupy</h3>
            {data && data.map((group) => {
                return <GroupPreview data={group}/>
            })}
        </Container>
    );
}