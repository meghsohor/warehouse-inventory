import localForage from 'localforage';
import { IProduct } from '../models/product';
import moment from 'moment';

const PRODUCT_KEY = 'wi_products';
const PRICE_HISTORY_KEY = 'wi_products_price_history';
const QUANTITY_HISTORY_KEY = 'wi_products_quantity_history';
const LANGUAGE_KEY = 'wi_current_language';
localForage.config({
    driver: [
        localForage.LOCALSTORAGE,
    ]
});

export async function getAllProducts() {
    return localForage.getItem(PRODUCT_KEY).then((products) => {
        if (products) return products;
        return [];
    });
}

export async function getProduct(id:string) {
    return localForage.getItem(PRODUCT_KEY).then((products:any) => {
        if (products) {
            return products.find((product: IProduct) => product.id === id);
        }
        return null;
    });
}

export async function addProduct(product:IProduct) {
    return localForage.getItem(PRODUCT_KEY).then((products: any) => {
        if (products) {
            products = [product, ...products];
        } else {
            products = [product];
        }

        setProductPriceHistory(product.id, product.price);
        setProductQuantityHistory(product.id, product.quantity);

        return localForage.setItem(PRODUCT_KEY, products).then((data: any) => {
            if (data) return true;
            return false;
        });
    }); 
}

export async function updateProducts(products:IProduct[]) {

    return localForage.setItem(PRODUCT_KEY, products).then((data:any) => {
        if (data) return data;
        return [];
    });
}

export async function updateProduct(product: IProduct) {
    return localForage.getItem(PRODUCT_KEY).then((data) => {
        const products: any = data;

        if (products && products.length) {
            const newProducts = products.map((item: IProduct) => {
                if (item.id === product.id ) {
                    if (item.price !== product.price) {
                        setProductPriceHistory(product.id, product.price);
                    } 
                    if (item.quantity !== product.quantity) {
                        setProductQuantityHistory(product.id, product.quantity);
                    }
                    return product;
                }
                return item;
            });

            return localForage.setItem(PRODUCT_KEY, newProducts).then((data: any) => {
                if (data) return data;
                return [];
            });
        }
    });
}

export async function deleteProduct(productID:string) {
    return localForage.getItem(PRODUCT_KEY).then((data) => {
        const products:any = data;

        if (products && products.length) {
            const newProducts = products.filter((product: IProduct) => product.id !== productID);

            //deleting the price & quantity history
            deleteProductPriceHistory(productID);
            deleteProductQuantityHistory(productID);


            return localForage.setItem(PRODUCT_KEY, newProducts).then((data: any) => {
                if (data) return data;
                return [];
            });
        }
    });
}

export async function setProductPriceHistory(id:string, price:number) {
    localForage.getItem(PRICE_HISTORY_KEY).then((res) => {
        let allProductsHistory:any = res;

        if (allProductsHistory && allProductsHistory[id]) {
            const productHistory = allProductsHistory[id];
            if (productHistory.priceHistory) {
                productHistory.priceHistory.push({ price, modifiedAt: moment().utc().format()});
                if (productHistory.priceHistory.length > 5) {
                    productHistory.priceHistory.shift();
                }
            } else {
                productHistory.priceHistory = [{ price, modifiedAt: moment().utc().format() }];
            }
        } else if (allProductsHistory) {
            allProductsHistory[id] = {
                priceHistory: [{ price, modifiedAt: moment().utc().format() }]
            }
        } else {
            allProductsHistory = {};
            allProductsHistory[id] = {
                priceHistory: [{ price, modifiedAt: moment().utc().format() }]
            }
        }

        localForage.setItem(PRICE_HISTORY_KEY, allProductsHistory).then((res) => {
            //console.log(res)
        });
    });
}

export async function getProductPriceHistory(id:string) {
    return localForage.getItem(PRICE_HISTORY_KEY).then((res) => {
        let allProductsHistory: any = res;
        if (allProductsHistory && allProductsHistory[id] && allProductsHistory[id].priceHistory) {
            return allProductsHistory[id].priceHistory;
        } else {
            return null;
        }
    });
}

/*-------------- Need to work on this ----------------------*/
export async function deleteProductPriceHistory(id: string) {
    localForage.getItem(PRICE_HISTORY_KEY).then((data) => {
        const priceHistory: any = data;
        console.log(priceHistory[id])
        if (priceHistory && priceHistory[id]) {
            const {id, ...newPriceHistory} = priceHistory;

            localForage.setItem(PRICE_HISTORY_KEY, newPriceHistory);
        }
    });
}

export async function setProductQuantityHistory(id:string, quantity:number) {
    localForage.getItem(QUANTITY_HISTORY_KEY).then((res) => {
        let allProductsHistory: any = res;
        if (allProductsHistory && allProductsHistory[id]) {
            const productHistory = allProductsHistory[id];
            if (productHistory.quantityHistory) {
                productHistory.quantityHistory.push({ quantity, modifiedAt: moment().utc().format() });
                if (productHistory.quantityHistory.length > 5) {
                    productHistory.quantityHistory.shift();
                }
            } else {
                productHistory.quantityHistory = [{ quantity, modifiedAt: moment().utc().format() }];
            }
        } else if (allProductsHistory) {
            allProductsHistory[id] = {
                quantityHistory: [{ quantity, modifiedAt: moment().utc().format() }]
            }
        } else {
            allProductsHistory = {};
            allProductsHistory[id] = {
                quantityHistory: [{ quantity, modifiedAt: moment().utc().format() }]
            }
        }

        localForage.setItem(QUANTITY_HISTORY_KEY, allProductsHistory).then((res) => {
            //console.log(res)
        });
    });
}

export async function getProductQuantityHistory(id: string) {
    return localForage.getItem(QUANTITY_HISTORY_KEY).then((res) => {
        let allProductsHistory: any = res;
        if (allProductsHistory && allProductsHistory[id] && allProductsHistory[id].quantityHistory) {
            return allProductsHistory[id].quantityHistory;
        } else {
            return null;
        }
    });
}

/*-------------- Need to work on this ----------------------*/
export async function deleteProductQuantityHistory(id: string) {
    localForage.getItem(QUANTITY_HISTORY_KEY).then((data) => {
        const quantityHistory: any = data;

        if (quantityHistory && quantityHistory[id]) {
            const { id, ...newQuantityHistory } = quantityHistory;

            localForage.setItem(QUANTITY_HISTORY_KEY, newQuantityHistory);
        }
    });
}


export async function getCurrentLanguage() {
    return localForage.getItem(LANGUAGE_KEY).then((language) => {
        if (language) {
            return language;
        }
        return 'en';
    });
}

export async function setCurrentLanguage(language:string) {
    localForage.setItem(LANGUAGE_KEY, language)
}