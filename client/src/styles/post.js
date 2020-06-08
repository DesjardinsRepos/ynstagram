import theme from '../exports/theme';

export default {
    card: {
		display: 'flex',
		marginBottom: 20
	},
	content: {
		objectFit: 'cover',
		width: '100%',
		padding: 24
	},
	right: {
		position: 'relative',
		backgroundColor: theme.palette.primary[50],
		borderRadius: '3px',
		width: '0'
	}, 
	body: {
    	overflowWrap: 'break-word', 
		width: '94%', 
		margin: '2% 3%'
	},
	interaction: {
		position: 'absolute',
		bottom: 0, 
		width: '94%', 
		margin: '0 2% 2% 2%'
	}
}