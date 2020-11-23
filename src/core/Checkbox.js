import React,{useState,useEffect, Fragment} from 'react';
import {Form} from 'react-bootstrap';
import Checkboxs from '@material-ui/core/Checkbox';

const Checkbox=({categories,handleFilters})=> {

const [checked,setChecked]=useState([])

const handleToggle=c=>()=>{
    //return the first index or -1
    const currentCategoryId=checked.indexOf(c)
    const newCheckedCategoryId=[...checked]
    //if currently was not already in checked state>push
    //else pull/take off
    if(currentCategoryId===-1){
        newCheckedCategoryId.push(c)
    }else{
        newCheckedCategoryId.splice(currentCategoryId,1)
    }
    //console.log(newCheckedCategoryId);
    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
}


    return categories.map((c,i)=>(
        <Fragment key={i}>
            <Checkboxs label={c.name} value={checked.indexOf(c._id===-1)} onChange={handleToggle(c._id)}/><Form.Label>{c.name}</Form.Label><br/>
        </Fragment>
    ));
};

export default Checkbox
