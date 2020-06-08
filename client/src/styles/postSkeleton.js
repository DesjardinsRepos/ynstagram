import theme from '../exports/theme';

export default {
    card: {
        display: 'flex',
        marginBottom: 20
    },
    cardContent: {
        width: '100%',
        flexDirection: 'column',
        padding: 25
    },
    cover: {
        minWidth: 200,
        objectFit: 'cover'
    },
    handle: {
        borderRadius: 4,
        width: 60,
        height: 18,
        backgroundColor: theme.palette.skeleton.handle,
        marginBottom: 7
    },
    date: {
        borderRadius: 5,
        height: 14,
        width: 100,
        backgroundColor: theme.palette.skeleton.date,
        marginBottom: 10
    },
    fullLine: {
        borderRadius: 5,
        height: 15,
        width: '90%',
        backgroundColor: theme.palette.skeleton.line,
        marginBottom: 10
    },
    halfLine: {
        borderRadius: 5,
        height: 15,
        width: '50%',
        backgroundColor: theme.palette.skeleton.line,
        marginBottom: 10
    }
}