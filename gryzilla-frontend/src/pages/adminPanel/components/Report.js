import { useState } from "react";
import { Button } from "react-bootstrap";
import ResolveButton from "./ResolveButton";
import { Link, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { DbDateConvert } from "../../../utils/DataUtlis";

export default function Report({ urlResolve, urlLink, reportData, idContentName, setChosenUser }) {
	const [fullData, setFullData] = useState(false);
	const [isResolved, setIsResolved] = useState(() => reportData.viewed);
	const navigate = useNavigate();

	const idReport = "" + reportData[idContentName] + reportData.idUser + reportData.idReason;

	const handleChooseUser = () => {
		setChosenUser({nickReported: reportData.nickReported, reason: reportData.reasonName});
	}

	return (
		<div className="content-container">
			{fullData ? (
				<>
					<div style={{ color: isResolved ? "gray" : "" }}>
						<span>ID zgłoszenia: {idReport}</span>
						<span> Utworzono: {DbDateConvert(reportData.reportedAt).time + " " + DbDateConvert(reportData.reportedAt).date}</span>
						<hr className="hr-line" />
                        <Link to={urlLink} className="article-title"><span style={{textDecoration: "underline"}}>Zgłaszana treść</span></Link>
						<div>Powód zgłoszenia: {reportData.reasonName}</div>     
						<div>Komentarz do zgłoszenia: {reportData.content}</div>
						<div>Twórca zgłoszonej treści: <Link to={`/profile/${reportData.idUserReported}`}><Button className={"btn-secondary"} style={{padding: "0px 4px"}}>{reportData.nickReported}</Button></Link></div> 
					</div>
					<hr className="hr-line" />
					<div className="d-flex justify-content-center gap-3 mt-2">
						<Button onClick={() => setFullData(false)}>Zwiń</Button>
						<ResolveButton
							url={urlResolve}
							data={reportData}
							idContent={{ [idContentName]: reportData[idContentName] }}
							isResolved={isResolved}
                            setIsResolved={setIsResolved}
						/>
						<Button className="btn-info" onClick={() => handleChooseUser()}>Wyszukiwanie użytkownika</Button>
					</div>
				</>
			) : (
				<div style={{ color: isResolved ? "gray" : "" }} onClick={() => setFullData(true)}>
					<span>ID zgłoszenia: {idReport}</span>
				</div>
			)}
		</div>
	);
}
