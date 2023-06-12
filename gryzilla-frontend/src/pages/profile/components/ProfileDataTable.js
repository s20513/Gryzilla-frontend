import { Container, Row, Col, Button } from "react-bootstrap";
import { DbDateConvert } from "../../../utils/DataUtlis";

function getNickRank(nick, rank) {
	if (rank == "Admin") {
		return (
			<span style={{ color: "#E2F920", width: "200px" }}>
				{nick} ~Administrator
			</span>
		);
	} else if (rank == "Moderator") {
		return (
			<span style={{ color: "#78E54F", width: "200px" }}>
				{nick} ~Moderator
			</span>
		);
	} else if (rank == "Redactor") {
		return (
			<span style={{ color: "#1EEAF1", width: "200px" }}>{nick} ~Redaktor</span>
		);
	} else if (rank == "User") {
		return <span style={{ width: "200px" }}>{nick}</span>;
	} else if (rank == "Blocked") {
		return <span style={{ color: "#E04830", width: "200px" }}>{nick}</span>;
	}
}

export default function ProfileDataTable({ profile }) {
	return (
		<Container className="content-container content-wrapper">
			{profile.rankName == "Blocked" && (
				<>
					<span className="text-center" style={{ color: "#E04830" }}>
						Użytkownik posiada założoną blokadę konta
					</span>
					<hr className="hr-line" />
				</>
			)}
			<div>
				<span className="article-label table-label">Użytkownik: </span>
				{profile && getNickRank(profile.nick, profile.rankName)}
			</div>

			<hr className="hr-line" />

			<div>
				<span className="article-label table-label">Email: </span>
				{profile && <span>{profile.email}</span>}
			</div>

			<hr className="hr-line" />

			<div>
				<span className="article-label table-label">Telefon: </span>
				{profile && <span>{profile.phoneNumber}</span>}
			</div>

			<hr className="hr-line" />

			<div>
				<span className="article-label table-label">Użytkownik od: </span>
				{profile && <span>{DbDateConvert(profile.createdAt).date}</span>}
			</div>

			{/* <Row>
				<Col>
					<span>Nick:</span>
				</Col>
				<Col>{profile && <span>{profile.nick} {profile.idUser}</span>}</Col>
			</Row>
			<Row>
				<Col>
					<hr className="hr-line" />
				</Col>
			</Row>
			<Row>
				<Col>
					<span>Email:</span>
				</Col>
				<Col>{profile && <span>{profile.email}</span>}</Col>
			</Row>
			<Row>
				<Col>
					<hr className="hr-line" />
				</Col>
			</Row>
			<Row>
				<Col>
					<span>Phone:</span>
				</Col>
				<Col>{profile && <span>{profile.phoneNumber}</span>}</Col>
			</Row>
			<Row>
				<Col>
					<hr className="hr-line" />
				</Col>
			</Row>
			<Row>
				<Col>
					<span>Użytkownik od:</span>
				</Col>
				<Col>{profile && <span>{DbDateConvert(profile.createdAt).date}</span>}</Col>
			</Row> */}
		</Container>
	);
}
