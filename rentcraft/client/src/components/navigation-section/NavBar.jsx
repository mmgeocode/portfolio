import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, NavbarBrand, NavItem } from 'reactstrap';

function NavBar(props) {
  return (
    <>
        {/* <div className="navigation"> */}
            <Navbar >
              <NavbarBrand href='/'>RentCraft</NavbarBrand>

              <NavLink to={"/main"} style={{textDecoration: "none", color: "var(--primary)"}}>Units</NavLink>

              <NavLink to={"/tenants"} style={{textDecoration: "none", color: "var(--primary)"}}>Tenants</NavLink>

              <NavLink to={"/payments"} style={{textDecoration: "none", color: "var(--primary)"}}>Payments</NavLink>

              <NavLink to={"/account"} style={{textDecoration: "none", color: "var(--primary)"}}>Account</NavLink>

              <NavLink to={"/"} onClick={props.clickLogout} style={{textDecoration: "none", color: "var(--primary)"}}>Log Out</NavLink>
            </Navbar>
        {/* </div> */}
    </>
  );
}


export default NavBar;