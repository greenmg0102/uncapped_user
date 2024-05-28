
import { useState, useEffect } from "react"
import ApexCharts from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { hero8Site } from '../../../../../utils/reference/playCardColor'

export default function StackPosition({ deviation }: any) {

    let option: any = {
        series: [
            {
                name: "Desktops",
                data: []
            },
        ],
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#FF0000'],
        stroke: {
            curve: 'straight',
            colors : ['FF0000'] 
        },
        title: {
            text: 'Product Trends by Month',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.05
            },
        },
        xaxis: {
            categories: [],
        }
    };

    useEffect(() => {


        if (deviation.length > 0) {

            let options = option;
            options.series[0].name = deviation[0].name
            options.series[0].data = deviation[0].data
            options.xaxis.categories = deviation[0].xXios

            const chart = new ApexCharts(document.querySelector("#deviation-chart"), options);
            chart.render();
        }


        // if (deviation !== undefined && deviation.series !== undefined) {

        //     options.series = deviation.series

        //     console.log("options", options);


        //     const chart = new ApexCharts(document.querySelector("#deviation-chart"), options);
        //     chart.render();
        // }



    }, [option, deviation]);


    return (
        <div>
            <div id="non-chart" className="h-[10px]"></div>
            <div id="deviation-chart"></div>
        </div>
    )
}


