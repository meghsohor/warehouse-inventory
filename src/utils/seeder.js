import { getUUID } from './utilsFunctions';

const products = [
    {
        id: getUUID(),
        Name: "Frozen yoghurt",
        EAN: 978020137962,
        Type: "Dessert",
        Weight: 1000,
        Color: "White",
        Active: true
    },
    {
        id: getUUID(),
        Name: "Ice cream sandwich",
        EAN: 978020137962,
        Type: "Ice Cream",
        Weight: 200,
        Color: "Brown",
        Active: true
    },
    {
        id: getUUID(),
        Name: "Cupcake",
        EAN: 978020137962,
        Type: "Cake",
        Weight: 350,
        Color: "Black",
        Active: true
    }
];

export function seedProducts() {
    localStorage.setItem('wi_products', JSON.stringify(products));
    return JSON.parse(localStorage.getItem('wi_products'));
};