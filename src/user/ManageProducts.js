import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getAllProducts, deleteProduct } from "../core/ApiCore";
import {TabPane,Table} from 'reactstrap';
import {Badge} from 'reactstrap';
import {Delete} from '@material-ui/icons';
import {Button} from 'react-bootstrap';


const ManageProducts = () => {
    const [products, setProducts] = useState([]);

    const { userId, token } = isAuthenticated();

    const loadProducts = () => {
        getAllProducts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    const destroy = productId => {
        deleteProduct(productId, userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <TabPane tabId="6">
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">
                        Total {products.length} products
                    </h2>
                    <hr />
                    <Table striped bordered hover>
                    <tbody>
                        {products.map((p, i) => (
                            <tr key={i} striped bordered hover>
                                <td><strong>{p.name}</strong></td>
                                <td><Link to={`/admin/product/update/${p._id}`}>
                                    <Button variant="outline-warning" size="sm">Update</Button>
                                    </Link>
                                </td>
                                <td><Delete onClick={() => destroy(p._id)} style={{fontSize:'24px',color:'red'}}/></td>
                            </tr>
                        ))}
                    </tbody>
                    </Table>
                    <br />
                </div>
            </div>
        </TabPane>                    
    );
};

export default ManageProducts;