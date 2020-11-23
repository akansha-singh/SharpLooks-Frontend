import React,{useState,useEffect} from 'react';
import {getFilteredProducts,getCategories} from './ApiCore';
import Card from  './Card'
import {CardColumns,Container,Row,Col} from 'react-bootstrap';
import Checkbox from './Checkbox';
import Radiobox from './RadioBox';
import {prices} from './FixedPrices';
import Search from './Search';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import { useGradientBtnStyles } from '@mui-treasury/styles/button/gradient';

const Shop=()=> {
    const styles = useGradientBtnStyles();
    const [myFilters,setMyFilters]=useState({
        filters:{category:[],price:[]}
    })
    const [categories,setCategories]=useState([]);
    const [limit,setLimit]=useState(6);
    const [skip,setSkip]=useState(0);
    const [size,setSize]=useState(0);
    const [filteredResults,setFilteredResults]=useState([]);


    const loadCategories=()=>{
        getCategories().then(data=>{
            console.log(data);
            setCategories(data);    
        })
    }

    const loadFilteredProducts=(newFilters)=>{
        getFilteredProducts(skip,limit,newFilters).then(data=>{
            setFilteredResults(data.data);
            setSize(data.size);
            setSkip(0);
        });
    }

    const loadMore=()=>{
        let toSkip=skip+limit;
        getFilteredProducts(toSkip,limit,myFilters).then(data=>{
            setFilteredResults([...filteredResults,...data.data]);
            setSize(data.size);
            setSkip(toSkip);
        });
    }

    const loadMorebutton=()=>{
        return (
            size>0&&size>=limit&&(
                <><Button classes={styles} onClick={loadMore}>LoadMore</Button><br/><br/></>
            )
        )
    }

    useEffect(()=>{
        loadCategories();
        loadFilteredProducts();
    },[])
    
    const handleFilters=(filters,filterby)=>{
        //console.log('SHOP',filters,filterby)
        const newFilters={...myFilters};
        newFilters.filters[filterby]=filters;

        if(filterby=="price"){

            let priceValues=handlePrice(filters);
            newFilters.filters[filterby]=priceValues;
            console.log(newFilters);
        }
        loadFilteredProducts(myFilters.filters);
        setMyFilters(newFilters);
    }

    const handlePrice=value=>{
        const data=prices;
        let array=[];
        for(let key in data){
            if(data[key]._id===parseInt(value)){
                array=data[key].array;
            }
        }
        return array;
    }


    return (
        <Container style={{textAlign: 'left',marginTop:'-40px',height:'1000px',overflowY: 'scroll'}}>
            <Row>
              <Col lg={4} xs={5}>
                  
                  <h4>FILTER BY CATEGORY</h4><hr/><br/>
                  <Checkbox categories={categories} handleFilters={filters=>handleFilters(filters,"category")}/>
                  <br/><br/>
                  <h4>FILTER BY PRICE</h4><hr/><br/>
                  <RadioGroup defaultValue=""><Radiobox prices={prices} handleFilters={filters=>handleFilters(filters,"price")}/></RadioGroup>
              </Col>
              <Col lg={8} xs={7} style={{height:'1000px',overflowY: 'scroll'}}>
                <h3>PRODUCTS</h3><hr/><br/>
                <CardColumns>
                    {console.log(filteredResults)}
                    {filteredResults.map((product,i)=><Card key={i} product={product} showDesc={true} showProductViewButton={true} showCategory={false} showStock={false} showTime={false} showAddtoCart={true} cartUpdate={false}/>)}
                </CardColumns><br/>
                <center>{loadMorebutton()}</center>
                
              </Col>
            </Row>
        </Container>
        
    )
}

export default Shop
