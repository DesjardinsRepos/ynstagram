import theme from '../exports/theme';

export default {
    container: {
        textAlign: 'center',
        height: '87vh'
    },
    form: {
        'max-width': '30rem',
        margin: 'auto'
    },
    image: {
        margin: '20px auto 20px auto'
    },
    pageTitle: { 
        margin: '15px auto 15px auto'
    },
    textField: {
        margin: '15px auto 15px auto'
    }, 
    button: {
        marginTop: 20,
        position: 'relative',
        'min-width': '6rem', 
        width: '25%',
        "&:disabled": {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.light
          }
    },
    link: {
        color: theme.palette.primary.main
    }
}