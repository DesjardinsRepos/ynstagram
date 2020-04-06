import theme from '../exports/theme';

export default {
    handle: {
        borderRadius: 4,
        height: 20,
        width: 80,
        backgroundColor: theme.palette.skeleton.handle,
        margin: '0 auto 7px auto'
    },
    fullLine: {
        borderRadius: 5,
        height: 15,
        width: '100%',
        backgroundColor: theme.palette.skeleton.line,
        marginBottom: 10
    },
    halfLine: {
        borderRadius: 5,
        height: 15,
        width: '50%',
        backgroundColor: theme.palette.skeleton.line,
        marginBottom: 10
    },
    invisibleSeperator: {
        border: 'none',
        margin: 4
    },
    paper: {
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative'
        },
        '& .profile-image': {
            width: '200px', 
            height: '200px',
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center'
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    }
}