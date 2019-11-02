//user中的行为统计雷达图
import chartColor from '../chartColor.js';
import { setChartSize, formatData, filterP3VINData } from '../../js/utils';
const MAX = 1;
let myChart09;
const bsRadar = {
    getChart09: {
        showCharts: (dataShow) => {
            const _self = bsRadar.getChart09;
            myChart09 = echarts.init(document.getElementById('chart09'));
            const option = {             
                tooltip: {  }, //提示框，鼠标悬浮交互时的信息提示
                // legend: {    //图例，每个图表最多仅有一个图例
                //     x: 'center',
                //     data: ['ESOP系统', 'VGOP系统']
                // },
                polar: [
                    {    //极坐标 
                        indicator: [
                        { text: dataShow[0][0], max: MAX },
                        { text: dataShow[1][0], max: MAX },
                        { text: dataShow[2][0], max: MAX },
                        { text: dataShow[3][0], max: MAX },
                        { text: dataShow[4][0], max: MAX },
                        ],
                        radius: 90,
                        // startAngle: 120   // 改变雷达图的旋转度数
                    },

                ],
                series: [
                    {         // 驱动图表生成的数据内容数组，数组中每一项为一个系列的选项及数据
                 
                        type: 'radar',
                        itemStyle: {//图形样式，可设置图表内图形的默认样式和强调样式（悬浮时样式）：
                            normal: {
                                lineStyle: {
                                    color :"#629cf2",
                                    opacity:'0.5',
                                    width : 1
                                },
                                areaStyle: {
                                    color:"#629cf2",
                                    type: 'default',
                                    opacity:'0.5'
                                }
                            }
                        },
                        data: [{
                            symbol: 'none',
                            value: [0.2,0.5,0.9,0.5,0.6],
                            name: 'behavior'
                        }],
                    },
                    {         // 驱动图表生成的数据内容数组，数组中每一项为一个系列的选项及数据
                    // name: '总点击量',
                    type: 'radar',
                    itemStyle: {//图形样式，可设置图表内图形的默认样式和强调样式（悬浮时样式）：
                        // normal: {
                        //     areaStyle: {
                        //         // color:"#87cefa",
                        //         type: 'default'
                        //     }
                        // }
                    },
                    data: [{
                        symbol: 'none',
                        value: getData(dataShow),
                        name: 'behavior'
                    }],
                },
                ]
            };
            myChart09.setOption(option);
        },
        init: (VIN) => {
            setChartSize('09');
            const url = VIN ? './data/user/p3_vin.csv' : './data/user/p3_all.csv';
              $.get(url, function(theData){
            let data_in = formatData(theData);
            if (VIN) data_in = filterP3VINData(data_in, VIN);
            bsRadar.getChart09.showCharts(data_in);
        });
        }
    },
};

const getData = (dataShow) => {
    let arr = [];
    dataShow.map((item, index) => {
        arr.push(dataShow[index][1]);
    });
    return arr;
}

export { bsRadar, myChart09 };