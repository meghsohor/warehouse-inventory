import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { addProduct as addProductService, updateProduct as updateProductService, getProduct } from '../../services/dataService';
import { IProduct } from '../../models/product';
import { IErrors } from '../../models/error';
import { getUUID } from '../../utils/utilsFunctions';
import { useTranslation } from 'react-i18next';
import { Paper, Container, Button, TextField, FormGroup, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, Typography } from '../../material.components';
import useStyles from './styles';

export default function ProductForm() {
    const [product, setProduct] = useState<IProduct>({
        id: getUUID(),
        name: '',
        ean: '',
        type: '',
        weight: '',
        color: '',
        price: 0,
        quantity: 0,
        active: true
    });
    const { id } = useParams<{ id:string }>();
    const history = useHistory();
    const classes = useStyles();
    const { t: translate } = useTranslation();
    const [errors, setErrors] = useState <IErrors>({
        name: '',
        ean: '',
        type: '',
        weight: '',
        color: '',
        price: '',
        quantity: ''
    });

    const isInvalid = product.name === '' || product.ean === '' || product.type === '' || product.weight === '' || product.color === '';

    /**
    * Product form submit handler.
    * @remarks
    * Checks if the form values are valid
    * Checks if the `id` param is available in the `history` object
    * If the `id` is undefined, creates a new product. Otherwise, update the existing product
    *
    * @returns Void
    */
    function formSubmit(event:React.FormEvent) {
        event.preventDefault();
        if (!isInvalid) {
            
            if (!id) {
                addProductService(product).then(() => {
                    setTimeout(function () {
                        history.push("/products");
                    }, 100);
                });
            } else {
                updateProductService(product).then(() => {
                    setTimeout(function () {
                        history.goBack();
                    }, 100);
                });
            }
        }
    }

    /**
    * Form `onChange` event handler
    * @remarks
    * Runs everytime when the value of any field changes 
    * Converts the value of `price` and `quantity` fields to Number
    * Sets the fields value to the local state
    *
    * @returns Void
    */

    function updateProductField(event: React.ChangeEvent<any>) {
        const field = event.target;

        if (field.name === 'active') {
            setProduct((product: IProduct) => ({ ...product, [field.name]: field.checked }));
        } else {
            setProduct((product: IProduct) => ({ ...product, [field.name]: field.value }));
        }
    };


    /**
    * Form Validator - Form fields `onBlur` event handler
    * @remarks
    * Runs everytime when a field is blurred and checks if valid data has been provided
    * The `name`, `ean`, `weight`, `color`, 'price` & `quantity` fields are required and shows an error if they are left empty
    * Sets the fields value to the local state
    *
    * @returns Void
    */
    function validateForm(event: React.FocusEvent<HTMLInputElement>) {
        const { name, value } =event.target;

        if (name === 'name' || name === 'ean' || name === 'weight' || name === 'color' || name === 'price' || name === 'quantity') {
            setProduct((prevProd) => ({ ...prevProd, [name]: value.trim() }));
            if (value.trim().length === 0) {
                setErrors({ ...errors, [name]: `${name} can't be empty` });
            } else {
                setErrors({ ...errors, [name]: '' });
            }
        }
        if (name === 'weight' || name === 'price' || name === 'quantity') {
            if (isNaN(Number(value))) {
                setErrors({ ...errors, [name]: 'Only numbers are allowed' });
            } else {
                setErrors({ ...errors, [name]: '' });
            }
        }
        if (name === 'color') {
            if (value.match(/^[a-zA-Z]+$/) === null) {
                setErrors({ ...errors, color: 'Only alphabets are allowed' });
            } else {
                setErrors({ ...errors, color: '' });
            }
        }
    }

    useEffect(() => {
        if (id) {
            getProduct(id).then((res) => {
                if (res) {
                    setProduct(res);
                } else {
                    history.push('/');
                }
            });

        }
    
    }, [id, history]);

    return (
        <>
            <Container component={Paper} className={classes.wrapper}>
                <Typography className={classes.pageHeader} variant="h5">{id ? translate('product.updateProduct') : translate('product.addProduct')}</Typography>

                <form noValidate autoComplete="off" onSubmit={formSubmit}>
                    <FormGroup>
                        <FormControl className={classes.mb2}>
                            <TextField label={translate('productList.tableHeaders.name')} name="name" required value={product.name}
                                onChange={updateProductField}
                                onBlur={validateForm}
                                error={errors.name.length > 0}
                                helperText={errors.name}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField label={translate('productList.tableHeaders.ean')} name="ean" required value={product.ean}
                                onChange={updateProductField}
                                onBlur={validateForm}
                                error={errors.ean.length > 0}
                                helperText={errors.ean}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <InputLabel>{translate('productList.tableHeaders.type')}</InputLabel>
                            <Select name="type" value={product.type} onChange={updateProductField} required >
                                <MenuItem value="Ice-Cream">Ice-Cream</MenuItem>
                                <MenuItem value="Dessert">Desert</MenuItem>
                                <MenuItem value="Chocolate">Chocolate</MenuItem>
                                <MenuItem value="Cake">Cake</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField label={translate('productList.tableHeaders.weight')} name="weight" type="number" required 
                                value={product.weight}
                                onChange={updateProductField}
                                onBlur={validateForm}
                                error={errors.weight.length > 0}
                                helperText={errors.weight}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField label={translate('productList.tableHeaders.color')} name="color" required value={product.color}
                                onChange={updateProductField}
                                onBlur={validateForm}
                                error={errors.color.length > 0}
                                helperText={errors.color}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField label={translate('productList.tableHeaders.price')} name="price" type="number" value={product.price}
                                onChange={updateProductField}
                                onBlur={validateForm}
                                error={errors.price.length > 0}
                                helperText={errors.price}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField label={translate('productList.tableHeaders.quantity')} name="quantity" type="number" 
                                value={product.quantity}
                                onChange={updateProductField}
                                onBlur={validateForm}
                                error={errors.quantity.length > 0}
                                helperText={errors.quantity}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <FormControlLabel
                                name="active"
                                checked={product.active}
                                control={<Checkbox color="primary" />}
                                label={translate('productList.tableHeaders.active')}
                                labelPlacement="start"
                                className={classes.checkLabel}
                                onChange={updateProductField}
                            />
                        </FormControl>
                    </FormGroup>

                    <div className={classes.btnContainer}>

                        <Button variant="contained" color="secondary" onClick={history.goBack}>
                            {translate('productList.cancelButton')}
                    </Button>
                        <Button type="submit" variant="contained" color="primary" disabled={isInvalid}>
                            {id ? translate('product.updateButton') : translate('productList.addButton')}
                    </Button>

                    </div>
                </form>
            </Container>
        </>
    );
}