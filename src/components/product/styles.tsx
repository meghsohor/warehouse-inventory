import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
    createStyles({
        wrapper: {
            margin: "2rem auto 0",
            padding: "1rem",
            maxWidth: "600px",
        },
        btnContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            flex: 'auto',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    }),
);