//user中的地点路柱状图
import chartColor from '../chartColor.js';
import { setChartSize, formatData, setSubChartSize,filterP2VINData } from '../../js/utils';
let myChart07,
    subData07,
    subData07Road;
const siteRoad = {
    getChart07: {
        showCharts: (dataShow) => {
        const _self = siteRoad.getChart07;
        myChart07 = echarts.init(document.getElementById('chart07'));
        const x = dataShow.map(item => item[0]);
        let y = dataShow.map(item => parseFloat(item[1]));
        const l = dataShow.map(item => parseFloat(item[2]));
        const option = {
            legend: {
                selectedMode: false,//取消图例上的点击事件
              data: ['平均速度', '累计里程'],
              itemGap: 20, // item之间的距离
            },
            tooltip: {
                formatter: function(params) {
                    const a = dataShow.find(item => item[0] === params.name);
                    return `avgVhlSpd: ${a[2]}<br/>
                    mileage:${a[3]}<br/>`;
                }
            },
            xAxis: {
                type: 'category',
                data: x,
                splitLine: {
                    show: false
                }
            },
            grid:{
                left: 0,//组件距离容器左边的距离
                right: 0,
                bottom:'7%',
            },
            yAxis:[
                {
                    type: 'value',
                    position: 'left',
                    data:l,
                    splitLine: {
                        show: false,
                    },
                    axisLabel : {
                        show:true                    
                    }
                },
                {
                    type: 'value',
                    data:y,
                    splitLine: {
                        show: false,
                    },
                    axisLabel : {
                        show:true
                      
                    }
                },
                
            ],
            series: [
                {
                    data: l,
                    type: 'line',
                    yAxisIndex: 1,
                    smooth: true,
                    name: '平均速度',
                    symbolSize: 5, // 控制线条上 点 的大小
                    color:'#00A83C',
                    lineStyle: {
                        color: chartColor[5]
                    }
                },
                {
                    data: y,
                    type: 'bar',
                    name: '累计里程',
                    barWidth: 20,
                    itemStyle: {
                        normal: {
                            color: chartColor[7],
                            color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1, [{
                                offset: 0,
                                color: chartColor[6]
                              },
                              {
                                offset: 1,
                                color: chartColor[6]
                              }
                            ])
                        }
                    }
                },
               
            ]
        };
        
        myChart07.setOption(option);
        myChart07.on('click', function(params) {
            if (subData07.length > 0) {
                $('.detailC07').show();
                const s = subData07.filter(item => item[2] === params.name).map(item => {
                    return {name: item[0], value: parseFloat(item[1])}
                });
                if (s.length > 0) {
                    let sdata = [
                        {name:"北京",value:0},
                        {name:"天津",value:0},
                        {name:"河北",value:0},
                        {name:"山西",value:0},
                        {name:"内蒙古",value:0},
                        {name:"辽宁",value:0},
                        {name:"吉林",value:0},
                        {name:"黑龙江",value:0},
                        {name:"上海",value:0},
                        {name:"江苏",value:0},
                        {name:"浙江",value:0},
                        {name:"安徽",value:0},
                        {name:"福建",value:0},
                        {name:"江西",value:0},
                        {name:"山东",value:0},
                        {name:"河南",value:0},
                        {name:"湖北",value:0},
                        {name:"湖南",value:0},
                        {name:"重庆",value:0},
                        {name:"四川",value:0},
                        {name:"贵州",value:0},
                        {name:"云南",value:0},
                        {name:"西藏",value:0},
                        {name:"陕西",value:0},
                        {name:"甘肃",value:0},
                        {name:"青海",value:0},
                        {name:"宁夏",value:0},
                        {name:"新疆",value:0},
                        {name:"广东",value:0},
                        {name:"广西",value:0},
                        {name:"海南",value:0},
                    ];
                    s.map(item => {
                        const a = sdata.find(it => item.name.indexOf(it.name) > -1);
                        if (a) {
                            a.value = item.value / 20000;
                        }
                    });
                    subData07Road = subData07.filter(item => item[2] === params.name);
                    setChartSize('07');
                    siteRoad.getChart07.showSubCharts(sdata);
                }
            }
        });
        },
    showSubCharts: (dataShow) => {
        setSubChartSize('07');
        const myChartSub07 = echarts.init(document.getElementById('detail07'));
        const mapName = 'china';
        let data = dataShow;   
        let geoCoordMap = {};
        /*获取地图数据*/
        myChartSub07.showLoading();
        var mapFeatures = echarts.getMap(mapName).geoJson.features;
        myChartSub07.hideLoading();
        mapFeatures.forEach(function(v) {
            // 地区名称
            var name = v.properties.name;
            // 地区经纬度
            geoCoordMap[name] = v.properties.cp;

        });
        const max = 480,
            min = 9; // todo 
        const maxSize4Pin = 100,
            minSize4Pin = 20;

        const convertData = function(data) {
            let res = [];
            for (let i = 0; i < data.length; i++) {
                const geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value),
                    });
                }
            }
            return res;
        };
        const option = {
            tooltip: {
                padding: 0,
                enterable: true,
                transitionDuration: 1,
                textStyle: {
                    color: '#000',
                    decoration: 'none',
                },
                // position: function (point, params, dom, rect, size) {
                //   return [point[0], point[1]];
                // },
                formatter: function(params) {
                    let tipHtml = '';
                    const a = subData07Road.find(item => item[0].indexOf(params.name) > -1);
                    
                    if (a) {
                        tipHtml = '<div style="width:280px;height:180px;background:rgba(22,80,158,0.8);border:1px solid rgba(7,166,255,0.7)">'
                        +'<div style="width:100%;height:40px;line-height:40px;border-bottom:2px solid rgba(7,166,255,0.7);padding:0 20px">'+'<i style="display:inline-block;width:8px;height:8px;background:#16d6ff;border-radius:40px;">'+'</i>'
                        +'<span style="margin-left:10px;color:#fff;font-size:16px;">'+params.name+'</span>'+'</div>'
                        +'<div style="padding:20px">'
                        +'<p style="color:#fff;font-size:12px;">'+'<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">'+'</i>'
                        +'road：'+'<span style="color:#f4e925;margin:0 6px;">'+a[2]+'</span></p>'
                        +'<p style="color:#fff;font-size:12px;">'+'<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">'+'</i>'
                        +'avgVhlSpd：'+'<span style="color:#11ee7d;margin:0 6px;">'+a[3]+'</span></p>'
                        +'<p style="color:#fff;font-size:12px;">'+'<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">'+'</i>'
                        +'mileage：'+'<span style="color:#f48225;margin:0 6px;">'+a[4]+'</span></p>'
                        +'</div>'+'</div>';
                    }
                    
                    // setTimeout(function() {
                    //     tooltipCharts(params.name);
                    // }, 10);
                    return tipHtml;
                }
                
            },
            geo: {
                show: true,
                map: mapName,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false,
                    }
                },
                roam: false,
                itemStyle: {
                    normal: {
                        areaColor: '#023677',
                        borderColor: '#1180c7',
                    },
                    emphasis: {
                        areaColor: '#4499d0',
                    }
                }
            },
            series: [{
                    name: '散点',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: convertData(data),
                    symbolSize: function(val) {
                        return val[2] / 10;
                    },
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#fff'
                        }
                    }
                },
                {
                    type: 'map',
                    map: mapName,
                    geoIndex: 0,
                    aspectScale: 0.75, //长宽比
                    showLegendSymbol: false, // 存在legend时显示
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#031525',
                            borderColor: '#3B5077',
                        },
                        emphasis: {
                            areaColor: '#2B91B7'
                        }
                    },
                    animation: false,
                    data: data
                },
                {
                    name: '点',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    zlevel: 6,
                },
                {
                    name: 'Top 5',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: convertData(data.sort(function(a, b) {
                        return b.value - a.value;
                    }).slice(0, 10)),
                    symbolSize: function(val) {
                        return val[2] / 10;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'left',
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'yellow',
                            shadowBlur: 10,
                            shadowColor: 'yellow'
                        }
                    },
                    zlevel: 1
                },

            ]
        };
        myChartSub07.setOption(option);
    },
    init: (VIN) => {
        setChartSize('07'); 
        var url = VIN ? './data/user/p2_vin.csv' : './data/user/p2_all.csv';
        // let li_manyCars = $('#manycarsli');
        // li_manyCars.on('click', function (url) {
        //   url = './data/user/p2_all.csv';
        //   console.log(url,1111)
        // });
        $.get(url, function(theData){
            let data_in = formatData(theData);
            if (VIN) data_in = filterP2VINData(data_in, VIN);
            siteRoad.getChart07.showCharts(data_in);
        });
        $.get('./data/user/p2_all_sub.csv', function(theData){
            subData07 = formatData(theData);
        });
    }    
},
};

export { siteRoad, myChart07 };
