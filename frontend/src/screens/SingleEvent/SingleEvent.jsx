import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteEventAction, updateEventAction } from "../../actions/eventsAction";
import ErrorMessage from "../../components/ErroMessage/ErrorMessage";
import Loading from "../../components/Loading/Loading";
import ReactMarkdown from "react-markdown";

function SingleEvent ( { match, history } ) {
    const [ title, setTitle ] = useState();
    const [ content, setContent ] = useState();
    const [ category, setCategory ] = useState();
    const [ date, setDate ] = useState( "" );
    const [ pic, setPic ] = useState();
    const [ picMessage, setPicMessage ] = useState();

    const dispatch = useDispatch();

    const eventUpdate = useSelector( ( state ) => state.eventUpdate );
    const { loading, error } = eventUpdate;

    const eventDelete = useSelector( ( state ) => state.eventDelete );
    const { loading: loadingDelete, error: errorDelete } = eventDelete;

    const deleteHandler = ( id ) => {
        if ( window.confirm( "Are you sure?" ) ) {
            dispatch( deleteEventAction( id ) );
        }
        history.push( "/myevents" );
    };

    useEffect( () => {
        const fetching = async () => {
            const { data } = await axios.get( `/api/events/${ match.params.id }` );

            setTitle( data.title );
            setContent( data.content );
            setCategory( data.category );
            setDate( data.updatedAt );
            setPic( data.pic );
        };

        fetching();
    }, [ match.params.id, date ] );

    const resetHandler = () => {
        setTitle( "" );
        setCategory( "" );
        setContent( "" );
    };

    const postDetails = ( pics ) => {
        setPicMessage( null );
        if ( pics.type === "image/jpeg" || pics.type === "image/png" ) {
            const data = new FormData();
            data.append( "file", pics );
            data.append( "upload_preset", "eventx" );
            data.append( "cloud_name", "dyl8nylbd" );
            fetch( "https://api.cloudinary.com/v1_1/dyl8nylbd/image/upload", {
                method: "post",
                body: data,
            } )
                .then( ( res ) => res.json() )
                .then( ( data ) => {
                    setPic( data.url.toString() );
                    console.log( pic );
                } )
                .catch( ( err ) => {
                    console.log( err );
                } );
        } else {
            return setPicMessage( "Please Select an Image" );
        }
    };

    const updateHandler = ( e ) => {
        e.preventDefault();
        dispatch( updateEventAction( match.params.id, title, content, category, pic ) );
        if ( !title || !content || !category || !pic ) return;

        resetHandler();
        history.push( "/myevents" );
    };

    return (
        <MainScreen title="Edit Event">
            <Card>
                <Card.Header>Edit your Event</Card.Header>
                <Card.Body>
                    <Row className="eventContainer">
                        <Col md={ 6 }>
                            <Form onSubmit={ updateHandler }>
                                { loadingDelete && <Loading /> }
                                { error && <ErrorMessage variant="danger">{ error }</ErrorMessage> }
                                { errorDelete && (
                                    <ErrorMessage variant="danger">{ errorDelete }</ErrorMessage>
                                ) }
                                <Form.Group controlId="title">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="title"
                                        placeholder="Enter the title"
                                        value={ title }
                                        onChange={ ( e ) => setTitle( e.target.value ) }
                                    />
                                </Form.Group>

                                <Form.Group controlId="content">
                                    <Form.Label>Content</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Enter the content"
                                        rows={ 4 }
                                        value={ content }
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
                                        placeholder="Enter the Category"
                                        value={ category }
                                        onChange={ ( e ) => setCategory( e.target.value ) }
                                    />
                                </Form.Group>
                                { picMessage && (
                                    <ErrorMessage variant="danger">{ picMessage }</ErrorMessage>
                                ) }
                                <Form.Group controlId="pic">
                                    <Form.Label>Change Event Picture</Form.Label>
                                    <Form.File
                                        onChange={ ( e ) => postDetails( e.target.files[ 0 ] ) }
                                        id="custom-file"
                                        type="image/png"
                                        label="Upload Event Picture"
                                        custom
                                    />
                                </Form.Group>
                                { loading && <Loading size={ 50 } /> }
                                <Button variant="primary" type="submit" style={ { marginTop: 10 } }>
                                    Update Event
                                </Button>
                                <Button
                                    className="mx-2"
                                    variant="danger"
                                    onClick={ () => deleteHandler( match.params.id )
                                    }
                                    style={ { marginTop: 10 } }
                                >
                                    Delete Event
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
                    Updated on - { date.substring( 0, 10 ) }
                </Card.Footer>
            </Card>
        </MainScreen>
    );
}

export default SingleEvent;;