import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyVerticallyCenteredModal(props) {

    const [loginPanel, setLoginPanel] = useState(true);

    const [email, setEmail] = useState("string");
    const [emailError, setEmailError] = useState(null);
    const [password, setPassword] = useState("string");
    const [passwordError, setPasswordError] = useState(null);

    const [birthDate, setBirthDate] = useState(null);
    const [nick, setNick] = useState(null);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect( ()=> {
        console.log({email : email, password : password});
    }, [email, password]);

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onHide();
        proccedLogin();
        //console.log('submit')

    };

    const proccedLogin = () => {
        try {
            const response = axios.post(`/users/login`, {nick: "string", password: "string"});
            setData(response.data);
            console.log(response)
            setError(null);
        } catch(err) {
            setError(err.message);
            setData(null);
        } finally {
            setLoading(false);
        }
    }

    return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      contentClassName="main-panel custom-modal-content"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {loginPanel ? "Zaloguj się" : "Załóż konto"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control onChange={e => {setEmail(e.target.value)}} type="text" placeholder="Enter email" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Hasło</Form.Label>
                <Form.Control onChange={e => {setPassword(e.target.value)}} type="password" placeholder="Password" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            {!loginPanel && <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Hasło</Form.Label>
                <Form.Control onChange={e => {setPassword(e.target.value)}} type="password" placeholder="Password" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>}

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Zapamiętaj dane logowania" />
            </Form.Group>

            <Button variant="primary" type="submit">
                {loginPanel ? "Zaloguj się" : "Wyślij"}
            </Button>
            <br/>
            <p1 style={{textAlign: "center;"}} onClick={() => setLoginPanel(!loginPanel)} >
                {loginPanel ? "Załóż nowe konto" : "Zaloguj się"}
            </p1>
        </Form>
      </Modal.Body>
{/* 
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}