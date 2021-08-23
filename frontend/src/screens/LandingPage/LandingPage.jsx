import React, { useEffect } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import './LandingPage.css';
import { useHistory } from 'react-router-dom';

const LandingPage = () => {

    const history = useHistory();

    useEffect( () => {
        const userInfo = localStorage.getItem( 'userInfo' );
        if ( userInfo ) {
            history.push( '/myevents' );
        }
    }, [ history ] );


    return (
        <div className='main'>
            <Container>
                <Row><div className='intro-text'>
                    <div>
                        <h1 className='title'>Welcome to EvenX</h1>
                        <p className='subtitle'>A place to manage events</p>
                    </div>
                    <div className='buttonContainer'>
                        <a href='/login'>
                            <Button
                                size='lg'
                                className='landingbutton'
                            >
                                Login
                            </Button>
                        </a>
                        <a href='/register'>
                            <Button
                                size='lg'
                                className='landingbutton'
                                variant='outline-primary'
                            >
                                Register
                            </Button>
                        </a>
                    </div>
                </div></Row>
            </Container>
        </div>
    );
};

export default LandingPage;
