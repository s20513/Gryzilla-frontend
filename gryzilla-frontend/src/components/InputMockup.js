import { Form } from "react-bootstrap";

export default function InputMockup(props) {
    return (
        <div className="content-container mt-2" onClick={() => props.handleClick()}>
            <Form.Control type="email" placeholder={props.children || props.placeHolder} />
            <Form.Text className="text-muted">
                Kliknij w pole, aby pokazać edytor treści 
            </Form.Text>
        </div>
    );
}