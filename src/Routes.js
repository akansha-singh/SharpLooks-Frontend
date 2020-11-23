import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SignUp from "./user/SignUp";
import SignIn from "./user/SignIn";
import Home from "./core/Home";
import Menu from "./core/Menu";
import PrivateRoute from './auth/PrivateRoute';
import UserDashboard from './user/UserDashboard';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';
import CreateProduct from './Admin/CreateProduct';
import CreateCategory from './Admin/CreateCategory';
import Shop from './core/Shop';
import Product from './core/Product';
import Orders from './Admin/Orders';
import Cart from './core/Cart';
import UpdateProduct from './Admin/UpdateProduct';
import UpdateCategory from './Admin/UpdateCategory';


export class Routes extends Component {
    render() {
        return (
            <div>
                <Menu/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/SignUp" component={SignUp}/>
                    <Route exact path="/SignIn" component={SignIn}/>
                    <Route exact path="/Shop" component={Shop}/>
                    <Route exact path="/Cart" component={Cart}/>
                    <Route exact path="/product/:productId" component={Product}/>
                    <PrivateRoute exact path="/user/dashboard" component={UserDashboard}/>
                    <AdminRoute exact path="/create/category" component={CreateCategory}/>
                    <AdminRoute exact path="/create/product" component={CreateProduct}/>
                    <AdminRoute path="/admin/orders" exact component={Orders} />
                    <AdminRoute exact path="/admin/dashboard" component={AdminDashboard}/>
                    <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
                    <AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategory} />
                    <Redirect to="/" />
                </Switch>
            </div>
        );
    }
}

export default Routes;

