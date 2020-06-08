import theme from '../exports/theme';

export default {
    paper: {
        padding: 20
    },
    profileDetails: {
        textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: theme.palette.primary.main
            }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    },
    button: {
        float: 'right'
    }
}