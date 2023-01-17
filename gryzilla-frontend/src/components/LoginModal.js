import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyVerticallyCenteredModal(props) {

    const [email, setEmail] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

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
            const response = axios.post(`/users/login`, {nick: email, password: password});
            setData(response.data);
            console.log(data);
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
          Zaloguj się
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
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Zapamiętaj dane logowania" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Zaloguj się
            </Button>
        </Form>
      </Modal.Body>
{/* 
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}