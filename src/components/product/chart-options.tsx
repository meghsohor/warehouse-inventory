import moment from 'moment';

const ChartOptions = (index:number, chartData:[]) => {
    let options;

    if (index === 1) {
        options = {
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
                    format: '${value}',
                },
                title: {
                    text: 'Price'
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
                name: 'Price',
                data: chartData?.map((item: any) => item.price),
                // eslint-disable-next-line no-template-curly-in-string
                format: '${value}',
            }]
        }
    } else if (index === 2) {
        options = {
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
                title: {
                    text: 'Quantity'
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
                name: 'Quantity',
                data: chartData?.map((item: any) => item.quantity)
            }]
        }
    }

    return options;
}

export default ChartOptions;