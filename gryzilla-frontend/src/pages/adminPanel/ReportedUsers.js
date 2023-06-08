import useAxios from "../../hooks/useAxios";
import Report from "./components/Report";

export default function ReportedUsers({setChosenUser}) {
	const [reportedPosts, error, loading] = useAxios({
		method: "GET",
		url: `/reportUser/all`,
		headers: { accept: "*/*" },
	});

	return (
		<>
			{reportedPosts &&
				reportedPosts.map((post, index) => {
					return (
						<Report
							key={index}
							urlResolve={"/reportUser"}
							urlLink={"/profile/" + post.idUserReported}
							reportData={post}
							idContentName={"idReport"}
							setChosenUser={setChosenUser}
						/>
					);
				})}
		</>
	);
}
