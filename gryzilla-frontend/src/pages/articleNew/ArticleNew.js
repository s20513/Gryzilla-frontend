import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import ContentInput from "../../components/Editor/ContentInput";

export default function ArticleNew() {
	const params = useParams();
	const navigate = useNavigate();

    const addNewArticle = (newArticle) => {
        console.log("dodano artykuł")
		const idArticle = newArticle.idArticle;
		navigate(`/articles/${idArticle}`)
    }

	return (
		<Container className="main-panel">
			<h3>Tworzenie nowego artykułu</h3>

			<ContentInput
					addNew={addNewArticle}
					url={'/articles'}
					method={'POST'}
					apiData={ {} }
					enableTags={true}
                    enableTitle={true}
					placeHolder={"Wprowadz nowy artykuł..."}
				/>
		</Container>
	);
}
