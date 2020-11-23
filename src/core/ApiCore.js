import {API} from '../config';
import axios from 'axios';


export const getProducts=(sortBy)=> {
    return axios.get(`${API}/products?sortBy=${sortBy}&order=desc&limit=8`)
    .then(res => {
        console.log(res.data);   
        return res.data;
    })
    .catch(err => {
      console.log(err.message);
    })
}


export const getAllProducts=()=> {
  return axios.get(`${API}/products`)
  .then(res => {
      console.log(res.data);   
      return res.data;
  })
  .catch(err => {
    console.log(err.message);
  })
}


export const getCategories=()=> {
  return axios.get(`${API}/categories`)
      .then(res => {
          console.log(res.data.categories);
         return res.data.categories;
      })
      .catch(err => {
        console.log(err.message);
      })
}


export const getFilteredProducts=(skip,limit,filters={})=> {
  const datas={
    limit,
    skip,
    filters
  };
  return axios({
    method: "POST",
    url:`${API}/products/by/search`,
    data: JSON.stringify(datas),
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*', 
        Accept:'application/json'
    }
  })
  .then(res => {
      console.log(res.data);   
      return res.data;
  })
  .catch(err => {
    console.log(err.message);
  })
}



export const read=(productId)=>{
  return axios.get(`${API}/product/${productId}`)
    .then(res => {
        console.log(res.data);
       return res.data;
    })
    .catch(err => {
      console.log(err);
  })
}


export const listRelated=(productId)=>{
  return axios.get(`${API}/products/related/${productId}`)
    .then(res => {
        console.log(res.data);
       return res.data;
    })
    .catch(err => {
      console.log(err);
  })
}


//export const getBraintreeClientToken=(userId,token)=>{
//  return axios({
//    method: "GET",
//    url:`${API}/braintree/getToken/${userId}`,
//    headers: {
//        'Content-Type': 'application/json;charset=UTF-8',
//        'Access-Control-Allow-Origin': '*', 
//        Accept:'application/json',
//        Authorization:`Bearer ${token}`
//    }
//  })
//    .then(res => {
//        console.log(res.data);
//       return res.JSON();
//    })
//    .catch(err => {
//      console.log(err);
//  })
//}


export const getBraintreeClientToken = (userId, token) => {
  return fetch(`${API}/braintree/getToken/${userId}`, {
      method: "GET",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
      }
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};







export const processPayment = (userId, token, paymentData) => {
  return fetch(`${API}/braintree/payment/${userId}`, {
      method: "POST",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(paymentData)
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};




export const createOrder = (userId, token, createOrderData) => {
  return fetch(`${API}/order/create/${userId}`, {
      method: "POST",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ order: createOrderData })
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};





export const listOrders = (userId, token) => {
  return fetch(`${API}/order/list/${userId}`, {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
      }
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};




export const getStatusValues = (userId, token) => {
  return fetch(`${API}/order/status-values/${userId}`, {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
      }
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};




export const updateOrderStatus = (userId, token, orderId, status) => {
  return fetch(`${API}/order/${orderId}/status/${userId}`, {
      method: 'PUT',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status, orderId })
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};




export const getPurchaseHistory = (userId, token) => {
  return fetch(`${API}/users/orders/by/user/${userId}`, {
      method: "GET",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
      }
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};






export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

