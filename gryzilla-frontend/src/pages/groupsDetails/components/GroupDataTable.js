import { Container, Row, Col, Button } from "react-bootstrap";
import { DbDateConvert } from "../../../utils/DataUtlis";

export default function GroupDataTable({group}) {
	return (
		<Container className="content-container content-wrapper">
			<Row>
				<Col>
					<span>Nazwa:</span>
				</Col>
				<Col>{group && <span>{group.groupName}</span>}</Col>
			</Row>
			<Row>
				<Col>
					<hr className="hr-line" />
				</Col>
			</Row>
			<Row>
				<Col>
					<span>Opis:</span>
				</Col>
				<Col>{group && <span>{group.content}</span>}</Col>
			</Row>
			<Row>
				<Col>
					<hr className="hr-line" />
				</Col>
			</Row>
            <Row>
				<Col>
					<span>Liczba członków:</span>
				</Col>
				<Col>{group && <span>{group.users.length}</span>}</Col>
			</Row>
			<Row>
				<Col>
					<hr className="hr-line" />
				</Col>
			</Row>
			<Row>
				<Col>
					<span>Założyciel:</span>
				</Col>
				<Col>{group && <span>{group.nick}</span>}</Col>
			</Row>
			<Row>
				<Col>
					<hr className="hr-line" />
				</Col>
			</Row>
			<Row>
				<Col>
					<span>Założono:</span>
				</Col>
				<Col>{group && <span>{DbDateConvert(group.createdAt).date}</span>}</Col>
			</Row>
		</Container>
	);
}
