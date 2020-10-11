import React from 'react';
import { CardContent } from '../../material.components';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ProductChart = (props: { chartOptions: {} }) => {
    const options = props.chartOptions;
    return (
        <CardContent>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </CardContent>
    )
}

export default ProductChart;
