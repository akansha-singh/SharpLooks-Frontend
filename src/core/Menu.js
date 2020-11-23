import React, { Fragment } from 'react';
import { Navbar,Nav,Container} from 'react-bootstrap';
import { NavLink,withRouter} from 'react-router-dom';
import {signout,isAuthenticated} from '../auth/index';
import {itemTotal} from './cartHelper';
import {ShoppingCartSharp,LocalMall,Dashboard,ExitToApp,Home} from '@material-ui/icons';


const isActive=(history,path)=> {
    if(history.location.pathname===path){
        return {marginRight:'20px',color:'#ffffff',marginTop:'auto',marginBottom:"auto"}
    }else{
        return {marginRight:'20px',color:'#C0C0C0',marginTop:'auto',marginBottom:"auto"}
    }
}

//const onmouseenter=(e)=>{
//    e.target.style.color='#ffffff';
//}
//const onmouseleave=(e)=>{
//    e.target.style.color='#808080';
//}

const Menu=(props)=> {
  const {role}=isAuthenticated();

  console.log(isAuthenticated());
    return (
        <Container style={{paddingBottom:'140px'}}>
            <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <NavLink to="/"><Navbar.Brand to="/" style={{marginRight:'30px',color:'#ffffff'}}><Home style={{fontSize:'21px',marginRight:'2px'}}/>SharpLooks</Navbar.Brand></NavLink>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                {role!==1&&<NavLink to="/user/dashboard" className="m-1" style={isActive(props.history,'/user/dashboard')}>User Dashboard</NavLink>}
                {role===1&&<NavLink to="/admin/dashboard" className="m-1" style={isActive(props.history,'/admin/dashboard')}>Admin Dashboard</NavLink>}
                <NavLink to="/Shop" className="m-1" style={isActive(props.history,'/Shop')}>Shop<LocalMall style={{fontSize:'17px',marginRight:'2px'}}/></NavLink>
                <NavLink to="/Cart" className="m-1" style={isActive(props.history,'/Cart')}>Cart
                    <ShoppingCartSharp style={{fontSize:'17px',marginLeft:'2px'}}/>
                    <sup style={{color:'#ffffff'}}><b><i>{' '}{itemTotal()}</i></b></sup>
                </NavLink>
              </Nav>
             
              <Nav>
                {! isAuthenticated()&&<Fragment><NavLink to="/SignUp" className="m-1" style={isActive(props.history,'/SignUp')}>SignUp</NavLink>
                <NavLink to="/SignIn" className="m-1" style={isActive(props.history,'/SignIn')}>SignIn</NavLink></Fragment>}
                {isAuthenticated()&&<Nav.Link href=""><span onClick={signout} ><ExitToApp style={{fontSize:'19px',marginRight:'2px'}}/>SignOut</span></Nav.Link>}                
              </Nav>
            </Navbar.Collapse>
            </Navbar>
        </Container>
    )
}

export default withRouter(Menu);
