import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';


export default function TemperatureChart({temperatures, label}) {
    const valueFormatter = function(value) {
        return  `${value} °C`;
    }

    return (
        <LineChart
            dataset={temperatures}
            xAxis={[
                {
                    scaleType: 'band',
                    dataKey: 'date',
                    label: label,
                }
            ]}
            series={[{ dataKey: 'temperature', label: 'Temperature Celsius', valueFormatter }]}
            height={300}
            yAxis={ [{label: 'temperature °C' }]}
            sx={{ [`.${axisClasses.left} .${axisClasses.label}`]: {transform: 'translate(-10px, 0)'}}}
        />
    );
}