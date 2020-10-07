import React from 'react';
import { useParams } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormGroup from '@material-ui/core/FormGroup';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            maxWidth: 400,
            margin: '0 auto'
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
    }),
);

export default function ProductForm() {
    const { id } = useParams();
    const classes = useStyles();
    console.log(id);
    return (
        <>
            <h1>{id ? `Product Edit ${id}` : `Add Product`}</h1>
            <form noValidate autoComplete="off" className={classes.form}>
                <FormGroup>
                    <FormControl className={classes.mb2}>
                        <TextField label="Name" required />
                    </FormControl>
                    <FormControl className={classes.mb2}>
                        <TextField label="EAN" required />
                    </FormControl>
                    <FormControl className={classes.mb2}>
                        <InputLabel>Type</InputLabel>
                        <Select defaultValue={''}>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.mb2}>
                        <TextField label="Weight (in grams)" type="number" required />
                    </FormControl>
                    <FormControl className={classes.mb2}>
                        <TextField label="Color" required />
                    </FormControl>
                    <FormControl className={classes.mb2}>
                        <FormControlLabel
                            value="Active"
                            control={<Checkbox color="primary" />}
                            label="Active"
                            labelPlacement="start"
                            className={classes.checkLabel}
                        />
                    </FormControl>
                </FormGroup>

                <div className={classes.btnContainer}>
                    
                    <Button variant="contained" color="secondary">
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary">
                        Add Product
                    </Button>

                </div>
            </form>
        </>
    );
}