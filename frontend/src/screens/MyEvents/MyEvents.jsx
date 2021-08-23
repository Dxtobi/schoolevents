import React, { useEffect } from 'react';
import MainScreen from '../../components/MainScreen';
import { Link } from 'react-router-dom';
import { Accordion, Badge, Button, Card, Col, Row } from 'react-bootstrap';

import './MyEvents.css';

import { useDispatch, useSelector } from "react-redux";
import { deleteEventAction, listEvents } from "../../actions/eventsAction";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErroMessage/ErrorMessage";


const MyEvents = ( { history, search } ) => {
    const dispatch = useDispatch();

    const eventList = useSelector( ( state ) => state.eventList );
    const { loading, error, events } = eventList;


    const userLogin = useSelector( ( state ) => state.userLogin );
    const { userInfo } = userLogin;

    const eventDelete = useSelector( ( state ) => state.eventDelete );
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = eventDelete;

    const eventCreate = useSelector( ( state ) => state.eventCreate );
    const { success: successCreate } = eventCreate;

    const eventUpdate = useSelector( ( state ) => state.eventUpdate );
    const { success: successUpdate } = eventUpdate;

    useEffect( () => {
        dispatch( listEvents() );
        if ( !userInfo ) {
            history?.push( "/" );
        }
    }, [
        dispatch,
        history,
        userInfo,
        successDelete,
        successCreate,
        successUpdate,
    ] );

    const deleteHandler = ( id ) => {
        if ( window.confirm( "Are you sure?" ) ) {
            dispatch( deleteEventAction( id ) );
        }
    };
    return (
        <MainScreen title={ `Hi ${ userInfo?.name }.` }>
            <Link to='/createevent'>
                <Button
                    styles={ { marginLeft: 10, marginBottom: 6 } }
                    size='lg'
                >
                    Create New Event
                </Button>
            </Link>
            { error && <ErrorMessage variant='danger' /> }
            { loading && <Loading /> }
            { events && events.filter( ( filteredEvent ) =>
                filteredEvent.title.toLowerCase().includes( search.toLowerCase() ) ).reverse().map( ( event ) => {
                    return <Accordion key={ event._id }>
                        <Card style={ { margin: 10 } }>
                            <Card.Header style={ { display: 'flex' } }>
                                <span style={ {
                                    color: 'black',
                                    textDecoration: 'none',
                                    flex: 1,
                                    cursor: 'pointer',
                                    alignSelf: 'center',
                                    fontSize: 18,

                                } }
                                >
                                    <Accordion.Toggle
                                        as={ Link }
                                        variant='link'
                                        eventKey='0'
                                    >
                                        { event.title }
                                    </Accordion.Toggle>
                                </span>
                                <div>
                                    <Button
                                        href={ `/event/${ event._id }` }
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        className='mx-2'
                                        variant='danger'
                                        onClick={ () => deleteHandler( event._id ) }
                                    >
                                        Delete</Button>
                                </div>
                            </Card.Header>
                            <Accordion.Collapse eventKey='0'>
                                <Card.Body>
                                    <Row className="eventBodyContainer">
                                        <Col md={ 6 }>
                                            <h4>
                                                <Badge variant='success'> Event category: { event.category }</Badge>
                                            </h4>
                                            <blockquote className="blockquote mb-0">
                                                <p>
                                                    { event.content }
                                                </p>
                                                <footer className="blockquote-footer">
                                                    Created on{ " " }
                                                    <cite title="Source Title">
                                                        { event.createdAt.substring( 0, 10 ) }
                                                    </cite>
                                                </footer>
                                            </blockquote>
                                        </Col>
                                        <Col
                                            style={ {
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            } }
                                        >
                                            <img
                                                src={ event.pic }
                                                alt={ event.name }
                                                className="eventPic"
                                                style={ { width: 420, height: 420 } }
                                            />
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>;
                } ) }
        </MainScreen >
    );
};

export default MyEvents;
