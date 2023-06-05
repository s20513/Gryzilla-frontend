import { Container } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import GroupPreview from "./GroupPreview";
import { Link } from "react-router-dom";
import InputMockup from "../../components/InputMockup";
import LoadingBanner from "../../components/LoadingBanner";
import Require from "../../context/Require";

export default function Groups() {
	const [data, errorData, loadingData] = useAxios({
		method: "GET",
		url: `/groups/`,
		headers: { accept: "*/*" },
	});

	return (
		<Container className="main-panel">
			<h3>Grupy</h3>
			<Require req={{ authLogged: true }}>
				<Link to={"/groups/new"}>
					<InputMockup>Utwórz nową grupę...</InputMockup>
				</Link>
			</Require>

			{data &&
				data.map((group) => {
					return <GroupPreview key={group.idGroup} data={group} />;
				})}

			<LoadingBanner
				loading={loadingData}
				error={errorData}
				placeHolder={"Ładowanie grup"}
			/>
		</Container>
	);
}
