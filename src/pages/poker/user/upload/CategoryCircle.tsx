import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';


const LuckCircle = () => {

    useEffect(() => {
        const options = {
            series: [44, 55, 13, 43, 22, 34, 53, 68, 13],
            chart: {
                height: 320,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    dataLabels: {
                        name: {
                            fontSize: '22px',
                        },
                        value: {
                            fontSize: '16px',
                        },
                        total: {
                            show: true,
                            label: 'Total',
                            formatter: function (w: any) {
                                return 249;
                            }
                        }
                    }
                }
            },
            labels: ['GG', '888', 'IPoker', 'Ignition', 'Party', 'Winamax', 'WPN', 'PokerStars', 'BetOnline'],
        };
        const chart = new ApexCharts(document.querySelector("#lucky-wheel-chart"), options);
        chart.render();
    }, []);

    return (
        <div className="w-full h-[320px] flex justify-center items-center">
            <div id="lucky-wheel-chart"></div>
        </div>
    );
};

export default LuckCircle;