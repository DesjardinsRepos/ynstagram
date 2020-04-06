import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import tokenDecoder from 'jwt-decode';

import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getOwnUserData } from './redux/actions/userActions';

import LandingPage from './pages/landingPage';
import SignupPage from './pages/signup';
import SigninPage from './pages/signin';
import User from './pages/user';

import Navbar from './components/navbar';
import AuthRoute from './exports/authRoute';
import axios from 'axios';

import theme from './exports/theme';


const token = localStorage.FBAuthToken;
if(token) {
	const decodedToken = tokenDecoder(token);
	if(decodedToken.exp * 1000 < Date.now()) {
		store.dispatch(logoutUser())
		window.location.href= '/signin';
	} else {
		store.dispatch({ type: SET_AUTHENTICATED });
		axios.defaults.headers.common['Authorization'] = token;
		store.dispatch(getOwnUserData());
	}
} 

function App() {
	return (
		<Provider store={store}>

			<MuiThemeProvider theme={theme}>
      			<Router>

        			<Navbar/>

      				<div className="container">
        				<Switch>
            				<Route exact path="/" component={LandingPage}/>
							<Route exact path="/users/:handle" component={User}/>
							<Route exact path="/users/:handle/post/:postId" component={User}/>
            				<AuthRoute exact path="/signin" component={SigninPage}/> /* make icons invisible if logged in */
            				<AuthRoute exact path="/signup" component={SignupPage}/>
        				</Switch>
      				</div>
      			</Router>
			</MuiThemeProvider>
		</Provider>
	);
}
export default App;
