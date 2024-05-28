
import { useState, useEffect } from "react"
import ApexCharts from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { hero8Site } from '../../../../../utils/reference/playCardColor'

export default function StackPosition({ deviation }: any) {


    let option = {
        series: [
            // {
            //     type: 'rangeArea',
            //     name: 'UTG +1',

            //     data: [
            //         {
            //             x: '10',
            //             y: [11, 19]
            //         },
            //         {
            //             x: '15',
            //             y: [12, 18]
            //         },
            //         {
            //             x: '20',
            //             y: [9, 29]
            //         },
            //         {
            //             x: '25',
            //             y: [14, 27]
            //         },
            //         {
            //             x: '30',
            //             y: [26, 39]
            //         },
            //         {
            //             x: '40',
            //             y: [5, 17]
            //         },
            //         {
            //             x: '50',
            //             y: [19, 23]
            //         },
            //         {
            //             x: '60',
            //             y: [10, 15]
            //         },
            //         {
            //             x: '80',
            //             y: [5, 17]
            //         },
            //         {
            //             x: '1',
            //             y: [19, 23]
            //         }
            //     ]
            // },

            // {
            //     type: 'rangeArea',
            //     name: 'UTG Deviation',
            //     data: [
            //         {
            //             x: '10',
            //             y: [31, 34]
            //         },
            //         {
            //             x: '15',
            //             y: [42, 52]
            //         },
            //         {
            //             x: '20',
            //             y: [39, 49]
            //         },
            //         {
            //             x: '25',
            //             y: [34, 39]
            //         },
            //         {
            //             x: '30',
            //             y: [51, 59]
            //         },
            //         {
            //             x: '40',
            //             y: [54, 67]
            //         },
            //         {
            //             x: '50',
            //             y: [43, 46]
            //         },
            //         {
            //             x: '60',
            //             y: [21, 29]
            //         },
            //         {
            //             x: '80',
            //             y: [43, 46]
            //         },
            //         {
            //             x: '1',
            //             y: [21, 29]
            //         }
            //     ]
            // },

            // {
            //     type: 'line',
            //     name: 'UTG +1 Center Value',
            //     data: [
            //         {
            //             x: '10',
            //             y: 15
            //         },
            //         {
            //             x: '15',
            //             y: 17
            //         },
            //         {
            //             x: '20',
            //             y: 19
            //         },
            //         {
            //             x: '25',
            //             y: 22
            //         },
            //         {
            //             x: '30',
            //             y: 30
            //         },
            //         {
            //             x: '40',
            //             y: 10
            //         },
            //         {
            //             x: '50',
            //             y: 21
            //         },
            //         {
            //             x: '60',
            //             y: 12
            //         },
            //         {
            //             x: '8',
            //             y: 18
            //         },
            //         {
            //             x: '1',
            //             y: 20
            //         }
            //     ]
            // },
            // {
            //     type: 'line',
            //     name: 'UTG Center Value',
            //     data: [
            //         {
            //             x: '10',
            //             y: 33
            //         },
            //         {
            //             x: '15',
            //             y: 49
            //         },
            //         {
            //             x: '20',
            //             y: 43
            //         },
            //         {
            //             x: '25',
            //             y: 37
            //         },
            //         {
            //             x: '30',
            //             y: 55
            //         },
            //         {
            //             x: '40',
            //             y: 59
            //         },
            //         {
            //             x: '50',
            //             y: 45
            //         },
            //         {
            //             x: '60',
            //             y: 24
            //         },
            //         {
            //             x: '80',
            //             y: 21
            //         },
            //         {
            //             x: '1',
            //             y: 15
            //         }
            //     ]
            // }
        ],
        chart: {
            height: 330,
            type: 'rangeArea',
            animations: {
                speed: 5
            }
        },
        colors: ["#F3B415", "#F27036", "#663F59", "#6A6E94", "#4E88B4", "#00A7C6", "#18D8D8", '#A9D794'],
        dataLabels: {
            enabled: false
        },
        fill: {
            opacity: [0.34, 0.34, 0.34, 0.34, 0.34, 0.34, 0.34, 0.34]
        },
        forecastDataPoints: {
            count: 2
        },
        stroke: {
            curve: 'straight',
            width: [0, 0, 0, 0, 0, 0, 0, 0]
        },
        legend: {
            show: true,
            customLegendItems: ['BB', 'SB', 'BTN', 'CO', 'HJ', 'LJ', 'UTG +1', 'UTG'],
            inverseOrder: true
        },
        markers: {
            hover: {
                sizeOffset: 5
            }
        },
        yaxis: {
            min: -10,
            max: 100,
            tickAmount: 4,
        }
    }


    useEffect(() => {

        if (deviation !== undefined && deviation.series !== undefined) {

            let options = option;
            options.series = deviation.series

            const chart = new ApexCharts(document.querySelector("#deviation-chart"), options);
            chart.render();
        }

    }, [option, deviation]);


    return (
        <div>
            <div id="non-chart" className="h-[10px]"></div>
            <div id="deviation-chart"></div>
        </div>
    )
}


