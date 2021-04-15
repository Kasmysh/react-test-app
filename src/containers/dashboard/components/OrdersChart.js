import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js'

export default function OrdersChart({ data, ...rest }) {
  const chartContainer = useRef(null);
  useEffect(() => {
    new Chart(chartContainer.current, {
      type: 'line',
      data: {
        labels: Object.keys(data),
        datasets: [{
          label: 'Orders count by date',
          data: Object.values(data),
          borderWidth: 1
        }]
      },
      options: {
        responsive: false,
        plugins: {
          legend: {
            position: 'top',
          },
        }
      }
    });
  }, [chartContainer])

  return (
    <div {...rest}>
      <canvas
        style={{ width: 400, height: 300 }}
        ref={chartContainer}
      />
    </div>
  )
}
