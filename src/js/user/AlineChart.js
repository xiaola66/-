//user中的加速度折线图
// import chartColor from '../chartColor.js';
import { setChartSize, formatData, filterP4VINData } from '../../js/utils';
let myChart06;
let data = [];
const acceleratedLine = {
    getChart06: {
        getSeries: (data) => {
            let a = [],
                b = [];
            const colorsList = ['#75e9b2','#ee6a4d',];
            data.map((d, index) => {
                if (!a.includes(d[1])) {
                    a.push(d[1]);
                    b.push({
                        title: d[1],
                        name: d[1],
                        type: "line",
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 10,
                        data: [parseFloat(d[2])],
                        itemStyle: {
                            normal: {
                                color: colorsList[index/3],
                                lineStyle: {
                                    width: 1,
                                }
                            }
                        }
                    });
                } else {
                    const c = b.find(i => i.title === d[1]);
                    c.data.push(parseFloat(d[2]));
                }
            });
            return {
                seriesData: b,
                legendData: a,
            }
        },
        showCharts: (dataShow) => {
        const _self = acceleratedLine.getChart06;
        myChart06 = echarts.init(document.getElementById('chart06'));
        const series = _self.getSeries(dataShow).seriesData;
        const legendData = _self.getSeries(dataShow).legendData;
        const xData = [...new Set(dataShow.map(item => item[0]))];
        const option = {
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '14%'];
                }
            },
    
            legend: {
                data: legendData,
                x: 'left'
            },
    
            xAxis: {
                type: 'category',
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                boundaryGap: true,
    
                data: xData
            },
            yAxis: [{
                type: 'value',
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    lineStyle: {
                        type: 'dotted',
                    }
                },
                splitArea: {//背景条纹
                    show: true,
                    areaStyle: {
                        color: [
                            'rgba(255,255,255,0)',
                            'rgba(242,243,248,1)'
                        ]
                    }
    
                },
                min: 0,
                splitNumber: 5,
                axisLabel : {
                    formatter: function(){
                        return "";
                    }
                }
            }],
            dataZoom: [{
                type: "slider", /*类型*/
                xAxisIndex: 0, /*对应的轴*/
                bottom: "10", /*位置，定位*/
                start: 30, /*开始*/
                end: 75, /*结束*/
                handleIcon: "M0,0 v9.7h5 v-9.7h-5 Z",
                handleStyle: { /*手柄的样式*/
                    color: "#40bcf9",
                    borderColor: "#1fb2fb"
                },
                backgroundColor: "#e2f3ff", /*背景 */
                dataBackground: { /*数据背景*/
                    lineStyle: {
                        color: "#000000"
                    },
                    areaStyle: {
                        color: "#d4d9dd"
                    }
                },
                fillerColor: "rgba(31,178,251,0.2)", /*被start和end遮住的背景*/
                labelFormatter: function (value, params) { /*拖动时两端的文字提示*/
                    var str = "";
                    if (params.length > 4) {
                        str = params.substring(0, 4) + "…";
                    } else {
                        str = params;
                    }
                    return str;
                }
            }],
            grid: {
                left: '1rem',
                right: '4%',
                bottom: '20%',
                top: '14%',
                containLabel: true,
                borderWidth: '0'
            },
            series
        };
        myChart06.setOption(option);
        },
    init: (VIN) => {
        setChartSize('06');
        const url = VIN ? './data/user/p4_vin.csv' : './data/user/p4_all.csv';
        $.get(url, function(theData){
            let data_in = formatData(theData);
            if (VIN) data_in = filterP4VINData(data_in, VIN);
            acceleratedLine.getChart06.showCharts(data_in);
        });
    }    
},
};

export { acceleratedLine, myChart06 };