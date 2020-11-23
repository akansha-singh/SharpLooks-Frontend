import {API} from '../config';

export const authenticate=(data)=>{
    if(typeof window!=="undefined"){
        localStorage.setItem("jwt",JSON.stringify(data));
    }
};

export const updateUser=(data)=>{
    if(typeof window!=="undefined"){
        if(localStorage.getItem('jwt')){
            let auth=JSON.parse(localStorage.getItem('jwt'));
            auth.user=data;
            localStorage.setItem("jwt",JSON.stringify(data));
        }
    }
};

export const signout=()=>{
    if(typeof window!=="undefined"){
        localStorage.removeItem("jwt");
        return fetch(`${API}/signout`,{
            method:"GET"
        })
        .then(response=>{
            console.log("signout",response);
            window.location.href="/SignIn";
        })
        .catch(err=>console.log(err));
    }
}


export const isAuthenticated=()=>{
    if(typeof window=="undefined"){
        return false;
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"));
    }else{
        return false;
    }

}
