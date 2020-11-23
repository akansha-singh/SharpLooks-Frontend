import React from 'react'
import {Container,Row,Col} from 'react-bootstrap';
import {
    Info,
    InfoCaption,
    InfoSubtitle,
    InfoTitle,
  } from '@mui-treasury/components/info';

const CategoryCard=({category,i})=> {


    return (
        <Col style={{color:'#ffffff',borderRadius:'10px',padding:'20px',marging:'5px',width:'auto',backgroundImage:`url(${'https://img.freepik.com/free-photo/colorful-gradient-watercolor-paint-old-paper-with-grain-smudg_43300-1484.jpg?size=626&ext=jpg&ga=GA1.2.1354126964.1586504369'})`}}>
            <Info>
              <InfoTitle>{category.name}</InfoTitle>
            </Info>
        </Col>
    )
}

export default CategoryCard
