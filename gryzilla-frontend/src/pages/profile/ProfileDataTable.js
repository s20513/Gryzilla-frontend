export default function ProfileDataTable() {
    return (
        <Container className="content-container content-wrapper">
								<Row>
									<Col>
										<span>Nick:</span>
									</Col>
									<Col>{profile && <span>{profile.nick}</span>}</Col>
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
										<span>User since:</span>
									</Col>
									<Col>{profile && <span>{profile.createdAt}</span>}</Col>
								</Row>
							</Container>
    )
}