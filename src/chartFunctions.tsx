import { ChartOptions, ChartType, Point } from "chart.js"
import { MyChartType } from "./shared"
const ChartAnnotation = require('chartjs-plugin-annotation')

function log2Tick(v: any, i: any, vs: any) {
    const val = Math.pow(2, Number(v))
    if (val === Math.round(val))
        return Math.pow(2, Number(v))
}

function defaultTick(v: any, i: any, vs: any) {
    return v
}

function getChartData(symmetricData: Point[], asymmetricData: Point[], dynamicData: Point[]) {
    return {
        datasets: [
            {
                label: 'Symmetric',
                data: symmetricData,
                borderColor: 'red',
                backgroundColor: 'transparent'
            },
            {
                label: 'Asymmetric',
                data: asymmetricData,
                borderColor: 'blue',
                backgroundColor: 'transparent'
            },
            {
                label: 'Dynamic',
                data: dynamicData,
                borderColor: 'green',
                backgroundColor: 'transparent'
            }
        ]
    }
}

export function generateChartConfig(type: MyChartType, f: number, rPower: number, nPower: number, symmetricData: Point[], asymmetricData: Point[], dynamicData: Point[]) {
    return {
        plugins: [ChartAnnotation],
        type: 'line',
        data: getChartData(symmetricData, asymmetricData, dynamicData),
        options: {
            annotation: {
                annotations: [
                    {
                        type: 'line',
                        display: true,
                        mode: 'vertical',
                        value: type === 'FS' ? f : rPower,
                        scaleID: 'x-scale',
                        borderColor: 'grey',
                        borderWidth: 2,
                        borderDash: [2, 2],
                    }
                ]
            },
            animation: {
                duration: 0
            },
            scales: {
                xAxes: [{
                    id: 'x-scale',
                    scaleLabel: {
                        display: true,
                        labelString: type === 'FS' ? 'f' : 'r BCEs',
                        fontSize: 18
                    },
                    type: 'linear',
                    ticks: {
                        min: 0,
                        max: type === 'FS' ? 10 : nPower,
                        callback: type === 'FS' ? defaultTick : log2Tick,
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Speedup',
                        fontSize: 18
                    },
                    type: 'linear',
                    position: 'left'
                }]
            }
        } as ChartOptions
    }
}
