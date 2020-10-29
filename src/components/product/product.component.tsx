import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link as RouterLink } from "react-router-dom";
import { getProduct, getProductPriceHistory, getProductQuantityHistory } from '../../services/dataService';
import { TabPanel, ProductDetails, ProductChart} from '../../components';
import { IProduct } from '../../models/product';
import { useTranslation } from 'react-i18next';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Button, Card, CardContent, CardActions, Typography } from '../../material.components';
import useStyles from './styles';
import ChartOptions from './chart-options';
import { IChartOptions } from '../../models/chart';



export default function Product() {
    const [product, setProduct] = useState<IProduct | null>(null);
    const [priceHistory, setPriceHistory] = useState<[] | null>(null);
    const [quantityHistory, setQuantityHistory] = useState<[] | null>(null);
    const [chartOptions, setChartOptions] = useState<IChartOptions | null>(null);
    const { id } = useParams<{id:string}>();
    const history = useHistory();
    const [openTab, setOpenTab] = React.useState(0);
    const classes = useStyles();
    const { t: translate } = useTranslation();


    /**
    * Product Detail tabs switch handler
    * @remarks
    * 0: details tab, 1: price history tab, 2: quantity history tab
    * If price history or quantity history tab is selected
    * chart-options will be prepared with the relative data
    *
    * @param1 - event: onChange event
    * @param2 - Index of clicked tab
    * @returns Void
    */
    function switchTab(event: React.ChangeEvent<{}>, tabIndex: number) {
        setOpenTab(tabIndex);
        if (tabIndex === 1 && priceHistory) {
            const options: IChartOptions = ChartOptions(tabIndex, priceHistory);
            setChartOptions(options);

        } else if (tabIndex === 2 && quantityHistory) {
            const options: IChartOptions = ChartOptions(tabIndex, quantityHistory);
            setChartOptions(options);
        }
    };
    
    useEffect(() => {
        if (id) {
            getProduct(id).then((res) => {
                if (res) {
                    setProduct(res);
                } else {
                    history.push('/');
                }
            });

            getProductPriceHistory(id).then((res) => setPriceHistory(res));

            getProductQuantityHistory(id).then((res) => setQuantityHistory(res));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        product &&
        (
            <div className={classes.wrapper}>
                <Typography variant="h5" align="center" style={{ marginBottom: 20 }}>{translate('product.pageTitle')}</Typography>
                <Card>

                    <Tabs
                        value={openTab}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={switchTab}
                        centered
                    >
                        <Tab label={translate('product.pageTitle')} tabIndex={0} />
                        <Tab label={translate('product.priceTab')} tabIndex={1} />
                        <Tab label={translate('product.quantityTab')} tabIndex={2} />
                    </Tabs>


                    <TabPanel value={openTab} index={0}>
                        <ProductDetails product={product} />
                    </TabPanel>


                    <TabPanel value={openTab} index={1}>
                        {priceHistory ? (
                            <ProductChart chartOptions={chartOptions} />
                        ) : (
                            <CardContent><h3>{translate('product.noHistory')}</h3></CardContent>
                        )}
                    </TabPanel>
                    
 
                    <TabPanel value={openTab} index={2}>
                        {quantityHistory ? (
                            <ProductChart chartOptions={chartOptions} />
                        ) : (
                            <CardContent><h3>{translate('product.noHistory')}</h3></CardContent>
                        )}
                    </TabPanel>



                    <CardActions disableSpacing>
                        <div className={classes.btnContainer}>

                            <Button variant="contained" color="secondary" component={RouterLink} to={`/products/${product.id}/edit`}>
                                {translate('product.editButton')}
                            </Button>
                            <Button type="submit" variant="contained" color="primary" component={RouterLink} to="/products">
                                {translate('product.backButton')}
                            </Button>

                        </div>
                    </CardActions>
                </Card>
            </div>
        )
    );
}