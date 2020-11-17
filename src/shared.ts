import { type } from "os";

export type MyChartType = 'FS' | 'RS'

export interface ChartProps {
    nPower: number
    rPower: number
    f: number
}