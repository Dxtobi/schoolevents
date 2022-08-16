import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Container } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './../../actions/userAction';
function Header ( { setSearch } ) {

    const history = useHistory();

    const dispatch = useDispatch();
    const userLogin = useSelector( state => state.userLogin );
    const { userInfo } = userLogin;

    const logoutHandler = async () => {
        await dispatch( logout() );
        history.push( '/' );
    };


    return (
        <Navbar bg="primary" expand="lg" variant='dark'>
            <Container>
                <Link to='/'>
                    <Navbar.Brand>FPB SCHOOL EVENTS</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className='m-auto'>
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="mr-2"
                                aria-label="Search"
                                onChange={ ( e ) => setSearch( e.target.value ) }
                            />
                        </Form>
                    </Nav>
                    { userInfo ? <Nav>
                        <Nav.Link>
                            <Link to='/myevents'>
                                My Events
                            </Link>
                        </Nav.Link>
                        <NavDropdown title={ userInfo?.name } id="navbarScrollingDropdown">
                            <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>

                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item
                                onClick={ logoutHandler }
                            >
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav> : <Nav.Link>
                        <Link to='/login'>
                            Login
                        </Link>
                    </Nav.Link> }

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
