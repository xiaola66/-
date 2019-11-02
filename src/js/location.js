import chartColor from '../js/chartColor';
import { setChartSize } from '../js/utils';
let myChart01,
    myChart02,
    myChart03,
    myChart04;
const location = {
    getChart01: {
      valueCheck: (gps_arr) => {
        /// 错误值
        const data_valid = gps_arr.map((item) => {
          return [ item[1], item[2] ];
        }).filter((item) =>{
          return item[0] > 0 && item[1] > 0 
        });
        /// 坐标系修正
        return data_valid;
      },
      /// 取画图中心
      arrAverageNum2: (arr) => {
        if (arr && arr.length > 0) {
          const sum = arr.reduce((prev, next) => parseFloat(prev) + parseFloat(next), 0);
          return ~~(sum/arr.length*100)/100;
        }
      },
      showCharts: (dataShow) => {
        const _self = location.getChart01;
        myChart01 = echarts.init(document.getElementById('chart01'));
        let data = _self.valueCheck(dataShow);
        // let cent_longd = _self.arrAverageNum2( data.map( (item) => { return item[0];} ) );
        // let cent_latd = _self.arrAverageNum2( data.map( (item) => { return item[1];} ) );
        myChart01.setOption(
          {
            //backgroundColor: '#404a59',
            title: [{
                text: '', //'单车行驶轨迹 示例',
                subtext: '', //'内部数据请勿外传',
                left: 'center',
                textStyle: { color: '#fff' }
                }],
            geo: {
                map: 'china',
                roam: true,
                zoom: 1.2,
                label: {
                    emphasis: {
                        show: false
                    }
                },
                silent: true,
                itemStyle: {
                    normal: {
                        areaColor: '#7298D1',
                        borderColor: '#5785C8'
                    },
                    emphasis: {
                        areaColor: '#7298D1'
                    }
                }
            },
            series: [{
                type: 'scatterGL',
                progressive: 1e6,
                coordinateSystem: 'geo',
                symbolSize: 1,
                zoomScale: 0.002,
                blendMode: 'lighter',
                large: true,
                itemStyle: {
                    color: '#013893'
                },
                postEffect: {
                    enable: true
                },
                silent: true,
                dimensions: ['lng', 'lat'],
                data: data
            }]
        });
      },
      init: () => {
        const _self = location.getChart01;
        setChartSize('01');
        $.get('./data/location/01_Gps_trace.csv', function(theData){
            let data_in = theData.split("\n");
            data_in = data_in.map(function (val) {
                let temp = val.split(",");
                temp = temp.map(function (val) {
                    return $.trim(val)
                })
                return temp;
            })
            data_in.splice(0, 1);
            _self.showCharts(data_in);
        });
      },
    },
    getChart02: {
      valueCheck: (gps_arr) => {
        //const data_valid = gps_arr;
        const data_valid = [];
        return data_valid;
      },
      showCharts: (dataShow) => {
        const _self = location.getChart02;
        myChart02 = echarts.init(document.getElementById('chart02'));
        //let data = _self.valueCheck(dataShow); 

        const option = {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['line01','line02','line03']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    //saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['2019-07','2019-08','2019-09','2019-10']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    // name:'line01',
                    type:'line',
                    stack: '总量',
                    // data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    // name:'line02',
                    type:'line',
                    stack: '总量',
                    // data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    // name:'line03',
                    type:'line',
                    stack: '总量',
                    // data:[150, 232, 201, 154, 190, 330, 410]
                }
            ]
        };
        myChart02.setOption(option);
      },
      init: () => {
        const _self = location.getChart02;
        setChartSize('02');
        location.getChart02.showCharts();
        // $.get('./data/location/01_Gps_trace.csv', function(theData){
        //     let data_in = theData.split("\n");
        //     data_in = data_in.map(function (val) {
        //         let temp = val.split(",");
        //         temp = temp.map(function (val) {
        //             return $.trim(val)
        //         })
        //         return temp;
        //     })
        //     data_in.splice(0, 1);
        //     location.getChart02.showCharts(data_in);
        // });
      },
    },
    getChart03: {
      Data_for_Gps: (gps_arr) => {
        const points = gps_arr.map((item) => { return {'geoCoord': [item[1], item[2]]} });
        return points;
      },
      /// 取画图中心
      arrAverageNum2: (arr) => {
        if (arr && arr.length > 0) {
          const sum = arr.reduce((prev, next) => parseFloat(prev) + parseFloat(next), 0);
          return ~~(sum/arr.length*100)/100;
        }
      },
      showCharts: (dataShow) => {
        const _self = location.getChart03;
        myChart03 = echarts2.init(document.getElementById('chart03'));
                
        const cent_longd = 114.8;
        const cent_latd = 51.2;
        
        const data3 = dataShow.map((item) => { return item;}).filter((item) => { return item[3] == 3}); 
        const data4 = dataShow.map((item) => { return item;}).filter((item) => { return item[3] == 4}); 
        const data5 = dataShow.map((item) => { return item;}).filter((item) => { return item[3] == 5}); 

        const loc_data3 = _self.Data_for_Gps(data3);
        const loc_data4 = _self.Data_for_Gps(data4);
        const loc_data5 = _self.Data_for_Gps(data5);
        const option = {
          //backgroundColor: '#1b1b1b',
          color: [
            '#EC4D59',
            '#F8D28B',
            '#013893'
          ],
          legend: {
              orient: 'vertical',
              x:'left',
              data:['3月','4月','5月'],
              textStyle: {
                  color: chartColor[0]
              }
          },
          toolbox: {
              show: true,
              orient: 'vertical',
              x: 'right',
              y: 'center',
              feature : {
                  // mark : {show: true},
                  // dataView : {show: true, readOnly: false},
                  // restore : {show: true},
                  // saveAsImage : {show: true}
              }
          },
          geo: {
            map: 'china',
            roam: true,
            zoom: 1.2,
            label: {
                emphasis: {
                    show: false
                }
            },
            silent: true,
            itemStyle: {
                normal: {
                    areaColor: '#72d1d0',
                    borderColor: '#83DEDB'
                },
                emphasis: {
                    areaColor: '#72d1d0'
                }
            }
        },
          series: [
              {
                  name:'3月',
                  type: 'map',
                  mapType: 'china',
                  itemStyle:{
                      normal:{
                        borderColor: '#4CC276',
                        borderWidth: 0.5,
                        areaStyle: { color: '#60eca4'}
                      },
                      emphasis: {
                        areaColor: '#60eca4'
                      }
                  },
                  data: [],
                  markPoint: {
                      symbol: 'diamond',
                      symbolSize: 6,
                      large: true,
                      effect: { show: true },
                      data: loc_data3,
                  },
              },
            {
                  name: '4月',
                  type: 'map',
                  mapType: 'china',
                  silent: true,
                  roam: true,
                  itemStyle: {
                      normal: {
                          borderColor: '#4CC276',
                          borderWidth: 0.5,
                          areaStyle: { color: '#60eca4'}
                      },
                      emphasis: {
                        areaColor: '#60eca4'
                      }
                  },
                  type: 'map',
                  mapType: 'china',
                  data: [],
                  markPoint: {
                      symbolSize: 3,
                      large: true,
                      effect: {
                          show: true
                      },
                      data: loc_data4,
                  },
              },
              {
                  name:'5月',
                  type: 'map',
                  mapType: 'china',
                  silent: true,
                  roam: true,
                  itemStyle:{
                      normal:{
                        borderColor: '#4CC276',
                        borderWidth: 0.5,
                        areaStyle: { color: '#60eca4'}
                      },
                      emphasis: {
                        areaColor: '#60eca4'
                      }
                  },
                  data: [],
                  markPoint: {
                      symbol: 'diamond',
                      symbolSize: 6,
                      large: true,
                      effect: { show: true },
                      data: loc_data5,
                  },
              }
          ]
        };
        myChart03.setOption(option);
      },
      init: () => {
        setChartSize('03');
        $.get('./data/location/02_Gps_location.csv', function(theData){
            let data_in = theData.split("\n");
            data_in = data_in.map(function (val) {
                let temp = val.split(",");
                temp = temp.map(function (val) {
                    return $.trim(val)
                })
                return temp;
            })
            data_in.splice(0, 1);
            location.getChart03.showCharts(data_in);
        });
      },
    },
    getChart04: {
      Data_for_heatmap: (gps_arr) => {
        //const points = gps_arr.map((item) => { return {'lng': item[1], 'lat': item[2], 'count': item[3]};} );
        const points = gps_arr.map((item) => { return [item[1],  item[2], item[3]] });
        return points;
      },
      showCharts: (dataShow) => {
        const _self = location.getChart04;
        myChart04 = echarts.init(document.getElementById('chart04'));
        const cent_longd = 106.6;
        const cent_latd = 26.5;
        const heatmapData = _self.Data_for_heatmap(dataShow);
        const option = {
            animation: false,
            visualMap: {
                show: false,
                top: 'top',
                min: 0,
                max: 5,
                seriesIndex: 0,
                calculable: true,
                inRange: {
                    color: [
                        '#F8D28B',
                        '#F8D28B',
                        '#F8D28B',
                        '#F8D28B',
                        '#F8D28B'
                    ]
                }
            },
            geo: {
                map: 'china',
                roam: true,
                zoom: 1.2,
                label: {
                    emphasis: {
                        show: false
                    }
                },
                silent: true,
                itemStyle: {
                    normal: {
                        areaColor: '#72d1d0',
                        borderColor: '#83DEDB'
                    },
                    emphasis: {
                        areaColor: '#72d1d0'
                    }
                }
            },
            series: [{
                type: 'heatmap',
                mapType: 'china',
                coordinateSystem: 'geo',
                data: heatmapData,
                pointSize: 5,
                blurSize: 6
            }]
        };
        myChart04.setOption(option);
      },
      init: () => {
        setChartSize('04');
        $.get('./data/location/03_Gps_heat.csv', function(theData){
            let data_in = theData.split("\n");
            data_in = data_in.map(function (val) {
                let temp = val.split(",");
                temp = temp.map(function (val) {
                    return $.trim(val)
                })
                return temp;
            })
            data_in.splice(0, 1);
            location.getChart04.showCharts(data_in);
        });
      },
    },
  };

$(window).resize(() =>{

    setChartSize('01');
    myChart01.resize();

    setChartSize('02');
    myChart02.resize();

    setChartSize('03');
    myChart03.resize();

    setChartSize('04');
    myChart04.resize();

});

export default location;
