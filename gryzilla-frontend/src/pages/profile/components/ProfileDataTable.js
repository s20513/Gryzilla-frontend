import { Container, Row, Col, Button } from "react-bootstrap";
import { DbDateConvert } from "../../../utils/DataUtlis";

export default function ProfileDataTable({ profile }) {
	return (
		<Container className="content-container content-wrapper">
			<div>
				<span className="article-label table-label">Użytkownik: </span>
				{profile && <span>{profile.nick}</span>}
			</div>

			<hr className="hr-line" />

			<div>
				<span className="article-label table-label">Email: </span>
				{profile && <span>{profile.email}</span>}
			</div>

			<hr className="hr-line" />

			<div>
				<span className="article-label table-label">Phone: </span>
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
