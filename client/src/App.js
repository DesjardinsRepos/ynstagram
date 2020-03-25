import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import tokenDecoder from 'jwt-decode';

import LandingPage from './pages/landingPage';
import SignupPage from './pages/signup';
import SigninPage from './pages/signin';

import Navbar from './components/navbar';
import AuthRoute from './exports/authRoute';

import t from './exports/theme'


const theme = createMuiTheme(t);

let authenticated;/*
const token = localStorage.FBAuthToken;
if(token) {
	const decodedToken = tokenDecoder(token);
	if(decodedToken.exp * 1000 < Date.now()) {
		window.location.href= '/signin';
		authenticated = false;
	} else {
		authenticated = true;
	}
} */

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<div className="App">
      			<Router>

        			<Navbar/>

      				<div className="container">
        				<Switch>
            				<Route exact path="/" component={LandingPage}/>
            				<AuthRoute exact path="/signin" component={SigninPage} authenticated={authenticated}/>
            				<AuthRoute exact path="/signup" component={SignupPage} authenticated={authenticated}/>
        				</Switch>
      				</div>

      			</Router>
   			</div>
		</MuiThemeProvider>
	);
}
export default App;
