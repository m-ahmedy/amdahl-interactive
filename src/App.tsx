import React, { useState, useCallback } from 'react';
import ChartRS from './ChartRS';
import ChartFS from './ChartFS';
import './App.css'
import { F_STEP } from './Constants';

function App() {
  const [nPower, setN] = useState<number>(5)
  const [f, setF] = useState<number>(0.1)
  const [rPower, setR] = useState<number>(1)

  const changeHandler = useCallback((e: any) => {
    const eventTarget: HTMLInputElement = e.target
    const value = Number(eventTarget.value) as number
    if (eventTarget.name === 'f') {
      setF(value)
    }
    if (eventTarget.name === 'n') {
      if (rPower > Number(eventTarget.value)) {
        setR(value)
        setN(value)
      } else {
        setN(value)
      }
    }
    if (eventTarget.name === 'r') {
      setR(Number(eventTarget.value) as number)
    }

  }, [rPower])

  return (
    <div className='container'>
      <h1>
        Amdahl’s Law in the Multicore Era
      </h1>
      <div className='flex-chart-container'>
        <div className='flex-chart-item'>
          <ChartRS rPower={rPower} nPower={nPower} f={f} />
          <p className='chart-at'>At f = {f}</p>
        </div>
        <div className='flex-chart-item'>
          <ChartFS f={f} nPower={nPower} rPower={rPower} />
          <p className='chart-at'>At n = {Math.pow(2, nPower)}, r = {Math.pow(2, rPower)}</p>
        </div>
      </div>
      <hr />
      <div className='input-container'>
        <div className='input-group'>
          <label htmlFor='f'>f</label>
          <input className='canvas-input' type='number' name='f' value={f} onChange={changeHandler} min={0} max={1} step={F_STEP} />
          <p>f = {f}</p>
        </div>
        <div className='input-group'>
          <label htmlFor='n'>Power of n</label>
          <input className='canvas-input' type='number' name='n' value={nPower} onChange={changeHandler} min={0} max={10} />
          <p>n = 2^{nPower} = {Math.pow(2, nPower)} BCEs</p>
        </div>
        <div className='input-group'>
          <label htmlFor='r'>Power of r</label>
          <input className='canvas-input' type='number' name='r' value={rPower} onChange={changeHandler} min={0} max={nPower} />
          <p>r = 2^{rPower} = {Math.pow(2, rPower)} BCEs per Core</p>
        </div>
      </div>
    </div>
  )
}

export default App;
