import moment from 'moment';
import { IChartOptions } from '../../models/chart'

const ChartOptions = (index:number, chartData:[]) => {

    const options: IChartOptions = {
        chart: {
            type: 'line'
        },
        title: {
            text: null
        },
        xAxis: {
            categories: chartData?.map((item: any) => moment(item.modifiedAt).format('lll'))
        },
        yAxis: {
            labels: {
                // eslint-disable-next-line no-template-curly-in-string
                format: index === 1 ? '${value}' : null,
            },
            title: {
                text: index === 1 ? 'Price' : 'Quantity'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
            }
        },
        series: [{
            showInLegend: false,
            name: index === 1 ? 'Price' : 'Quantity',
            data: chartData?.map((item: any) => index === 1 ? Number(item.price) : Number(item.quantity)),
            // eslint-disable-next-line no-template-curly-in-string
            format: index === 1 ? '${value}' : null,
        }]
    }

    return options;
}

export default ChartOptions;