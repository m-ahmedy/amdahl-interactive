import React from 'react';
import { ChartProps } from './shared';
import { useChart } from './useChart';

export default function ChartFS(props: ChartProps) {
    const { f, nPower, rPower } = props
    const { canvasRef } = useChart(f, nPower, rPower, 'FS')

    return (
        <div className='canvas-container'>
            <h2>Speedup , f</h2>
            <canvas ref={canvasRef} />
        </div>
    );
}
