import React from 'react'
import { Card, Button,Container, CardTitle, CardText, TabPane} from 'reactstrap';
import {isAuthenticated} from '../auth/index';


const Profile=()=> {

    const {name,about,userId,email,role}=isAuthenticated()
    
    return (
        <TabPane tabId="1">
            <Card body style={{textAlign: 'left'}}>
              <CardTitle><b>WELCOME {name}</b></CardTitle><hr/>
              <CardText>From your account dashboard. you can easily check & view your recent orders, manage your shipping and billing addresses and edit your account details.</CardText>
              <Button color="info">Shop</Button>
            </Card>
            
        </TabPane>
    )
}

export default Profile
