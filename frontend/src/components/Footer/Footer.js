import React, {useState} from 'react';
import { Col, Container } from 'react-bootstrap';
//import { useDispatch, useSelector } from 'react-redux';
import {  } from '../../actions/eventsAction';



const Footer = () => {
    const [email, setEmail] = useState('')
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
                    <input onChane={(e)=>setEmail(e.target.value) } value={email} className='footer-input' placeholder='Email' />
                            <button className='submit-btn' onClick={()=>setEmail('')}>Subscribe</button>
                        </div>
                    <Col className='text-center py-3'>Developed for FPB</Col>
            </Container>
        </footer>
    );
};

export default Footer;
