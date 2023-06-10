import { Container, Row, Col, Button } from "react-bootstrap";
import { DbDateConvert } from "../../../utils/DataUtlis";

export default function GroupDataTable({ group }) {
	return (
		<Container className="content-container content-wrapper ">
			<div>
				<span className="article-label table-label">Nazwa: </span>
				{group && <span>{group.groupName}</span>}
			</div>

			<hr className="hr-line" />

			<div>
				<span className="article-label table-label">Opis: </span>
				{group && <span>{group.content}</span>}
			</div>

			<hr className="hr-line" />

			<div>
				<span className="article-label table-label">Liczba członków: </span>
				{group && <span>{group.users.length}</span>}
			</div>

			<hr className="hr-line" />

			<div>
				<span className="article-label table-label">Założyciel: </span>
				{group && <span>{group.nick}</span>}
			</div>

			<hr className="hr-line" />

			<div>
				<span className="article-label table-label">Założono: </span>
				{group && <span>{DbDateConvert(group.createdAt).date}</span>}
			</div>
			{/* 
			<Row>
				<Col>
					<span>Nazwa:</span>
				</Col>
				<Col></Col>
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
			</Row>  */}
		</Container>
	);
}
