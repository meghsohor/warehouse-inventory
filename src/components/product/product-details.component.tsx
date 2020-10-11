import React from 'react';
import { IProduct } from '../../models/product';
import { useTranslation } from 'react-i18next';
import { Table, TableBody, TableCell, TableRow, CardContent } from '../../material.components';
import { CheckBox, CancelRounded } from '@material-ui/icons';


const ProductDetails = (props:{product:IProduct}) => {
    const product = props.product;
    const { t: translate } = useTranslation();

    return (
        <CardContent>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell variant="head" component="th" width="200">{translate('productList.tableHeaders.name')}</TableCell>
                        <TableCell>{product.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" component="th">{translate('productList.tableHeaders.ean')}</TableCell>
                        <TableCell>{product.ean}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" component="th">{translate('productList.tableHeaders.type')}</TableCell>
                        <TableCell>{product.type}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" component="th">{translate('productList.tableHeaders.weight')}</TableCell>
                        <TableCell>{product.weight}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" component="th">{translate('productList.tableHeaders.color')}</TableCell>
                        <TableCell>{product.color}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" component="th">{translate('productList.tableHeaders.price')}</TableCell>
                        <TableCell>{`$${product.price}`}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" component="th">{translate('productList.tableHeaders.quantity')}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" component="th">{translate('productList.tableHeaders.active')}</TableCell>
                        <TableCell>{product.active ? <CheckBox color="primary" /> : <CancelRounded color="secondary" />}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </CardContent>
    )
}

export default ProductDetails
