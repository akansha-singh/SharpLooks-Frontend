import React,{useState,useEffect} from 'react';
import {API} from '../config';
import { Form,Button,Container,Col,Row} from 'react-bootstrap';
import axios from 'axios';
import {isAuthenticated} from '../auth/index';


const CreateProduct=()=> {
    const {userId,token}=isAuthenticated();

    const [ProductState, setProductState] = useState({
        name: "",
        description:"",
        price:"",
        category:"",
        categories:[],
        quantity:"",
        sold:"",
        shipping:"",
        loading:true,
        error:"",
        success:""
    });

    const handleChange = (e) => setProductState({
        ...ProductState,
        [e.target.name]: [e.target.value],
    });

    useEffect(() => {
      axios.get(`${API}/categories`)
      .then(res => {
          console.log(res.data.categories);
          setProductState({categories:res.data.categories,loading:false});
      })
      .catch(err => {
        console.log(err.message);
      })
  }, []);



    const handleSubmit=(event)=> {
        event.preventDefault();

        let myForm = document.getElementById('myForm');
        
        const formdata = new FormData(myForm);
        for (var value of formdata.values()) {
          console.log(value);
       }

       //console.log(formdata.getAll(name));

       return axios({
          method: 'POST',
          url:`${API}/product/create/${userId}`,
          data: formdata,
          headers:{
            'Content-Type': 'multipart/form-data',
            Authorization:`Bearer ${token}`
          }
        })
        .then(function(response) {
            console.log(response.data);
            setProductState({success: 'Success'});
            //window.location.href="/";
        })
        .catch((err)=> {
            console.log(err.response);   
            setProductState({error: err.response.data.message})
        });        
      }

     

      if (ProductState.loading) {
        return <div><center><img src={require('../images/gif.gif')}/></center></div>;
      }else{
      return (
      <Container style={{textAlign: 'left',marginTop:'-50px'}}>
        <center><h3>CREATE PRODUCT</h3></center><hr/>
        <Row>
          <Col lg="4"><img src={require('../images/undraw_Landing_page_re_6xev.svg')} alt="Avatar" style={{width:'80%',marginLeft:'20px',marginTop:'40px'}}/></Col>
          <Col lg="2"></Col>
          <Col lg="6">
          <br/><br/>
                    {ProductState.success ? <div className="alert alert-success" role="alert">{ProductState.success}</div> : null}
                    {ProductState.error ? <div className="alert alert-danger" role="alert">{ProductState.error}</div> : null}
                    <Form onSubmit={handleSubmit} id="myForm" name="myForm">
                        <Form.Group controlId="formBasicname">
                          <Form.Label>Product Name</Form.Label>
                          <Form.Control type="text" name="name" placeholder="Enter Product name" onChange={handleChange} value={ProductState.name ||""}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicname">
                          <Form.Label>Description</Form.Label>
                          <Form.Control as="textarea" name="about" rows="3" placeholder="Description" onChange={handleChange} value={ProductState.about ||""}/>
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formBasicname">
                              <Form.Label>Price</Form.Label>
                              <Form.Control type="number" name="price" min="0" placeholder="Enter price" onChange={handleChange} value={ProductState.price ||""}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formBasicname">
                              <Form.Label>Category</Form.Label>
                              <Form.Control as="select" name="category" onChange={handleChange} value={ProductState.category||""}>

                                {ProductState.categories&&ProductState.categories.map((c,i)=>{
                                  return <option key={i} value={c._id}>{c.name}</option>
                                })}

                              </Form.Control>
                            </Form.Group>
                        </Form.Row>
                              
                        <Form.Row>
                        <Form.Group as={Col} controlId="formBasicname">
                            <Form.Label>Quatity</Form.Label>
                            <Form.Control type="number" min="0" name="quantity" placeholder="Enter Quatity" onChange={handleChange} value={ProductState.quantity ||""}/>
                        </Form.Group>
                              
                        <Form.Group as={Col} controlId="formBasicname">
                              <Form.Label>Shipping</Form.Label>
                              <Form.Control as="select" name="shipping" onChange={handleChange} value={ProductState.shipping ||""}>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Group>
                            <Form.File name="photo" label="Upload Image" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                          Add Product
                        </Button>
                    </Form>
              
                
          </Col>   
          </Row> 
        </Container>
      )
      }
    
}

export default CreateProduct
