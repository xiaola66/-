import '../css/index.scss';
import '../css/user.scss';
import $ from 'jquery';
import 'bootstrap';
// import 'echarts';
// import 'echarts-gl';
import { setChartSize } from '../js/utils';
import { timePolar, myChart05 } from '../js/user/timePolarChart.js';
import { acceleratedLine, myChart06 } from '../js/user/AlineChart.js';
import { siteRoad, myChart07 } from '../js/user/SiteRoadBChart.js';
import { pieChart, myChart08 } from '../js/user/pieChart.js';
import { bsRadar, myChart09 } from '../js/user/BSradarChart.js';
import { hBarChart, myChart10 } from '../js/user/HbarChart.js';
import showDetail from '../js/details.js';




$(window).resize(() => {

    setChartSize('05');
    myChart05.resize();

    setChartSize('06');
    myChart06.resize();

    setChartSize('07');
    myChart07.resize();

    setChartSize('08');
    myChart08.resize();

    setChartSize('09');
    myChart09.resize();

    setChartSize('10');
    myChart10.resize();

});

//多车、单车按钮转换
let btn_manycars = $('.manycars')
let li_onecar = $('#onecarli');
let li_manyCars = $('#manycarsli')
let manyCars = $('#manycars');
let oneCar = $('#onecar');
let H5 = $('.H5');
let Vin = $('.btnright');
let selected02 = $('.selected02');
let selected12 = $('.selected12');
const carType = document.querySelector('#cartype');
li_onecar.click(function () {
    manyCars.hide();
    oneCar.show();
    H5.hide();
    Vin.addClass("vinstate");
    Vin.show();
    btn_manycars.hide();
    carType.style.display = "none";
});
li_manyCars.click(function () {
    manyCars.show();
    oneCar.hide();
    Vin.hide();
    H5.show();
    btn_manycars.show();
    $(window).attr('location', './user.html');
});
selected12.mouseover(function () {
    selected02.removeClass('selected02')
});

let VIN;
(
    function showVIN() {
        const dropdownMenuDOM = document.querySelector('.getVIN').getElementsByTagName("li");
        const dropdownMenu1DOM = document.querySelector('#dropdownMenu1');
        const VINLiDOM = document.querySelector('#VINLi');
        const carType = document.querySelector('#cartype');

        for (let index = 0; index < dropdownMenuDOM.length; index++) {
            dropdownMenuDOM[index].onclick = function () {
                VIN = this.innerHTML;
                dropdownMenu1DOM.value = this.innerHTML;
                VINLiDOM.innerHTML = "VIN：" + this.innerHTML;
                dropdownMenu1DOM.style.width = '240px';
                
                timePolar.getChart05.init(VIN);
                acceleratedLine.getChart06.init(VIN);
                siteRoad.getChart07.init(VIN);
                pieChart.getChart08.init(VIN);
                bsRadar.getChart09.init(VIN);
                hBarChart.getChart10.init(VIN);
            }
        }
    }
)()
timePolar.getChart05.init();
acceleratedLine.getChart06.init();
siteRoad.getChart07.init();
pieChart.getChart08.init();
bsRadar.getChart09.init();
hBarChart.getChart10.init();
