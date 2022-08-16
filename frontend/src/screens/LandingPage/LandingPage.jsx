import React, { useEffect } from 'react';
import {Container, Row } from 'react-bootstrap';
import './LandingPage.css';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listEvents } from '../../actions/eventsAction';

const LandingPage = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const events = useSelector( ( state ) => state.eventList );

    useEffect( () => {
     //   const userInfo = localStorage.getItem( 'userInfo' );
    }, [ history ] );

    useEffect( () => {
        dispatch( listEvents() )
    }, []);
    useEffect( () => {
        console.log(events)
    }, [events] );
    //listEvents

    return (
        <div className='main'>
            <Container>
                <Row>
                    <div className='intro-text'>
                        <div>
                            <h1 className='title'>FPB school calender</h1>
                        </div>
                    </div>
                    {
                      Array.isArray(events.events) && events.events.map((e, i) => {
                          return (<EventsDisplay e={e} />)
                        })
                    }
                </Row>
            </Container>
        </div>
    );
};

const EventsDisplay = ({e}) => {
    console.log(e)
    return (
        <div className='event-holder'>
                              <div className='event_Date'>
                                  Date:{e.edate}
                              </div>
                              <div className='e-head-d'>
                                  <div className='event_head'>
                                    {e.title}
                                  </div>
                                  <button className='event_btn-see'>
                                    See more
                                  </button>
                                </div>
                            </div>
    )
}

export default LandingPage;
