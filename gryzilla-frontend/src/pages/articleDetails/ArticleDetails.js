import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import ArticleComments from "./ArticleComments";
import LikeButton from "../../components/LikeButton";
import OptionDropdown from "../../components/OptionDropdown";
import ReportModal from "../../components/modals/ReportModal";
import DeleteModal from "../../components/modals/DeleteModal";
import { useEffect, useState } from "react";

export default function ArticleDetails() {
	const params = useParams();
	const naviagte = useNavigate();
	const idCommentHighlight = params.idComment ? params.idComment : null;

	const [showReportModal, setShowReportModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const [isDeleted, setIsDeleted] = useState(false);

	useEffect(() => {
		if (!isDeleted) return;
		naviagte("/articles");
	}, [isDeleted]);

	const [data, errorData, loadingDatam, runRequest] = useAxios({
		method: "GET",
		url: `/articles/${params.idArticle}`,
		headers: { accept: "*/*" },
	});

	useEffect(()=>{
		runRequest();
	},[params.idArticle])

	return (
		<Container className="main-panel">
			<h3>Szczegóły artykułu</h3>

			{data && (
				<>
					<div className="content-container">
						<div className="data-bar">
							<LikeButton
								likesNum={data.likesNum}
								id={data.idArticle}
								url={"likesArticle"}
							/>
							<span className="article-title">{data.title}</span>
						</div>
						<hr className="hr-line" />
						<div>
							<div dangerouslySetInnerHTML={{ __html: data.content }}></div>
						</div>
						<span className="article-label">
							Artykuł użytkownika {data.author.nick}, utworzono {data.createdAt}
						</span>

						<div className="lower-tag-container">
							{data &&
								data.tags.map((tag, index) => <span key={index}>#{tag} </span>)}
						</div>
					</div>
					<OptionDropdown
						handleEdit={() => naviagte(`/articles/edit/${data.idArticle}`)}
						handleDelete={()=>setShowDeleteModal(true)}
						handleReport={()=>setShowReportModal(true)}
						upper={false}
						owner={data.author.idUser}
					/>

					<ReportModal
						show={showReportModal}
						setShow={setShowReportModal}
						url={`/reportCommentArticle`}
						reportedContentId={{ idAricle: data.idArticle }}
					/>

					<DeleteModal
						show={showDeleteModal}
						setShow={setShowDeleteModal}
						isDeleted={isDeleted}
						setIsDeleted={setIsDeleted}
						url={`/articles/${data.idArticle}`}
						reportedContentId={{ idArticle: data.idArticle }}
					/>
				</>
			)}

			<h3>Komentarze</h3>

			<ArticleComments data={data} idHighlight={idCommentHighlight} />
		</Container>
	);
}
