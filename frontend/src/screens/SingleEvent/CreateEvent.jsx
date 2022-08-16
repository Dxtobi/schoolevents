import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createEventAction } from "../../actions/eventsAction";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErroMessage/ErrorMessage";
import ReactMarkdown from "react-markdown";

import './SingleEvent.css';

function CreateEvent ( { history } ) {
    const [ title, setTitle ] = useState( "" );
    const [ content, setContent ] = useState( "" );
    const [category, setCategory] = useState("");
    const [ date, setDate ] = useState( "" );
    const [ pic, setPic ] = useState(
        "https://res.cloudinary.com/practicaldev/image/fetch/s--P-zvMTgt--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/i/qyix6eyhrnc8x9c44yp2.jpg"
    );
    const [ picMessage, setPicMessage ] = useState( null );

    const dispatch = useDispatch();

    const eventCreate = useSelector( ( state ) => state.eventCreate );
    const { loading, error, event } = eventCreate;

    console.log( event );
    console.log( pic );

    const resetHandler = () => {
        setTitle( "" );
        setCategory( "" );
        setContent( "" );
    };



    const postDetails = ( pics ) => {
        if ( !pics ) {
            return setPicMessage( 'Please select an image' );
        }
        setPicMessage( null );

        if ( pics.type === 'image/jpeg' || pics.type === 'image/png' ) {
            const data = new FormData();
            data.append( 'file', pics );
            data.append( 'upload_preset', 'eventx' );
            data.append('cloud_name', 'dyl8nylbd');
           
            fetch( 'https://api.cloudinary.com/v1_1/dyl8nylbd/image/upload', {
                method: 'post',
                body: data
            } ).then( ( res ) => res.json() ).then( ( data ) => {
                console.log( data );
                setPic( data.url.toString() );
            } ).catch( ( err ) => {
                console.log( err );
            } );
        } else {
            return setPicMessage( 'Please select an image' );
        }

    };


    const submitHandler = ( e ) => {
        e.preventDefault();
        dispatch( createEventAction( title, content, category, pic, date ) );
        if ( !title || !content || !category ) return;

        resetHandler();
        history.push( "/myevents" );
    };

    useEffect( () => { }, [] );

    return (
        <MainScreen title="Create an Event">
            <Card>
                <Card.Header>Create a new Event</Card.Header>
                <Card.Body>
                    <Row className="eventContainer">
                        <Col md={ 6 }>
                            <Form onSubmit={ submitHandler }>
                                { error && <ErrorMessage variant="danger">{ error }</ErrorMessage> }
                                <Form.Group controlId="title">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="title"
                                        value={ title }
                                        placeholder="Enter the title"
                                        onChange={ ( e ) => setTitle( e.target.value ) }
                                    />
                                </Form.Group>

                                <Form.Group controlId="content">
                                    <Form.Label>Content</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        value={ content }
                                        placeholder="Enter the content"
                                        rows={ 4 }
                                        onChange={ ( e ) => setContent( e.target.value ) }
                                    />
                                </Form.Group>
                                { content && (
                                    <Card>
                                        <Card.Header>Event Preview</Card.Header>
                                        <Card.Body>
                                            <ReactMarkdown>{ content }</ReactMarkdown>
                                        </Card.Body>
                                    </Card>
                                ) }

                                <Form.Group controlId="content">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control
                                        type="content"
                                        value={ category }
                                        placeholder="Enter the Category"
                                        onChange={ ( e ) => setCategory( e.target.value ) }
                                    />
                                </Form.Group>
                                { picMessage && (
                                    <ErrorMessage variant="danger">{ picMessage }</ErrorMessage>
                                )}
                                <br/>
                                <Form.Group >
                                    <Form.Label>Event Picture</Form.Label>
                                    <input
                                        onChange={ ( e ) => setDate( e.target.value ) }
                                        id="custom-file"
                                        type="date"
                                        label="Date for Event"
                                        custom
                                    />
                                </Form.Group>
                                <Form.Group controlId="pic">
                                    <Form.Label>Event Picture</Form.Label>
                                    <Form.File
                                        onChange={ ( e ) => postDetails( e.target.files[ 0 ] ) }
                                        id="custom-file"
                                        type="image/png"
                                        label="Upload Event Picture"
                                        custom
                                    />
                                </Form.Group>
                                { loading && <Loading size={ 50 } /> }
                                <Button type="submit" variant="primary" style={ { marginTop: 10 } }>
                                    Create Event
                                </Button>
                                <Button className="mx-2" onClick={ resetHandler } variant="danger" style={ { marginTop: 10 } } >
                                    Reset Fields
                                </Button>
                            </Form>
                        </Col>
                        <Col
                            style={ {
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            } }
                        >
                            <img src={ pic } alt={ title } className="eventPic" />
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Footer className="text-muted">
                    Creating on - { new Date().toLocaleDateString() }
                </Card.Footer>
            </Card>
        </MainScreen>
    );
}

export default CreateEvent;;