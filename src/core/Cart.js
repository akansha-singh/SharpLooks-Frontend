import React,{useEffect,useState} from 'react'
import {getCart} from './cartHelper';
import {Container,Row,Col,CardColumns} from 'react-bootstrap';
import Card from './Card'
import Checkout from './Checkout'

const Cart=()=> {
    const [items,setItems]=useState([])

    useEffect(() => {
        setItems(getCart());
    }, [])
    
    

    return (
        <Container style={{marginTop:'-40px'}}>
            <h4>CART HAS {`${items.length}`} ITEMS</h4><hr/><br/>
            <Row>
              <Col lg="8" xs="12">
                <Row>
                    {items.map((product,i)=>(<Col lg="3" xs="6" key={i}><Card product={product} showDesc={false} showProductViewButton={true} showCategory={false} showStock={false} showTime={false} showAddtoCart={false} cartUpdate={true}/></Col>))}  
                </Row>
              </Col>
              <Col lg="4" xs="12">
                <Container><h4>CART SUMMARY</h4></Container>
                <hr/>
                <Checkout products={items}/>
              </Col>              
            </Row>
        </Container>
    )
}

export default Cart
//product={product} showDesc={false} showProductViewButton={true} showCategory={false} showStock={false} showTime={false} showAddtoCart={false} cartUpdate={true}