import { useState, useRef, useEffect } from 'react'
import { Point, Chart } from 'chart.js'
import { generateChartConfig } from './chartFunctions'
import { asymmetricSpeedup, dynamicSpeedup, symmetricSpeedup } from './functs'
import { F_STEP } from './Constants'

type MyChartType = 'FS' | 'RS'

export function useChart(f: number, nPower: number, rPower: number, type: MyChartType) {
    const [symmetricData, setSymmetricData] = useState<any>()
    const [asymmetricData, setAsymmetricData] = useState<any>()
    const [dynamicData, setDynamicData] = useState<any>()

    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const chartRef = useRef<Chart | null>(null)

    useEffect(() => {
        if (canvasRef && canvasRef.current) {
            chartRef.current = new Chart(
                canvasRef.current.getContext('2d') as CanvasRenderingContext2D,
                generateChartConfig(type, f, nPower, rPower, symmetricData, asymmetricData, dynamicData))
        }

        return () => {
            chartRef.current?.destroy()
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const d1: Point[] = []
        const d2: Point[] = []
        const d3: Point[] = []

        if (type === 'FS') {
            const f_values = Array.from(Array(1 + 1 / F_STEP).keys()).map((f, i) => i * F_STEP)
            f_values.forEach((f) => {
                const n = Math.pow(2, nPower)
                const r = Math.pow(2, rPower)
                const point1 = {
                    x: f,
                    y: symmetricSpeedup(f, n, r)
                }
                const point2 = {
                    x: f,
                    y: asymmetricSpeedup(f, n, r)
                }
                const point3 = {
                    x: f,
                    y: dynamicSpeedup(f, n, r)
                }

                d1.push(point1)
                d2.push(point2)
                d3.push(point3)
            })

        } else if (type === 'RS') {
            const rPowerValues = Array.from(Array(nPower + 1).keys())
            const n = Math.pow(2, nPower)

            rPowerValues.forEach((rPower) => {
                const r = Math.pow(2, rPower)
                const point1 = {
                    x: rPower,
                    y: symmetricSpeedup(f, n, r)
                }
                const point2 = {
                    x: rPower,
                    y: asymmetricSpeedup(f, n, r)
                }
                const point3 = {
                    x: rPower,
                    y: dynamicSpeedup(f, n, r)
                }

                d1.push(point1)
                d2.push(point2)
                d3.push(point3)
            })
        }

        setSymmetricData(d1)
        setAsymmetricData(d2)
        setDynamicData(d3)

        // eslint-disable-next-line
    }, [f, nPower, rPower])


    useEffect(() => {
        if (chartRef && chartRef.current) {
            const chart = chartRef.current
            if (chart.data.datasets && chart.options.scales && chart.options.scales.xAxes) {
                chart.data.datasets[0].data = symmetricData;
                chart.data.datasets[1].data = asymmetricData;
                chart.data.datasets[2].data = dynamicData;

                (chart.options.scales.xAxes[0].ticks as Chart.TickOptions).max = type === 'FS' ? 1 : nPower;
                ((chart.options as any).annotation.annotations[0].value) = type === 'FS' ? f : rPower;

                chart.update()
            }
        }

        // eslint-disable-next-line
    }, [symmetricData, asymmetricData, dynamicData, f, rPower, nPower])


    return {
        canvasRef,
    }
}