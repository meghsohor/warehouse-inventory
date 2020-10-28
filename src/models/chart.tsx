export interface IChartOptions {
    chart: {
        type: string
    },
    title: {
        text: null | string
    },
    xAxis: {
        categories: string[]
    },
    yAxis: {
        labels: {
            format: string | null
        },
        title: {
            text: string | null
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: boolean
            }
        }
    },
    series: [
        {
            showInLegend: boolean,
            name: string,
            data: number[],
            format: string | null
        }
    ]
}