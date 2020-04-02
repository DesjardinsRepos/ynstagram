import { pink, purple } from '@material-ui/core/colors'
import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({
    palette: {
		primary: pink,
		secondary: purple,
		iconsColor: '#fff'
	},
	typography: {
		useNextVariants: true
	}
}); 