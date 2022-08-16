import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userRegisterReducer, userUpdateReducer, userAdmins } from './reducers/userReducers';
import {
    eventCreateReducer,
    eventDeleteReducer,
    eventListReducer,
    eventUpdateReducer,

} from './reducers/eventReducer';


const reducer = combineReducers( {
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    eventList: eventListReducer,
    eventCreate: eventCreateReducer,
    eventDelete: eventDeleteReducer,
    eventUpdate: eventUpdateReducer,
    userUpdate: userUpdateReducer,
    userAdmins:userAdmins
} );

const userInfoFromStorage = localStorage.getItem( 'userInfo' ) ? JSON.parse( localStorage.getItem( 'userInfo' ) ) : null;

const initialState = {
    userLogin: {
        userInfo: userInfoFromStorage
    }
};

const middleware = [ thunk ];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools( applyMiddleware( ...middleware ) )
);

export default store;


