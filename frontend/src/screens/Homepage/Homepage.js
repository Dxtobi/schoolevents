import React, { useEffect } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import './Homepage.css';
import { useHistory } from 'react-router-dom';

const HomePage = () => {

    const history = useHistory();

  /*  useEffect( () => {
        const userInfo = localStorage.getItem( 'userInfo' );
        if ( userInfo ) {
            history.push( '/myevents' );
        }
    }, [ history ] );
*/

    return (
        <div className='main'>
            
        </div>
    );
};

export default HomePage;
