import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { pink, purple } from '@material-ui/core/colors'

import LandingPage from './pages/landingPage';
import SignupPage from './pages/signup';
import SigninPage from './pages/signin';

import Navbar from './components/navbar';


const theme = createMuiTheme({
	palette: {
		primary: pink,
		secondary: purple
	},
	typography: {
		useNextVariants: true
	}
});



function App() {
	return (
		<MuiThemeProvider theme={theme}>
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
		</MuiThemeProvider>
	);
}

export default App;
