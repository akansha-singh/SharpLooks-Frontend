import React from 'react'
import { Card, Button,Container, CardTitle, CardText, TabPane} from 'reactstrap';
import {isAuthenticated} from '../auth/index';


const Profile=()=> {

    const {name,about,userId,email,role}=isAuthenticated()
    
    return (
        <TabPane tabId="1">
            <Card body style={{textAlign: 'left'}}>
              <CardTitle><b>WELCOME {name}</b></CardTitle><hr/>
              <CardText>From your Admin dashboard. you can easily create Products and Categories and manage Orders and Products.</CardText>
              <Button color="info">Shop</Button>
            </Card>
            
        </TabPane>
    )
}

export default Profile
