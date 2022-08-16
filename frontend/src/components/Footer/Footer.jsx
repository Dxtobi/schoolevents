import React from 'react';
import { Col, Container } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer style={ {
            width: '100%',
            position: 'relative',
            button: 0,
            display: 'flex',
            justifyContent: 'center'
        } }>
            <Container>
                        <div className='footer-form-holder'>
                            <div className='sub-details'>Subscribe for School Update</div>
                            <input className='footer-input' placeholder='Email' />
                            <button className='submit-btn'>Subscribe</button>
                        </div>
                    <Col className='text-center py-3'>Developed for FPB</Col>
            </Container>
        </footer>
    );
};

export default Footer;
