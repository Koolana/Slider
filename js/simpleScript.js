/*
simple script for test
date: 23.03.19
*/
//console.log(LYC.isMobile());
$(document).ready(function(){
	var slider1 = {
		withGrab: true,
		time: false,
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
		animationTime: 1000 //в ms
	}

	var slider3 = {
		time: 2000,
		timeDelay: 500, //время до разблокировки действия
		animationTime: 1000, //в ms

		accessCopies: true //сделать разрешение на копии
	}

	LYS.addSliderСarousel($('.slider#i1'), slider1);
	LYS.addLeftRightButtons($('.slider#i1'), $('.buttonLeft#i1'), $('.buttonRight#i1'));

	LYS.addSliderType1($('.slider#i2'), slider2);
	LYS.addLeftRightButtons($('.slider#i2'), $('.buttonLeft#i2'), $('.buttonRight#i2'));
	LYS.addAutoRowSwitchButtons($('.slider#i2'), $('.autoRowButtons#i2'));

	/*-----test-----*/
	LYS.addSliderСarousel($('.slider#i3'), slider1);
	LYS.addLeftRightButtons($('.slider#i3'), $('.buttonLeft#i3'), $('.buttonRight#i3'));

	LYS.addSliderType1($('.slider#i4'), slider3);
	LYS.addSliderType1($('.slider#i5'), slider3);
	LYS.addSliderType1($('.slider#i6'), slider3);
	LYS.addSliderType1($('.slider#i7'), slider3);

	LYS.addMouseControl();
	LYS.addWindowSizeListener();
	LYS.loadAllSliders();
});
