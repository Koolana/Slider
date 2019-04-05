/*
simple script for test
date: 23.03.19
*/
//console.log(LYC.isMobile());
$(document).ready(function(){
	var slider1 = {
		withGrab: true,
		time: 1000,
		animationTime: 500, //в ms

		numActSlide: 3,
		haveSpecialCenterSlide: false,
		timeDelay: 500, //время до разблокировки действия

		switchWinSize: 900,
		switchNumActSlide: 1
	}

	var slider2 = {
		withGrab: true,
		time: false,
		timeDelay: 500, //время до разблокировки действия
		animationTime: 1000, //в ms
	}

	LYS.addSliderСarousel($('.slider#i1'), slider1);
	LYS.addLeftRightButtons($('.slider#i1'), $('.buttonLeft#i1'), $('.buttonRight#i1'));

	LYS.addSliderType1($('.slider#i2'), slider2);
	LYS.addLeftRightButtons($('.slider#i2'), $('.buttonLeft#i2'), $('.buttonRight#i2'));
	LYS.addAutoRowSwitchButtons($('.slider#i2'), $('.autoRowButtons#i2'));

	LYS.addMouseControl();
	LYS.addWindowSizeListener();
	LYS.loadAllSliders();
});
