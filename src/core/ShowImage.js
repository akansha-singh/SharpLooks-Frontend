import React from "react";
import { API } from "../config";
import {Card} from 'react-bootstrap';

const ShowImage = ({ item, url }) => ( 
    <Card.Img
        src={`${API}/${url}/photo/${item._id}`}
        alt={item.name}
        variant="top"
    />
);

export default ShowImage;
