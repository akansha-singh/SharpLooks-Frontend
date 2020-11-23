import React from 'react'
import { Card, CardTitle, CardText, TabPane} from 'reactstrap';

const PaymentMethod=()=> {
    return (
        <TabPane tabId="3">
            <Card body style={{textAlign: 'left'}}>
              <CardTitle>Payment Method</CardTitle>
              <CardText>You Can't Saved Your Payment Method yet.</CardText>
            </Card>
        </TabPane>
    )
}

export default PaymentMethod
