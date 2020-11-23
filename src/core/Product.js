import React,{useState,useEffect} from 'react';
import {read,listRelated} from './ApiCore';
import {Container,Row,Col,CardColumns} from 'react-bootstrap';
import Card from './Card';

const Product=(props)=> {

    const [product,setProduct]=useState({});
    const [relatedproduct,setRelatedProduct]=useState([]);
    const [error,setError]=useState(false);
    
    const loadSingleProduct=productId=>{
        read(productId).then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                setProduct(data);
                listRelated(data._id).then(data=>{
                    if(data.error){
                        setError(data.error)
                    }else{
                        setRelatedProduct([...relatedproduct,...data]);
                    }
                });
            }
        });
    };

    useEffect(()=>{
        const productId=props.match.params.productId;
        loadSingleProduct(productId)
    },[])

    return (
        <Container style={{marginTop:'-10px'}}>
            <Row>
                <Col xs="5">
                    <Card product={product} showDesc={true} showProductViewButton={false} showCategory={false} showStock={true} showTime={true} showAddtoCart={true} cartUpdate={false}/>
                </Col>
                <Col xs="1"></Col>
                <Col xs="6">
                    <h3>Related Product</h3>
                    <Row>
                        {relatedproduct.map((product,i)=><Col lg="4" key={i} ><Card product={product} showDesc={false} showProductViewButton={true} showCategory={false} showStock={false} showTime={false} showAddtoCart={true} cartUpdate={false}/></Col>)}
                    </Row>
                </Col>
               
            </Row>
        </Container>
    )
}

export default Product
