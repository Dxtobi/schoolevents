import React, { useEffect, useState } from 'react';
import {Container, Row } from 'react-bootstrap';
import './LandingPage.css';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listEvents } from '../../actions/eventsAction';
import moment from 'moment';

const LandingPage = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const events = useSelector((state) => state.eventList);
    

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
                    <div className='img-logo'>
                        <img src='/fpblogo.jpg' alt="" className='imgLogo'/>
                    </div>
                    <div className='intro-text'>
                        <div>
                            <h1 className='title'>FPB SESSION SCHEDULE</h1>
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

const EventsDisplay = ({ e }) => {
    const [show, setShow] = useState(false)
    console.log(e)
    return (
        <div className='event-holder'>
                              <div className='event_Date'>
                                  Date:{moment(e.edate).format('MMMM Do YYYY, h:mm:ss a')}
                              </div>
                              <div className='e-head-d'>
                                  <div className='event_head'>
                                    {e.title}
                                  </div>
                                  <button onClick={()=>setShow(!show)} className='event_btn-see'>
                                    See more
                                  </button>
            </div>
            {
                show && <div className=''>
                    <h1 className=''>{e.category}</h1>
                    <div>{e.content}</div>
                </div>
            }
        </div>
        
    )
}

export default LandingPage;
