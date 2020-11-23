import React,{useState,useEffect} from 'react';
import {getProducts,getCategories} from './ApiCore';
import CategoryCard from './CategoryCard'
import Card from './Card'
import {CardColumns,Container,Row,Col} from 'react-bootstrap';


const Home=()=> {

const [productsBySell,setProductsBySell]=useState([]);
const [productsByArrival,setProductsByArrival]=useState([]);
const [categories,setCategories]=useState([]);
const [error,setError]=useState(false);

const loadProductsBySell=()=>{
    getProducts('sold').then(data=>{
        console.log(data);
        setProductsBySell(data);    
    })
}

const loadProductsByArrival=()=>{
    getProducts('createdAt').then(data=>{
        console.log(data);
        setProductsByArrival(data);    
    })
}

const loadCategories=()=>{
    getCategories().then(data=>{
        console.log(data);
        setCategories(data);    
    })
}

useEffect(()=>{
    loadProductsByArrival();
    loadProductsBySell();
    loadCategories();
},[])

    return (
        <Container style={{textAlign: 'left',marginTop:'-40px'}}>
            {/*<center><h3>CATEGORIES</h3></center><hr/><br/>
            <Row>
               {categories.map((category,i)=><Col key={i} lg="3" xs="6"><CategoryCard i={i} category={category}/></Col>)}
            </Row><br/><br/>*/}
            <center><h3>BEST SELLER</h3></center><hr/><br/>
            <Row>
                {productsBySell.map((product,i)=><Col key={i} lg="3" xs="6"><Card product={product} showDesc={true} showProductViewButton={true} showCategory={false} showStock={false} showTime={false} showAddtoCart={true} cartUpdate={false}/></Col>)}
            </Row><br/><br/>
            <center><h3>PRODUCTS BY ARRIVAL</h3></center><hr/><br/>
            <Row>
                {productsByArrival.map((product,i)=><Col key={i} lg="3" xs="6"><Card product={product} showDesc={true} showProductViewButton={true} showCategory={false} showStock={false} showTime={false} showAddtoCart={true} cartUpdate={false}/></Col>)}
            </Row>
        </Container>
        
    )
}

export default Home
