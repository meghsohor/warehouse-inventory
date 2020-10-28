import React from 'react';
import { CardContent } from '../../material.components';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { IChartOptions } from '../../models/chart';

const ProductChart = (props: { chartOptions: IChartOptions | null }) => {
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
