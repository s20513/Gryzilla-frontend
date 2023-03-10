import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import ContentInput from "../../components/Editor/ContentInput";

export default function ArticleNew() {
	const params = useParams();

    const addNewArticle = () => {
        console.log("dodano artykuł")
    }

	return (
		<Container className="main-panel">
			<h3>Szczegóły artykułu</h3>

			<ContentInput
					addNew={addNewArticle}
					url={'/articles'}
					method={'POST'}
					apiData={ {idUser: 6} }
					enableTags={true}
                    enableTitle={true}
					placeHolder={"Wprowadz nowy artykuł..."}
				/>

			<h3>Komentarze</h3>
		</Container>
	);
}
