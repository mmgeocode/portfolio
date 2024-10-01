import React, { useState } from 'react';
import { 
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    // NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
 } from "reactstrap";
 import { NavLink } from "react-router-dom";

 function NavigationBar(props) {
    // const [collapsed, setCollapsed] = useState(true);
    // const toggleNavbar = () => setCollapsed(!collapsed)
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen)

    return (
            <Navbar>
                <NavbarBrand href='/'>JiM-CHAT</NavbarBrand>
                    <Nav navbar>
                        <NavItem>
                            <NavLink to={'/feed/' + props.currentId}>View Message Rooms</NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink to={"/user/" + props.currentId}>View Profile</NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink onClick={props.clickLogout} to={'/'}>Log Out</NavLink>
                        </NavItem>
                    </Nav>
                {/* <NavbarToggler onClick={toggleNavbar} /> */}
                {/* <Collapse isOpen={!collapsed} navbar> */}
                {/* </Collapse> */}
            </Navbar>
    )
 }

 export default NavigationBar