//user中的横版柱状图
import chartColor from '../chartColor.js';
import { setChartSize, formatData,filterP6VINData, } from '../../js/utils';
let myChart10;
const hBarChart = {
    getChart10: {
        showCharts: (dataShow) => {
        const _self = hBarChart.getChart10;
        myChart10 = echarts.init(document.getElementById('chart10'));
        const xData = [0,20,40,60,80,100];
        const yData = dataShow.map(item => item[1]);
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: function(params) {
                    const a = dataShow.find(item =>
                        params[0].name === item[1]
                    );
                    return `${params[0].name}<br/>
                    top:${a[4]}<br/>
                    `;
                }
            },
            calculable: true,
            xAxis: [
                {
                    type: 'value',
                    data:xData,
                }
            ],
            yAxis: [
                {
                    type: 'category',
                    data: yData
                }
            ],
            series: [                 
                {
                    barWidth : 16, //宽度
                    name: 'HiBeam',
                    type: 'bar',
                    stack: '总量',
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                position: 'insideTop',
                            },
                            color: chartColor[9],
                        }
                    },
                    data: dataShow.map(item => item[2])
                },
                {
                    name: 'LowBeam',
                    type: 'bar',
                    stack: '总量',
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                position: 'insideRight'
                            },
                            color: chartColor[14],
                        }
                    },
                    data: dataShow.map(item => item[3])
                },
            ]
        };
        myChart10.setOption(option);
        },
    init: (VIN) => {
        setChartSize('10');
        const url = VIN ? './data/user/p6_vin.csv' : './data/user/p6_all.csv';
        $.get(url, function(theData){
            let data_in = formatData(theData);
            if (VIN) data_in = filterP6VINData(data_in, VIN);
            hBarChart.getChart10.showCharts(data_in);
        });
    }    
},
};

export { hBarChart, myChart10 };