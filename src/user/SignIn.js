import React,{useState} from 'react';
import {API} from '../config';
import { Form,Button,Container,Col,Row} from 'react-bootstrap';
import axios from 'axios';
import {authenticate} from '../auth/index'


const SignIn=() =>{
    const [userState, setUserState] = useState({
        email: '',
        password:'',
        error:'',
        success:''
    });

    //var values={userState.email,userState.password};

    const handleChange = (e) => setUserState({
        ...userState,
        [e.target.name]: [e.target.value],
    });

    const handleSubmit=(event)=> {
        event.preventDefault();
        console.log(event.target[0].value);
        console.log(event.target[1].value);
       
        axios({
            method: "POST",
            url:`${API}/users/login`,
            data: JSON.stringify({email:event.target[0].value,password:event.target[1].value}),
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*', 
                Accept:'application/json'
            }
          })
          .then((response)=>{
              console.log(response.data);  
              authenticate(response.data);   
              setUserState({success: 'Login Successful'});  
              if(response.data.role===1){
                window.location.href="/";
              }else{
                window.location.href="/";
              }  
          })
          .catch((err)=> {
            console.log(err.response);   
            setUserState({error: err.response.data.message})
          }); 
    }
    return (
        <Container style={{textAlign: 'left',marginTop:'-40px'}}>
          <center><h3>Sign In</h3></center><hr/><br/>
            <Row>
              <Col lg="4"><img src={require('../images/undraw_mobile_login_ikmv.svg')} alt="Avatar" style={{width:'90%',marginLeft:'30px'}}/></Col>
              <Col lg="8"><br/><br/>
                  <Row>
                    <Col></Col>
                    <Col xs={5}>
                    {userState.success ? <div className="alert alert-success" role="alert">{userState.success}</div> : null}
                    {userState.error ? <div className="alert alert-danger" role="alert">{userState.error}</div> : null}
                    <Form onSubmit={handleSubmit}>
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

export default SignIn
