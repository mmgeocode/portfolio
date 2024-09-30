import React, { useState } from 'react';
import { 
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
 } from "reactstrap";

 function NavigationBar(props) {
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed)

    return (
        <div className="navbar">
            <Navbar>
                <NavbarBrand href='/'>JiM-CHAT</NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} />
                <Collapse isOpen={!collapsed} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink href='/feed/:id'>View Message Rooms</NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink href='/user/:id'>View Profile</NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink onClick={props.clickLogout} href='/'>Log Out</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
 }

 export default NavigationBar