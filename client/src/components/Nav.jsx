import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Avatar, Button } from "@nextui-org/react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";


function Nav() {
    const Navigate = useNavigate();
    const { authUser, isLoggedIn, setIsLoggedIn } = useContext(AuthContext)

    useEffect(() => {
        console.log("user: ", authUser)
        console.log("loggedin: ", isLoggedIn)
    }, [isLoggedIn, authUser])

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const handleUserLogout = async (e) => {
        e.preventDefault()
        const response = axios.post('/api/logout', { withCredentials: true })
        console.log(response)
        setIsLoggedIn(false)
        localStorage.removeItem('isLoggedIn')
        Navigate('/')
    }

    const menuItems = [
        <Link to="/">Home</Link>,
        <Link to="/user/dashboard">Dashboard</Link>,
        <Link to="/user/achievements">My Achievements</Link>,
        <Link to="/user/profile">Profile</Link>,
        <Button color="danger" onClick={handleUserLogout}>Logout</Button>
    ];

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="full" isBordered >
            <NavbarContent justify="start">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <p className="font-bold">MAHE0X</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link to="/">Home</Link>
                </NavbarItem>
                {(isLoggedIn) ?
                    <>
                        <NavbarItem>
                            <Link to="/user/dashboard">Dashboard</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link to="/user/achievements">
                                My Achievements
                            </Link>
                        </NavbarItem>
                    </>
                    : null}
            </NavbarContent>

            {(isLoggedIn) ?
                <>
                    <NavbarContent justify="end">
                        <NavbarItem>
                            <Button className="max-sm:hidden" color="danger" onClick={handleUserLogout}>Logout</Button>
                        </NavbarItem>
                        <NavbarItem className="lg:flex">
                            <Link to="/user/profile">
                                <Avatar isFocusable /* src=" " */ />
                            </Link>
                        </NavbarItem>
                    </NavbarContent>
                </>
                : null}
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={
                                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            className="w-full"
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}

export default Nav;