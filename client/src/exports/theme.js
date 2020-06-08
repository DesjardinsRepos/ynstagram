import { pink, purple } from '@material-ui/core/colors'
import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({
    palette: {
		primary: pink,
		secondary: purple,
		iconsColor: '#fff',
		skeleton: {
			handle: '#f48fb1',
			date: '#d6d6d6',
			line: '#bdbdbd'
		}, 
		white: 'white'
	},
	typography: {
		useNextVariants: true
	}
}); 