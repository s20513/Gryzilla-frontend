import useAxios from "../../hooks/useAxios";
import Report from "./components/Report";

export default function ReportedPosts({setChosenUser}) {
	const [reportedPosts, error, loading] = useAxios({
		method: "GET",
		url: `/reportPost/all`,
		headers: { accept: "*/*" },
	});

	return (
		<>
			{reportedPosts &&
				reportedPosts.map((post, index) => {
					return (
						<Report
							key={index}
							urlResolve={"/reportPost"}
							urlLink={"/posts/" + post.idPost}
							reportData={post}
							idContentName={"idPost"}
							setChosenUser={setChosenUser}
						/>
					);
				})}
		</>
	);
}
