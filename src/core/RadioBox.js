import React,{useState,useEffect, Fragment} from 'react';
import {Form} from 'react-bootstrap';
import Radio from '@material-ui/core/Radio';

const Radiobox=({prices,handleFilters})=> {

    const [value,setValue]=useState(0);

    const handleChange=(event)=>{
        console.log(event.target.value);
        handleFilters(event.target.value);
        setValue(event.target.value)
    }

    return prices.map((c,i)=>(
        <span key={i}>
            <span><Radio name={c} value={`${c._id}`} onChange={handleChange}/></span><span><Form.Label>{c.name}</Form.Label></span>
        </span>
    ));
};

export default Radiobox
