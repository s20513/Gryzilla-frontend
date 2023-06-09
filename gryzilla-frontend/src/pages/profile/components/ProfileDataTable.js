import { Container, Row, Col, Button } from "react-bootstrap";
import { DbDateConvert } from "../../../utils/DataUtlis";

export default function ProfileDataTable({profile}) {
	return (
		<Container className="content-container content-wrapper">
			<Row>
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
			</Row>
		</Container>
	);
}
