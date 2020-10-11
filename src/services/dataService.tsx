import localForage from 'localforage';
import { IProduct } from '../models/product';
import moment from 'moment';

const PRODUCT_KEY = 'wi_products';
const HISTORY_KEY = 'wi_products_history';
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
                    } else if (item.quantity !== product.quantity) {
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

            return localForage.setItem(PRODUCT_KEY, newProducts).then((data: any) => {
                if (data) return data;
                return [];
            });
        }
    });
}

export async function setProductPriceHistory(id:string, price:number) {
    localForage.getItem(HISTORY_KEY).then((res) => {
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

        localForage.setItem(HISTORY_KEY, allProductsHistory).then((res) => {
            //console.log(res)
        });
    });
}

export async function getProductPriceHistory(id:string) {
    return localForage.getItem(HISTORY_KEY).then((res) => {
        let allProductsHistory: any = res;
        if (allProductsHistory && allProductsHistory[id] && allProductsHistory[id].priceHistory) {
            return allProductsHistory[id].priceHistory;
        } else {
            return null;
        }
    });
}

export async function setProductQuantityHistory(id:string, quantity:number) {
    localForage.getItem(HISTORY_KEY).then((res) => {
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

        localForage.setItem(HISTORY_KEY, allProductsHistory).then((res) => {
            //console.log(res)
        });
    });
}

export async function getProductQuantityHistory(id: string) {
    return localForage.getItem(HISTORY_KEY).then((res) => {
        let allProductsHistory: any = res;
        if (allProductsHistory && allProductsHistory[id] && allProductsHistory[id].quantityHistory) {
            return allProductsHistory[id].quantityHistory;
        } else {
            return null;
        }
    });
}