import React, { useRef, useEffect, useState, useCallback } from 'react';
import Chart, { ChartOptions, Point } from 'chart.js'
import { asymmetricSpeedup, dynamicSpeedup, symmetricSpeedup } from './functs'
import { useChart } from './useChart';
import { ChartProps } from './shared';

export default function ChartRS(props: ChartProps) {
    const { nPower, f, rPower } = props
    const { canvasRef } = useChart(f, nPower, rPower, 'RS')

    return (
        <div className='canvas-container'>
            <h2>Speedup , r</h2>
            <canvas ref={canvasRef} />
        </div>
    );
}