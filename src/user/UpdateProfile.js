import React,{useState} from 'react';
import {API} from '../config';
import {Form,Button,Container,Col,Row} from 'react-bootstrap';
import axios from 'axios';
import {updateUser} from '../auth/index';
import {isAuthenticated} from '../auth/index';
import {TabPane} from 'reactstrap';


const UpdateProfile=()=> {
    const {name,about,userId,email,token}=isAuthenticated();

    const [userState, setUserState] = useState({
        name: name,
        about: about,
        email: email,
        error:""
    });

    const handleChange = (e) => setUserState({
        ...userState,
        [e.target.name]: [e.target.value],
    });

    const handleSubmit=(event)=> {
      event.preventDefault();

        axios.put(`${API}/users/user/${userId}`, {
                name: event.target[0].value,
                about: event.target[1].value,
                email: event.target[2].value
            },{headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Accept:'application/json',
                Authorization:`Bearer ${token}`
            }})
            .then(function(response) {
                console.log(response.data.token);
                updateUser(response.data); 
                window.location.href="/";
            })
            .catch((err)=> {
                console.log(err.response);   
                setUserState({error: err.response.data.message})
            });        
    }

    
    return (
        <TabPane tabId="5">
            <Container style={{textAlign: 'left'}} >
            <Row>
                <center><h4>Update Profile</h4></center>
                <Col xs={12}>
                    {userState.error ? <div className="alert alert-danger" role="alert">{userState.error}</div> : null}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicname">
                          <Form.Label>Name</Form.Label>
                          <Form.Control type="text" name="name" placeholder="Enter name" onChange={handleChange} value={userState.name ||""}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicname">
                          <Form.Label>Description</Form.Label>
                          <Form.Control as="textarea" name="about" rows="3" placeholder="Description" onChange={handleChange} value={userState.about ||""}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                          <Form.Label>Email address</Form.Label>
                          <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange} value={userState.email ||""}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicCheckbox">
                          <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                          Update
                        </Button>
                    </Form>
                </Col>
               
            </Row>
            </Container>
        </TabPane>
    )
}

export default UpdateProfile



