import React, { useEffect, useState } from 'react';
//import { Button, Container, Row } from 'react-bootstrap';//
import './Dashboard.css';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerAdmin } from './../../actions/userAction';

const Dashboard = () => {
   // const history = useHistory();
    const [sna, setSna] = useState(false)
    const [sa, setSa] = useState(false)
    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, userInfo } = userRegister;

        useEffect( () => {
        const userInfo = localStorage.getItem( 'userInfo' );
            if ( JSON.parse(userInfo).admin ) {
                setSa(JSON.parse(userInfo).admin)
            }
        }, [ userInfo ] );

    const setNewAdmin = () => {
        setSna(!sna)
    }

    return (
        <div className='dashboard__'>
            {sna && <NewAdmModel setNewAdmin={setNewAdmin } />}
            <div className='db-comp'>
                <Link to='/createevent' className='d-link-box'>
                    <div>Create Event</div>
                </Link>
                <Link to='/allevents' className='d-link-box'>
                    <div>All Events</div>
                </Link>
                {
                   sa &&
                    <div>
                        <div onClick={setNewAdmin} className='d-link-box'>
                            <div>New Admin</div>
                        </div>
                        <Link to='/admins' className='d-link-box'>
                            <div>All Admins</div>
                        </Link>
                    </div>
                }
                
            </div>
        </div>
    );
};

const NewAdmModel = ({ setNewAdmin }) => {
    const history = useHistory();
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [fullname, setFullName] = useState('')
    const [admin, setAdm] = useState(false)
    const [pic, setPic] = useState(
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    );
    const dispatch = useDispatch();
    //const userRegister = useSelector((state) => state.userRegister);
  //  const { loading, error, userInfo } = userRegister;
    
    
    const submitHandler = async (e) => {
        e.preventDefault();

        if (email === '' || pass === '' || fullname === '') {
            return
        }
        dispatch(registerAdmin(fullname, email, pass, pic, admin));
        clearForm()
        
    };

    const clearForm = () => {
        setEmail('')
        setPass('')
        setFullName('')
        setAdm('')
    }
    return (
        <div className='newadm-model'>
            <div className='nad-form-holder'>
                <input type='text' onChange={(e) => setFullName(e.target.value)} value={fullname} placeholder='Full Name' className='new-adm' />
                <input type='email' onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='Email' className='new-adm'/>
                <input type='password' onChange={(e) => setPass(e.target.value)} value={pass} placeholder='Password' className='new-adm' />
                <select className='new-adm' onChange={(e)=>{setAdm(e.target.value)}}>
                    <option value={false}>Collaborator</option>
                    <option value={true}>Admin</option>
                </select>
                <div className='double-btn-container'>
                    <button onClick={submitHandler } className='create-new-adm'>CREATE</button>
                    <button  onClick={setNewAdmin} className='create-new-adm'>CANCEL</button>
               </div>
            </div>
        </div>
    )
}

export default Dashboard;
