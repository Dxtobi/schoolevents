import React, { useState, useEffect } from 'react';
import MainScreen from './../../components/MainScreen';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './LoginScreen.css';
import Loading from './../../components/Loading/Loading';
import ErrorMessage from './../../components/ErroMessage/ErrorMessage';
import { login } from './../../actions/userAction';


const LoginScreen = () => {
    const [ email, setEmail ] = useState( '' );
    const [ password, setPassword ] = useState( '' );

    const dispatch = useDispatch();
    const userLogin = useSelector( ( state ) => state.userLogin );
    const { loading, error, userInfo } = userLogin;

    const history = useHistory();

    useEffect( () => {
        if ( userInfo ) {
            history.push( '/myevents' );
        }
    }, [ history, userInfo ] );

    const submitHandler = async ( e ) => {
        e.preventDefault();

        dispatch( login( email, password ) );
    };




    return (
        <MainScreen title='LOGIN'>
            <div className="loginContainer">
                { error && <ErrorMessage variant="danger">{ error }</ErrorMessage> }
                { loading && <Loading /> }
                <Form onSubmit={ submitHandler }>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address: use "t1@email.com"</Form.Label>
                        <Form.Control
                            type="email"
                            value={ email }
                            placeholder="Enter email"
                            onChange={ ( e ) => setEmail( e.target.value ) }
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password: use "1234"</Form.Label>
                        <Form.Control
                            type="password"
                            value={ password }
                            placeholder="Password"
                            onChange={ ( e ) => setPassword( e.target.value ) }
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" style={ { marginTop: 10 } }>
                        Submit
                    </Button>
                </Form>
                <Row className="py-3">
                    <Col style={ { fontSize: 24 } }>
                        New User ? <Link to="/register" style={ { color: '#158CBA' } }> Register Here</Link>
                    </Col>
                </Row>
            </div>
        </MainScreen>
    );
};

export default LoginScreen;
