import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { getAllProducts, deleteProduct as deleteProductService, updateProducts } from '../../services/dataService';
import { IProduct } from '../../models/product';
import { useTranslation } from 'react-i18next';
import { Button, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Modal, Card, CardContent, CardActions, Typography } from '../../material.components';
import TablePagination from '@material-ui/core/TablePagination';
import useStyles from './styles';

export default function ProductsList() {
    const classes = useStyles();
    const [products, setProducts] = useState<IProduct[]>([]);
    const [activeProductID, setActiveProductID] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { t:translate } = useTranslation();

    useEffect(() => {
        getAllProducts().then((data:any) => {
            setProducts(data);
        })
    }, []);

    /**
    * Show product delete confirmation modal
    * @remarks
    * Clicking on the delete button of a product will open a modal
    *
    * @param1 - product id
    * @returns Void
    */
    function confirmDelete(productId: IProduct["id"]) {
        setActiveProductID(productId);
        setOpenModal(true);
    }

    /**
    * Delete product
    * @remarks
    * when a user click the Delete button in the modal
    * checks the active product id
    * calls the Delete Product method from the service 
    * gets the updated product list and sets to state
    * closes the modal
    * resets the value of active product id  
    *
    * @returns Void
    */
    function deleteProduct() {
        if (activeProductID && products.length) {
            deleteProductService(activeProductID).then((res) => {
                setProducts(res);
                setOpenModal(false);
                setActiveProductID('');
            });
        }
    }

    /**
    * Update product active state
    * @remarks
    * Clicking on the checkbox of a product from the product list table
    * will update the active state of the product
    *
    * @param1 - product id
    * @returns Void
    */
    function updateActive(id: IProduct["id"]) {
        const newProducts = products.map((item: IProduct) => item.id === id ? ({ ...item, active: !item.active }) : item);
        updateProducts(newProducts).then((res) => {
            setProducts(res);
        })
    }

    /**
    * Modal Container
    * @remarks
    * Two click event handlers:
    * will update the active state of the product
    * setOpenModal: closes the modal
    * deleteProduct: Sends delete request and closes the modal
    */
    const modalContent = (
        <Card className={classes.conf_modal}>
            <CardContent>
                <h2>{translate('productList.deleteConfirmation')}</h2>
            </CardContent>
            <CardActions className={classes.conf_modal_actions}>
                <Button variant="contained" onClick={(e) => setOpenModal(false)}>{translate('productList.cancelButton')}</Button>
                <Button variant="contained" color="secondary" onClick={deleteProduct}>{translate('productList.deleteButton')}</Button>
            </CardActions>
        </Card>
    );

    function handleChangePage(event: unknown, newPage: number) {
        setPage(newPage);
    };

    function handleChangeRowsPerPage (event: React.ChangeEvent<HTMLInputElement>) {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return(
        <>
            <div className={`${classes.pageHeader} ${classes.mb2}`}>
                <Typography variant="h5">{translate('productList.pageTitle')}</Typography>
                <Button variant="contained" color="primary" component={RouterLink} to="/products/add">{translate('productList.addButton')}</Button>
            </div>
            
            {
                products.length > 0 ?
                (
                    <>
                        <div className={classes.tableContainer}>
                            <TableContainer component={Paper}>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>{translate('productList.tableHeaders.name')}</TableCell>
                                            <TableCell align="right">{translate('productList.tableHeaders.ean')}</TableCell>
                                            <TableCell>{translate('productList.tableHeaders.type')}</TableCell>
                                            <TableCell align="right">{translate('productList.tableHeaders.weight')}</TableCell>
                                            <TableCell>{translate('productList.tableHeaders.color')}</TableCell>
                                            <TableCell align="right">{translate('productList.tableHeaders.quantity')}</TableCell>
                                            <TableCell align="right">{translate('productList.tableHeaders.price')}</TableCell>
                                            <TableCell>{translate('productList.tableHeaders.active')}</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {(rowsPerPage > 0
                                            ? products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            : products
                                        ).map((product:IProduct) => (
                                            <TableRow key={product.id}>
                                                <TableCell component="th" scope="row">
                                                    {product.name}
                                                </TableCell>
                                                <TableCell align="right">{product.ean}</TableCell>
                                                <TableCell>{product.type}</TableCell>
                                                <TableCell align="right">{product.weight}</TableCell>
                                                <TableCell>{product.color}</TableCell>
                                                <TableCell align="right">{product.quantity}</TableCell>
                                                <TableCell align="right">{`$${product.price}`}</TableCell>
                                                <TableCell>
                                                    <Checkbox
                                                        color="primary"
                                                        checked={product.active}
                                                        onChange={() => updateActive(product.id)}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <div className={classes.actionsContainer}>
                                                        <Button variant="contained" component={RouterLink} size="small" 
                                                            to={`/products/${product.id}`}
                                                        >
                                                            {translate('productList.viewButton')}
                                                        </Button>

                                                        <Button variant="contained" color="primary" component={RouterLink} size="small"  
                                                            to={`/products/${product.id}/edit`}
                                                        >
                                                            {translate('productList.editButton')}
                                                        </Button>

                                                        <Button variant="contained" color="secondary" size="small" 
                                                            onClick={(e) => confirmDelete(product.id)}
                                                        >
                                                            {translate('productList.deleteButton')}
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                component='div'
                                count= {products.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                            />
                        </div>
                        <Modal
                            open={openModal}
                            onClose={(e) => setOpenModal(false)}
                        >{modalContent}</Modal>
                    </>
                ) :
                (
                    <Typography variant="h5">{translate('productList.noProduct')}</Typography>
                )
            }
        </>
    );
}