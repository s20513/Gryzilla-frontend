import { useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import Report from "./components/Report";

export default function ReportedPostComments() {
	const [reportedPostsComments, error, loading] = useAxios({
		method: "GET",
		url: `/reportCommentPost`,
		headers: { accept: "*/*" },
	});

	return (
		<>
			{reportedPostsComments &&
				reportedPostsComments.map((post, index) => {
					return (
						<Report
							key={index}
							urlResolve={"/reportCommentPost"}
							urlLink={"/posts/" + post.idPost + "/" + post.idComment}
							reportData={post}
							idContentName={"idComment"}
						/>
					);
				})}
		</>
	);
}
