import React,{useState} from 'react';
import {API} from '../config';
import { Form,Button,Container,Col,Row} from 'react-bootstrap';
import axios from 'axios';
import {authenticate} from '../auth/index'


const SignUp=()=> {
    const [userState, setUserState] = useState({
        name: "",
        about: "",
        email: "",
        password:"",
        error:""
    });

    const handleChange = (e) => setUserState({
        ...userState,
        [e.target.name]: [e.target.value],
    });

    const handleSubmit=(event)=> {
      event.preventDefault();

        axios.post(`${API}/users/signup`, {
                name: event.target[0].value,
                about: event.target[1].value,
                email: event.target[2].value,
                password: event.target[3].value
            },{headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Accept:'application/json'
            }})
            .then(function(response) {
                console.log(response.data.token);
                authenticate(response.data); 
                if(response.data.role===1){
                  window.location.href="/";
                }else{
                  window.location.href="/";
                }

                //window.location.href="/";
            })
            .catch((err)=> {
                console.log(err.response);   
                setUserState({error: err.response.data.message})
            });        
    }

    
    return (
        <Container style={{textAlign: 'left',marginTop:'-40px'}}>
          <center><h3>Sign Up</h3></center><hr/><br/>
          <Row>
              <Col lg="4"><img src={require('../images/undraw_sign_in_e6hj.svg')} alt="Avatar" style={{width:'100%',marginLeft:'20px',margin:'30px'}}/></Col>
              <Col lg="8"><br/><br/>
                <Row>
                <Col></Col>
                <Col xs={6}>
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
        
                        <Form.Group controlId="formBasicPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} value={userState.password ||""}/>
                        </Form.Group>
                        
                        <Form.Group controlId="formBasicCheckbox">
                          <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
        
                        <Button variant="primary" type="submit">
                          Submit
                        </Button>
                    </Form>
                </Col>
                <Col></Col>
                </Row>
              </Col>
            </Row>
        </Container>
    )
}

export default SignUp



