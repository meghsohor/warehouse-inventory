import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
    createStyles({
        wrapper: {
            maxWidth: 600,
            margin: '25px auto 0',
            padding: '2rem'
        },
        checkLabel: {
            marginLeft: 0,
            justifyContent: 'flex-end'
        },
        mb2: {
            marginBottom: '2rem'
        },
        btnContainer: {
            display: 'flex',
            justifyContent: 'flex-end',
            marginRight: -(theme.spacing(1)),
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        pageHeader: {
            borderBottom: '1px solid #e4e4e4',
            paddingBottom: '1rem',
            marginBottom: '1.5rem'
        }
    }),
);