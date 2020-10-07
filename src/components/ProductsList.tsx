import React from 'react';
import useLocalStorage from '../utils/useLocalStorage';
import { DataGrid, ColDef } from '@material-ui/data-grid';

export default function ProductsList() {
    const [products, setProducts] = useLocalStorage('wi_products', []);

    const columns: ColDef[] = [
        { field: 'Name', headerName: 'Name', width: 250 },
        { field: 'EAN', headerName: 'EAN', width: 200 },
        { field: 'Type', headerName: 'Type', width: 200 },
        { field: 'Weight', headerName: 'Weight (gm)', width: 200 },
        { field: 'Color', headerName: 'Color', width: 200 },
        { field: 'Active', headerName: 'Active', width: 100 },
    ];

    return(
        <>
            <h1>Product List</h1>
            
            {
                products.length > 1 ?
                (
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid rows={products} columns={columns} pageSize={5} />
                    </div>
                ) :
                (
                    <h3>No products found!</h3>
                )
            }
        </>
    );
}