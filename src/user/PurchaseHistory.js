import React, { useState, useEffect } from "react";
import { TabPane } from 'reactstrap';
import { isAuthenticated } from "../auth";
import { getPurchaseHistory } from "../core/ApiCore";
import moment from "moment";

const PurchaseHistory = () => {
    const [history, setHistory] = useState([]);

    
    const userId = isAuthenticated().userId;
    const token = isAuthenticated().token;

    const init = (userId, token) => {
        getPurchaseHistory(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
              console.log(data);
              setHistory(data);
            }
        });
    };

    useEffect(() => {
        init(userId, token);
    }, []);


    const purchaseHistory = history => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Purchase history</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {history.map((h, i) => {
                            return (
                                <div>
                                    <hr />
                                    {h.products.map((p, i) => {
                                        return (
                                            <div key={i}>
                                                <h6>Product name: {p.name}</h6>
                                                <h6>
                                                    Product price: ${p.price}
                                                </h6>
                                                <h6>
                                                    Purchased date:{" "}
                                                    {moment(
                                                        p.createdAt
                                                    ).fromNow()}
                                                </h6>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </li>
                </ul>
            </div>
        );
    };

    return (
            <TabPane tabId="2">
                <div className="col-12">
                  {purchaseHistory(history)}
                </div>
            </TabPane>
    )
};

export default PurchaseHistory;