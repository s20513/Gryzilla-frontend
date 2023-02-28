import { Form } from "react-bootstrap";

export default function InputMockup(props) {
    return (
        <div className="content-container" onClick={() => props.handleClick()}>
            <Form.Control type="email" placeholder={props.children} />
            <Form.Text className="text-muted">
                Kliknij w pole aby pokazać edytor treści 
            </Form.Text>
        </div>
    );
}