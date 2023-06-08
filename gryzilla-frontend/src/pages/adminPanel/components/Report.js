import { useState } from "react";
import { Button } from "react-bootstrap";
import ResolveButton from "./ResolveButton";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { DbDateConvert } from "../../../utils/DataUtlis";

export default function Report({ urlResolve, urlLink, reportData, idContentName, setChosenUser }) {
	const [fullData, setFullData] = useState(false);
	const [isResolved, setIsResolved] = useState(() => reportData.viewed);

	const idReport = "" + reportData[idContentName] + reportData.idUser + reportData.idReason;

	const handleChooseUser = () => {
		setChosenUser(reportData.nickReported);
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
						<div>Właściciel zgłoszonej treści: <Button className={"btn-secondary"} onClick={() => handleChooseUser()}>{reportData.nickReported} Id: {reportData.idUserReported}</Button></div> 
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
