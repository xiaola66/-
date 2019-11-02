import css from './css/index.scss';
import 'bootstrap';
import $ from 'jquery';
import location from './js/location.js';

location.getChart01.init();
location.getChart02.init();
location.getChart03.init();
location.getChart04.init();


//多车、单车按钮转换
let manyCars = document.getElementById('manycars');
let oneCar = document.getElementById('onecar');
	manyCars.onclick = function() {
		manyCars.style = "display:none"
		oneCar.style = "display:inline-block"	
	};
	oneCar.onclick = function() {
		manyCars.style = "display:inline-block"
		oneCar.style = "display:one"	
    };


 

