import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAdmins } from './../../actions/userAction';

const Admins = () => {
   // const history = useHistory();
    //const [sna, setSna] = useState(false)
    const [users, setUsers] = useState([{}])
    const [looding, setLoading] = useState(true)
    const dispatch = useDispatch();
    
    const adms = useSelector(state => state.userAdmins);
    const { loading, admins } = adms;
   
    useEffect(() => {
        dispatch( getAdmins() );
        }, [dispatch] );

        useEffect(() => {
           
                setLoading(loading)
                setUsers(admins)
            
        }, [admins]);

    return (
        <div className='dashboard__'>
            
            <div className='rowAdmin'><h1>AMINS</h1></div>
            <div className='rowAdmin'>
                        <div className='adm-name'>NAME</div>
                        <div className='adm-name'>EMAIL</div>
                        <div className='adm-name'>ADMIN TYPE</div>
                    </div>
            {
                admins&& admins.map((e,i) => {
                    return <div key={i} className='rowAdmin'>
                        <div className='adm-name'>{e.name}</div>
                        <div className='adm-name'>{e.email}</div>
                        <div className='adm-name'>{e.admin===true?'Admin':'Collaborator'}</div>
                    </div>
                })
            }
        </div>
    );
};

export default Admins;