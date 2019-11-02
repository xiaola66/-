//user中的时间极坐标图
import chartColor from '../chartColor.js';
import { setChartSize, formatData, filterP1VINData } from '../../js/utils';
let myChart05;
const timePolar = {
    getChart05: {
        getSeries: (data) => {
            let a = [],
                b = [];
            const colors = ['#fff000', '#ff000ff', '#e0e0e0', '#f0f0f0', chartColor[5], chartColor[5]];
            //data = data.filter((item, index) => index < 10);
            data.map(d => {
                if (!a.includes(d[3])) {
                    a.push(d[3]);
                    b.push({
                        title: d[3],
                        coordinateSystem: 'polar',
                        angleAxisIndex: 0,
                        radiusAxisIndex: 0,
                        name: d[3],
                        type: 'scatter',
                        symbolSize: 10,
                        data: [[d[0] - 1, parseFloat(d[1]), parseInt(d[2] * 2 / 1000)]]
                    });
                } else {
                    const c = b.find(i => i.title === d[3]);
                    c.data.push([d[0] - 1, parseFloat(d[1]), parseInt(d[2] * 2 / 1000)]);
                }
            });
            return {
                seriesData: b,
                legendData: a,
            }
        },
        showCharts: (dataShow) => {
        const _self = timePolar.getChart05;
        myChart05 = echarts.init(document.getElementById('chart05'));
        const series = _self.getSeries(dataShow).seriesData;
        const legendData = _self.getSeries(dataShow).legendData;
        const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
        // const days = [1, 2, 3, 4, 5, 6, 7];
        const days = ['一', '二', '三', '四', '五', '六', '日'];
        // const days = ['M','T','W','T','F','S','S']
        // const days = ['Mon', 'Tue','Wed' , 'Thu','Fri' ,'Sat' ,'Sun'];
        let legendSelected = {};
        legendData.map((item, index) => {
            const check = index === legendData.length - 1;
            legendSelected[item] = check;
        });
        const option = {
            polar: {
        　　    center: ['50%', '54%']
            },
            tooltip: {
                formatter: function(params) {
                    const a = dataShow.find(item =>
                        parseFloat(item[0]) === params.value[0] + 1 &&
                        parseFloat(item[1]) === params.value[1] &&
                        params.seriesName === item[3]
                        );
                    return `wk: ${a[0]}<br/>
                    h:${a[1]}<br/>
                    road: ${a[3]}<br/>
                    avgTrpODO: ${a[5]}<br/>
                    avgTrpTime: ${a[6]}<br/>
                    avg_maxVhlSpd: ${a[7]}<br/>
                    avgEngSpd: ${a[8]}<br/>
                    `;
                }
            },
            legend: {
                data: legendData,
                top: 0,
                selected: legendSelected,
            },
            angleAxis: {
                type: 'category',
                data: hours,
                boundaryGap: false,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#ddd',
                        type: 'dashed'
                    }
                },
                axisLine: {
                    show: false
                }
            },
            radiusAxis: {
                type: 'category',
                data: days,    
                axisLine: {
                    show: false
                },
                axisLabel: {
                    // rotate: 30,
                    fontSize:11,
                }
            },
            series,
        };
       
        myChart05.setOption(option, true);
        },
    init: (VIN) => {
        setChartSize('05');
        const url = VIN ? './data/user/p1_vin.csv' : './data/user/p1_all.csv';
        $.get(url, function(theData){
            let data_in = formatData(theData);
            if (VIN) data_in = filterP1VINData(data_in, VIN);
            timePolar.getChart05.showCharts(data_in);
        });
    }    
},
};

export { timePolar, myChart05 };