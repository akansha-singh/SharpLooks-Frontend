import React,{useState} from 'react';
import {Card,Button} from 'react-bootstrap';
import {Badge} from 'reactstrap';
import { Link} from 'react-router-dom';
import moment from 'moment';
import {addItem,updateItem,removeItem} from './cartHelper';
import ShowImage from './ShowImage'
import {RemoveCircle,AddCircle,AddShoppingCart,Delete,IndeterminateCheckBox,AddBox} from '@material-ui/icons';
import {ShoppingCartSharp} from '@material-ui/icons';


const Cards=({product,showProductVieIconButtonwButton,showCategory,showStock,showTime,showAddtoCart,showDesc,cartUpdate})=> {

  const [redirect,setRedirect]=useState(false);
  const [count, setCount] = useState(product.cout);

  const addToCart=()=>{
    addItem(product);
  }

  const handleDecrement=()=>{
    console.log(count);
    setCount(count<=1?1:(count-1));
    console.log(count);
    updateItem(product._id,count);
  }

  const handleIncrement=()=>{
    console.log(count);
    setCount(count>=product.quatity?product.quatity:(count+1));
    console.log(count);
    updateItem(product._id,count);
  }

  const RemoveCartItem=()=>{
    removeItem(product._id);
  }

  
  const showCartUpadteOptions=()=>{
      return <Card.Text>
              <center><IndeterminateCheckBox onClick={handleDecrement} style={{width:'32px',cursor:'pointer',color:'#1E90FF'}}/>
              <span><b>{count}</b></span>
              <span><AddBox onClick={handleIncrement} style={{width:'32px',cursor:'pointer',color:'#1E90FF'}}/></span>
              <br/>
              <Button variant="outline-danger" size="sm" onClick={RemoveCartItem}>Remove<Delete style={{fontSize:'19px',marginRight:'2px'}}/></Button>
              </center>
              </Card.Text>
  }

  return (
    
      <Card style={{textAlign: 'left',textDecoration:'none'}}>
        <Link to={`/product/${product._id}`}>
        <ShowImage item={product} url="products" /></Link>
        <Card.Body>
          <Card.Title style={{fontSize:'18px',color:'#000000'}}>{product.name}</Card.Title>
          {showDesc&&<Card.Text>
            <span style={{fontSize:'16px',color:'grey'}}>{product.description}</span>
          </Card.Text>}
          <Card.Text><span style={{color:'#000000'}}>Rs.{product.price}</span></Card.Text>
          {showCategory&&<Card.Text>
            Category:{product.category._id}
            
          </Card.Text>}
          {cartUpdate&&showCartUpadteOptions()}
          {showTime&&<Card.Text>
            Added on {moment(product.createdAt).fromNow()}
          </Card.Text>}
          {showStock&&product.quatity>0&&<h5><Badge color="info" pill>Intock</Badge></h5>}
    
          {showAddtoCart&&<Button variant="outline-primary" onClick={addToCart} size="sm">AddToCart
            <ShoppingCartSharp style={{fontSize:'16px',marginLeft:'6px'}}/>
          </Button>}
        </Card.Body>
      </Card>
  )
}

export default Cards
