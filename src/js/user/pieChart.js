
//user中的饼图
import chartColor from '../chartColor.js';
import { setChartSize, formatData,filterP5VINData, } from '../../js/utils';
let myChart08;
const pieChart = {
    getChart08: {
        showCharts: (dataShow) => {
            const _self = pieChart.getChart08;
            myChart08 = echarts.init(document.getElementById('chart08'));
            const option = {
                tooltip: {
                    formatter: function(params) {
                        const a = dataShow.find(item => item[0] === params.name);
                        return `${a[0]}: <br/>
                        veh_series: ${a[3]}<br/>
                        avgOStime: ${a[4]}<br/>
                        avgOSmileage: ${a[5]}<br/>`;
                    }
                },
                textStyle: {
                    color: '#333333'
                },
                series: [
                    {
                        type: 'pie',
                        data: getData(dataShow, true),
                        label: {
                            position: 'inside',
                        },
                        radius: [0, 79],
                        itemStyle: {
                            borderWidth: 1,
                            borderColor: '#FFFFFF',
                            normal:{
                                color: function(params) {
                                //自定义颜色
                                var colorList = [          
                                        chartColor[5], chartColor[6]
                                    ];
                                    return colorList[params.dataIndex]
                                 }
                            }
                        },
                        clockwise: true,
                        animation: false,
                    },
                    {
                        type: 'pie',
                        data: getData(dataShow, false),
                        label: {
                            position: 'inside',
                        },
                        radius: [80, 120],
                        itemStyle: {
                            borderWidth: 1,
                            borderColor: '#FFFFFF',
                            normal:{
                                color: function(params) {
                                //自定义颜色
                                var colorList = [          
                                        chartColor[7], chartColor[8], chartColor[9], chartColor[10], chartColor[11]
                                    ];
                                    return colorList[params.dataIndex]
                                 }
                            }
                        },
                        animation: false,
                    },
                ],
            };
            myChart08.setOption(option);
        },
        init: (VIN) => {
            setChartSize('08');
            const url = VIN ? './data/user/p5_vin.csv' : './data/user/p5_all.csv';
            $.get(url, function(theData){
                let data_in = formatData(theData);
                if (VIN) data_in = filterP5VINData(data_in, VIN);
                pieChart.getChart08.showCharts(data_in);
            });
        }
    },
};

const getValue = (nativeValue) => {
    let startValue = 0;
    let endValue = 0;
    let value = 0;
    if (nativeValue.length < 5) {
        return nativeValue.substring(0, nativeValue.indexOf('%'));
    } else if (nativeValue.indexOf('%') > 3) {
        startValue = 0
        endValue = nativeValue.substring(nativeValue.indexOf('~') + 1, nativeValue.lastIndexOf('%'));
        value = endValue - startValue;
        return value;
    }
    startValue = nativeValue.substring(0, nativeValue.indexOf('%'));
    endValue = nativeValue.substring(nativeValue.indexOf('~') + 1, nativeValue.lastIndexOf('%'));
    value = endValue - startValue;
    return value;
}

const getData = (dataShow, isInSide) => {
    let res = [];
    const r = isInSide ? 'inside' : 'outside';
    const Data = dataShow.filter(item => {
        return item[2] === r;
    });
    Data.map(item => {
        res.push({
            name: item[0],
            value: parseFloat(item[1]),
        });
    });
    if (r === 'outside') res = res.sort((a, b) => parseInt(a.name) - parseInt(b.name))
    return res;
}

export { pieChart, myChart08 };