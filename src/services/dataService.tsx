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

/**
* Get all products from localStorage
*
* @returns products [] | []
*/
export async function getAllProducts() {
    return localForage.getItem(PRODUCT_KEY).then((products) => {
        if (products) return products;
        return [];
    });
}


/**
* Get single product from localStorage
*
* @param id: string
* @returns product {} | null
*/
export async function getProduct(id:string) {
    return localForage.getItem(PRODUCT_KEY).then((products:any) => {
        if (products) {
            return products.find((product: IProduct) => product.id === id);
        }
        return null;
    });
}

/**
* Add a product to localStorage
*
* @remarks
* Add product to the product list array
* If there is no exisiting product list, creates an empty array
*
* @param product: {IProduct}
* @returns true | false
*/
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

/**
* Update multiple products
*
* @param products - an array of products to be updated
* @returns All the products
*/
export async function updateProducts(products:IProduct[]) {

    return localForage.setItem(PRODUCT_KEY, products).then((data:any) => {
        if (data) return data;
        return [];
    });
}


/**
* Update single product
*
* @remarks
* Get all the products from the localStorage
* find a product by the `product.id`
* Create a new product list with the updated product
* Store the new product list in the localStorage
*
* @param product {IProduct}
* @returns products []
*/
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

            return localForage.setItem(PRODUCT_KEY, newProducts).then((data:IProduct[]) => {
                return data;
            });
        }
    });
}

/**
* Delete product
*
* @remarks
* Get all the products from the localStorage
* find a product by the `product.id`
* Create a new products array without the target product
* Store the new product list in the localStorage
* Delete the product's Price History
* Delete the product's Quantity History
*
* @param id:string
* @returns products []
*/
export async function deleteProduct(productID:string) {
    return localForage.getItem(PRODUCT_KEY).then((data) => {
        const products:any = data;

        if (products && products.length) {
            const newProducts = products.filter((product: IProduct) => product.id !== productID);

            //deleting the price & quantity history
            deleteProductPriceHistory(productID);
            deleteProductQuantityHistory(productID);


            return localForage.setItem(PRODUCT_KEY, newProducts).then((data) => {
                if (data)
                    return data;
                return [];
            });
        }
    });
}


/**
* Add/Update a product's price history
* Product Price History is an object
* Each product's id is a property
* Each property contains an array of object
* Each object contains the price and the time of price update
* Price history array of each product can contain max 5 objects
* 
* @remarks
* Get the price history of all the products
* If the price history of the product exists, add the new price and current time as an item
* If the price history of the products contains more than 5 items, delete the first/oldest item
* If the price history of the product doesn't exist, create an empty array and add the new price and current time as an item
*
* @param id:string - id of the product
* @param price:number - current price of the product
* @returns void
*/
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


/**
* Get the price history of a product
*
* @param id: string
* @returns history [] | null
*/
export async function getProductPriceHistory(id:string) {
    return localForage.getItem(PRICE_HISTORY_KEY).then((res) => {
        let allProductsHistory:any = res;
        if (allProductsHistory && allProductsHistory[id] && allProductsHistory[id].priceHistory) {
            return allProductsHistory[id].priceHistory;
        } else {
            return null;
        }
    });
}

/**
* Delete a product's price history
* This function is called from `deleteProduct`
*
* @param id: string
* @returns void
*/
export async function deleteProductPriceHistory(id: string) {
    localForage.getItem(PRICE_HISTORY_KEY).then((data) => {
        const priceHistory: any = data;
        if (priceHistory && priceHistory[id]) {
            delete priceHistory[id]
            localForage.setItem(PRICE_HISTORY_KEY, priceHistory);
        }
    });
}

/**
* Add/Update a product's quantity history
* Product Quantity History is an object
* Each product's id is a property
* Each property contains an array of object
* Each object contains the quantity and the time of quantity update
* Quantity history array of each product can contain max 5 objects
*
* @remarks
* Get the quantity history of all the products
* If the quantity history of the product exists, add the new quantity and current time as an item
* If the quantity history of the products contains more than 5 items, delete the first/oldest item
* If the quantity history of the product doesn't exist, create an empty array and add the new quantity and current time as an item
*
* @param id:string - id of the product
* @param quantity:number - current quantity of the product
* @returns void
*/
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

/**
* Get the quantity history of a product
*
* @param id: string
* @returns history [] | null
*/
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


/**
* Delete a product's quantity history
* This function is called from `deleteProduct`
*
* @param id: string
* @returns void
*/
export async function deleteProductQuantityHistory(id: string) {
    localForage.getItem(QUANTITY_HISTORY_KEY).then((data) => {
        const quantityHistory: any = data;

        if (quantityHistory && quantityHistory[id]) {
            delete quantityHistory[id]
            localForage.setItem(QUANTITY_HISTORY_KEY, quantityHistory);
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