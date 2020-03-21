import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import LandingPage from './pages/landingPage';
import SignupPage from './pages/signup';
import SigninPage from './pages/signin';

import Navbar from './components/navbar';

function App() {
	return (
   	<div className="App">
      	<Router>

        		<Navbar/>

      		<div className="container">
          
        			<Switch>
            			<Route exact path="/" component={LandingPage}/>
            			<Route exact path="/signin" component={SigninPage}/>
            			<Route exact path="/signup" component={SignupPage}/>
        			</Switch>

      		</div>
      	</Router>
   	</div>
	);
}

export default App;
