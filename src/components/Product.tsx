import React from 'react';
import { useParams } from "react-router-dom";

// Material UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';

export default function Product() {
    const { id } = useParams();
    console.log(id);
    return (
        <>
            <h1>Product {id}</h1>
            <Card>
                <CardContent>
                    <Typography component="h4">Product Title</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    This impressive paella is a perfect party dish and a fun meal to cook together with your
                    guests. Add 1 cup of frozen peas along with the mussels, if you like.
                    </Typography>
                </CardContent>

                <CardActions disableSpacing>
                    <IconButton aria-label="Edit product">
                        <Edit />
                    </IconButton>
                </CardActions>
            </Card>
        </>
    );
}