import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import ContentInput from "../../components/Editor/ContentInput";

export default function ArticleEdit() {
	const params = useParams();
	const navigate = useNavigate();

	const [data, errorData, loadingData] = useAxios({
		method: "GET",
		url: `/articles/${params.idArticle}`,
		headers: { accept: "*/*" },
	});

	const addNewArticle = (newArticle) => {
		console.log("dodano artykuł");
		const idArticle = newArticle.idArticle;
		navigate(`/articles/${idArticle}`);
	};

	return (
		<Container className="main-panel">
			<h3>Edycja artykułu</h3>

			{data && (
				<ContentInput
                    initialContent={data}
					addNew={addNewArticle}
					url={`/articles/${params.idArticle}`}
					method={"PUT"}
					apiData={{idArticle: params.idArticle}}
					enableTags={true}
					enableTitle={true}
					placeHolder={"Wprowadź nowy artykuł..."}
                    handleClose={()=>navigate(`/articles/${params.idArticle}`)}
				/>
			)}
		</Container>
	);
}
