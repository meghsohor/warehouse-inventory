import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
    createStyles({
        mb2: {
            marginBottom: '2rem'
        },
        pageHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '2rem 0 1rem',
            borderBottom: '1px solid #e4e4e4',
            '& h1': {
                fontSize: '2rem',
                fontWeight: 400,
                color: '#444',
                margin: 0
            }
        },
        tableContainer: {
            width: '100%',
            height: '400px'
        },
        actionsContainer: {
            '& > *': {
                marginLeft: '3px',
                marginRight: '3px',
                marginBottom: '5px'
            }
        },
        conf_modal: {
            paddingTop: '1rem',
            paddingBottom: '0.5rem',
            width: '98%',
            maxWidth: 400,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        },
        conf_modal_actions: {
            padding: '15px 20px',
            justifyContent: 'flex-end',
            borderTop: '1px solid #e4e4e4',
        }
    }),
);