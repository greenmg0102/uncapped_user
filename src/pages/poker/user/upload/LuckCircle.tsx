import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

const LuckCircle = () => {

    useEffect(() => {

        const options = {
            series: [44, 55],
            chart: {
                width: 380,
                type: 'donut',
            },
            labels: ['bb/100', 'all-in bb/100'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        };
        const chart = new ApexCharts(document.querySelector("#category-poker-net-chart"), options);
        chart.render();
    }, []);

    return (
        <div className="w-full h-[320px] flex justify-center items-center">
            <div id="category-poker-net-chart"></div>
        </div>
    );
};

export default LuckCircle;