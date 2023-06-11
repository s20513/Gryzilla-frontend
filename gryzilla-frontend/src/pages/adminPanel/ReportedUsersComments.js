
import useAxios from "../../hooks/useAxios";
import Report from "./components/Report";

export default function ReportedUsersComments({setChosenUser}) {
	const [reportedUserComments, error, loading] = useAxios({
		method: "GET",
		url: `/reportProfileComment/all`,
		headers: { accept: "*/*" },
	});

	return (
		<>
			{reportedUserComments &&
				reportedUserComments.map((userComment, index) => {
					return (
						<Report
							key={index}
							urlResolve={"/reportProfileComment"}
							urlLink={`/profile/${userComment.idUserProfile}`}
							reportData={userComment}
							idContentName={"idProfileComment"}
							setChosenUser={setChosenUser}
						/>
					);
				})}
		</>
	);
}
