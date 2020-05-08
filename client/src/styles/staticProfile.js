import theme from '../exports/theme';

export default {
    paper: {
        padding: '15px 20px 20px 20px',
        '& .profile-details': {
            '& svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: theme.palette.primary.main
            },
            marginLeft: '10px',
            '& p': {  
                overflowWrap: 'break-word', 
                margin: '0 30px 0 25px'
            }
        }
    },
    imgMobile: {
        position: 'absolute',
        left: '50%',
        marginLeft: '-75px',
        top: '90px'
    },
    imgTablet: {
        position: 'absolute',
        left: '25%',
        marginLeft: '-75px',
        top: '90px'
    },
    imgPc: {
        position: 'absolute',
        left: 'calc(50% - 330px)',
        marginLeft: '-75px',
        top: '90px'
    }
}