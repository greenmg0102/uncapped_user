
import { useEffect } from "react"
import ApexCharts from 'apexcharts' 

export default function StackPosition({ deviation }: any) {

    let option: any = {
        series: [
            {
                name: "BB",
                data: []
            },
            {
                name: "Net Expected",
                data: []
            },
            {
                name: "Showcase",
                data: []
            },
            {
                name: "Not Showcase",
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
        stroke: {
            curve: 'straight',
            width: 3,
        },
        title: {
            text: 'Product Trends by Month',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.01
            },
        },
        xaxis: {
            categories: [],
            tickAmount:10,
            axisTicks: {
                show: false // Hides the ticks
            }
        },
    };

    useEffect(() => {

        if (deviation.length > 0) {

            let options = option;

            options.series[0].name = "BB"
            options.series[0].data = deviation[0].sumBBData

            options.series[1].name = "Net Expected"
            options.series[1].data = deviation[0].sumExpectedData

            options.series[2].name = "ShowCase"
            options.series[2].data = deviation[0].sumShowData

            options.series[3].name = "not ShowCase"
            options.series[3].data = deviation[0].sumNotShowHandData

            options.xaxis.categories = deviation[0].xXios

            const chart = new ApexCharts(document.querySelector("#deviation-chart"), option);
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


