import React from 'react';
import { 
    Navbar,
    NavbarBrand,
 } from "reactstrap";
 import { NavLink } from "react-router-dom";

 function NavigationBar(props) {

    return (
        <>
            <Navbar>
                <NavbarBrand href='/'>JiM-CHAT</NavbarBrand>

                <NavLink style={{ color: 'var(--black)', textDecoration: 'none'}} to={'/feed/' + props.currentId}>View Message Rooms</NavLink>

                <NavLink style={{ color: 'var(--black)', textDecoration: 'none'}} to={"/user/" + props.currentId}>View Profile</NavLink>

                <NavLink style={{ color: 'var(--black)', textDecoration: 'none'}} onClick={props.clickLogout} to={'/'}>Log Out</NavLink>

            </Navbar>
        </>
    );
 }

 export default NavigationBar;