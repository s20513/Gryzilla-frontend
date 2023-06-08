import useAxios from "../../hooks/useAxios";
import Report from "./components/Report";

export default function ReportedArticleComments({setChosenUser}) {

	const [reportedArticleComments, error, loading] = useAxios({
		method: "GET",
		url: `/reportCommentArticle`,
		headers: { accept: "*/*" },
	});

	return (
		<>
			{reportedArticleComments &&
				reportedArticleComments.map((post, index) => {
					return (
						<Report
							key={index}
							urlResolve={"/reportCommentArticle"}
							urlLink={"/articles/" + post.idArticle + "/" + post.idComment}
							reportData={post}
							idContentName={"idComment"}
							setChosenUser={setChosenUser}
						/>
					);
				})}
		</>
	);
}
