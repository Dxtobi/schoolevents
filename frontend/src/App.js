import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LandingPage from './screens/LandingPage/LandingPage';
import HomePage from './screens/Homepage/Homepage';
import MyEvents from './screens/MyEvents/MyEvents';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import CreateEvent from './screens/SingleEvent/CreateEvent';
import SingleEvent from './screens/SingleEvent/SingleEvent';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import Dashboard from './screens/Dashboard/Dashboard';
import Admins from './screens/AllEvents/Admins';
import AllEvents from './screens/AllEvents/AllEvents';

function App () {
  const [ search, setSearch ] = useState( "" );
  return (
    <Router>
      <Header setSearch={ ( s ) => setSearch( s ) } />
      <main >
        <Route exact path='/' component={LandingPage} />
        <Route path='/homePage' component={RegisterScreen} />
        <Route path='/admins' component={Admins} />
        <Route path='/dashboard' component={ Dashboard } />
        <Route path='/login' component={ LoginScreen } />
        <Route path='/register' component={ RegisterScreen } />
        <Route path='/allevents' component={ AllEvents } />
        <Route path='/myevents' component={ () => <MyEvents search={ search } /> } />
        <Route path='/event/:id' component={ SingleEvent } />
        <Route path='/createevent' component={ CreateEvent } />
        <Route path="/profile" component={ ProfileScreen } />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
