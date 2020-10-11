import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { addProduct as addProductService, updateProduct as updateProductService, getProduct } from '../../services/dataService';
import { IProduct } from '../../models/product';
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
    const [errors, setErrors] = useState<any>({
        name: '',
        ean: '',
        type: '',
        weight: '',
        color: '',
        price: '',
        quantity: ''
    });

    const isInvalid = product.name === '' || product.ean === '' || product.type === '' || product.weight === '' || product.color === '';

    function formSubmit(event:React.FormEvent) {
        event.preventDefault();
        if (!isInvalid) {
            
            if (!id) {
                addProduct(product);
            } else {
                updateProduct(product);
            }
        }
    };

    function addProduct(productObj:IProduct) {
        addProductService(productObj).then(() => {
            setTimeout(function () {
                history.push("/products");
            }, 100);
        });
    };

    function updateProduct(productObj:any) {
        updateProductService(productObj).then(() => {
            // console.log('Product updated', res);
            setTimeout(function () {
                history.goBack();
            }, 100);
        })
    };

    function updateProductField(event:React.ChangeEvent<any>) {
        const { name } = event.target;
        let { value } = event.target;
        switch (name) {
            case 'price':
                value = Number(value);
                break;
            case 'quantity':
                value = Number(value);
                break;
            case 'active':
                value = event.target.checked;
                break;
        
            default:
                break;
        }
        setProduct((product: IProduct) => ({ ...product, [name]: value}));
    };
    
    /*--------- Validate a field on Blur Event -------------*/
    function validateForm(event: React.FocusEvent<HTMLInputElement>) {
        const { name, value } =event.target;

        switch (name) {
            case 'name':
                setProduct((prevProd) => ({ ...prevProd, name: value.trim() }));
                if (value.trim().length === 0) {
                    setErrors({...errors, name: 'Name can\'t be empty'});
                } else {
                    setErrors({ ...errors, name: '' });
                }
                break;

            case 'ean':
                setProduct((prevProd) => ({ ...prevProd, ean: value.trim() }));
                if (value.trim().length === 0) {
                    setErrors({ ...errors, ean: 'Ean can\'t be empty' });
                } else {
                    setErrors({ ...errors, ean: '' });
                }
                break;

            case 'weight':
                setProduct((prevProd) => ({ ...prevProd, weight: value.trim() }));
                if (value.trim().length === 0) {
                    setErrors({ ...errors, weight: 'Weight can\'t be empty' });
                } 
                else if (isNaN(parseFloat(value))) {
                    setErrors({ ...errors, weight: 'Only numbers are allowed' });
                } else {
                    setErrors({ ...errors, weight: '' });
                }
                break;

            case 'color':
                setProduct((prevProd) => ({ ...prevProd, color: value.trim() }));
                if (value.trim().length === 0) {
                    setErrors({ ...errors, color: 'Color can\'t be empty' });
                } 
                else if (value.match(/^[a-zA-Z]+$/) === null) {
                    setErrors({ ...errors, color: 'Only alphabets are allowed' });
                } else {
                    setErrors({ ...errors, color: '' });
                }
                break;

            case 'price':
                setProduct((prevProd) => ({ ...prevProd, price: Number(value.trim()) }));
                if (value.trim().length === 0) {
                    setErrors({ ...errors, price: 'Price can\'t be empty' });
                }
                else if (isNaN(parseFloat(value))) {
                    setErrors({ ...errors, price: 'Only numbers are allowed' });
                } else {
                    setErrors({ ...errors, price: '' });
                }
                break;

            case 'quantity':
                setProduct((prevProd) => ({ ...prevProd, quantity: Math.round(Number(value.trim())) }));
                if (value.trim().length === 0) {
                    setErrors({ ...errors, quantity: 'Qunatity can\'t be empty' });
                }
                else if (isNaN(parseInt(value))) {
                    setErrors({ ...errors, quantity: 'Only numbers are allowed' });
                } else {
                    setErrors({ ...errors, quantity: '' });
                }
                break;
        
            default:
                break;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                            <TextField label={translate('productList.tableHeaders.price')} name="price" type="number" required value={product.price}
                                onChange={updateProductField}
                                onBlur={validateForm}
                                error={errors.price.length > 0}
                                helperText={errors.price}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField label={translate('productList.tableHeaders.quantity')} name="quantity" type="number" required 
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