import React, { useState } from 'react';
import { 
    Collapse,
    Navbar,
    NavbarToggler,
    // NavbarBrand,
    Nav,
    NavItem,
    // NavLink,
 } from "reactstrap";
 import { useParams, NavLink } from "react-router-dom";

 function NavigationBar(props) {
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed)
    const params = useParams()
    console.log(params)

    return (
        <div className="navbar">
            <Navbar>
                {/* <NavbarBrand href='/'>JiM-CHAT</NavbarBrand> */}
                <NavbarToggler onClick={toggleNavbar} />
                <Collapse isOpen={!collapsed} navbar>
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
                </Collapse>
            </Navbar>
        </div>
    )
 }

 export default NavigationBar