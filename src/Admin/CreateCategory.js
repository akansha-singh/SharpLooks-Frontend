import React,{useState} from 'react';
import {API} from '../config';
import { Form,Button,Container,Col,Row} from 'react-bootstrap';
import axios from 'axios';
import {isAuthenticated} from '../auth/index';


const CreateCategory=()=> {
    const {userId,token}=isAuthenticated();

    const [CategoryState, setCategoryState] = useState({
        name: "",
        error:"",
        success:""
    });

    const handleChange = (e) => setCategoryState({
        ...CategoryState,
        [e.target.name]: [e.target.value],
    });

    const handleSubmit=(event)=> {
        event.preventDefault();
  
        axios.post(`${API}/category/create/${userId}`, {
            name: event.target[0].value,
            
        },{headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Accept:'application/json',
            Authorization:`Bearer ${token}`
        }})
        .then(function(response) {
            console.log(response.data);
            setCategoryState({success: 'Success'});
            //window.location.href="/";
        })
        .catch((err)=> {
            console.log(err.response);   
            setCategoryState({error: err.response.data.message})
        });        
      }

      
    return (
        <Container style={{textAlign: 'left'}}>
            <center><h3>CREATE CATEGORY</h3></center><hr/>
            <Row>
          <Col lg="4"><img src={require('../images/undraw_experience_design_eq3j.svg')} alt="Avatar" style={{width:'80%',marginLeft:'30px'}}/></Col>
          <Col lg="8"><br/><br/>
        <Row>
            <Col></Col>
            <Col xs={6}>
                {CategoryState.success ? <div className="alert alert-success" role="alert">{CategoryState.success}</div> : null}
                {CategoryState.error ? <div className="alert alert-danger" role="alert">{CategoryState.error}</div> : null}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicname">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" name="name" placeholder="Enter name" onChange={handleChange} value={CategoryState.name ||""}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Add Category
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

export default CreateCategory
