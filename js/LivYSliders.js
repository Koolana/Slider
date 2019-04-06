/*
Module LivYSliders
	Сontains methods for working with the sliders
version: 1.1b with Slider type 1
	a - start
	b - now with time animation 
made by Nikolya Andreychik
date: 23.03.19
*/

/*
baseSlider - прототип слайдера-карусели который содержит следующие функции:
setTimerSlider - устанавливает таймер на время определенное полем time
switchSliderRight - промотка слайдера направо с учетом таймера и задержек анимации (используется в кнопках, в переключении по времени и свайпах)
switchSliderLeft - аналогично, только в другую сторону
funcRight1 - перелистывание вправо без учета всего 
addSpecialCenterSlide - перерасчет специальных центральных слайдов
loadOneSLider - загрузка слайдера
downOnSlider - срабатывает при нажатии на слайдер (передается параметр содержащий напрямую координаты устройства)
moveSlider - срабатывает при движении упр устройства по слайдеру (передается параметр содержащий напрямую координаты устройства)
upSlider - срабатывает при отпускании упр устройства (передается параметр содержащий напрямую координаты устройства)
*/
var mainBaseSlider = {
	setTimerSlider: function(){//установка/переустановка таймера
		if(this.time){//если задано время то вкл таймер
			clearTimeout(this.timer);
			var _this = this;
			this.timer = setTimeout(function(){
				_this.switchSliderRight();
			}, this.time);//установка таймеров
		}
	},

	switchSliderRight: function(){//переключение направо (для кнопок и таймера) на вход объект слайдера
		if(this.flagLeftRight){
			this.funcRight1();

			this.flagLeftRight = false;
			var _this = this;
			setTimeout(function (){ _this.flagLeftRight = true; }, this.timeDelay);
		}

		this.setTimerSlider();//установка таймера если он был задан
		//console.log(e);
	},

	switchSliderLeft: function(){//переключение налево (для кнопок и таймера) на вход объект слайдера
		if(this.flagLeftRight){
			this.funcLeft1();

			this.flagLeftRight = false;
			var _this = this;
			setTimeout(function (){ _this.flagLeftRight = true; }, this.timeDelay);
		}

		this.setTimerSlider();//установка таймера если он был задан
		//console.log(e);
	},

	reloadSlider: function(){//поддержка адаптивной верстки (динамическое изменение размеров слайдера)
	},

	downOnSlider: function(e){//событие при нажатии мышки или тача
	},

	moveSlider: function(e){//событие при движении мышки или тача
	},

	upSlider: function(e){//событие при отпускании мышки или тача
	},

	controlSizeSwitch: function(){
	},

	switchActSize: function(){		
	},

	output: function(){
		console.log(this);
	}
}

var baseСarouselSlider = {
	__proto__: mainBaseSlider,

	funcRight1: function(){
		var thisSlider = this.obj.children('.containerSlider').children('.containerBlock');
		
		this.offSet -= this.oneSlideWidth;//возвращаемся к 1-му клону, который по идее такой же блок как сейчас

		if(parseInt(this.offSet) < -parseInt(this.oneSlideWidth * (this.numActSlide + this.numRealSlide + 1))){
			this.offSet = -this.oneSlideWidth * (this.numActSlide);
			thisSlider.css({transition:"all 0s linear 0s"});
			thisSlider.css("transform","translate3d("+ this.offSet +"px, 0, 0)");

			this.offSet -= this.oneSlideWidth;
			var _this = this;
			setTimeout(function (){ 
				thisSlider.css({transition:"all " + _this.animationTime + "s linear 0s"});
				thisSlider.css("transform","translate3d("+ _this.offSet +"px, 0, 0)");
			}, 50);
		}else{
			thisSlider.css({transition:"all " + this.animationTime + "s linear 0s"});
			thisSlider.css("transform","translate3d("+ this.offSet +"px, 0, 0)");
		}
	},

	funcLeft1: function(){
		var thisSlider = this.obj.children('.containerSlider').children('.containerBlock');
		
		this.offSet += this.oneSlideWidth;

		if(parseInt(this.offSet) > -parseInt(this.oneSlideWidth * (this.numActSlide - 1))){
			this.offSet = -this.oneSlideWidth * (this.numActSlide + this.numRealSlide);
			thisSlider.css({transition:"all 0s linear 0s"});
			thisSlider.css("transform","translate3d("+ this.offSet +"px, 0, 0)");

			this.offSet += this.oneSlideWidth;
			var _this = this;
			setTimeout(function (){ 
				thisSlider.css({transition:"all " + _this.animationTime + "s linear 0s"});
				thisSlider.css("transform","translate3d("+ _this.offSet +"px, 0, 0)");
			}, 50);
		}else{
			thisSlider.css({transition:"all " + this.animationTime + "s linear 0s"});
			thisSlider.css("transform","translate3d("+ this.offSet +"px, 0, 0)");
		}
	},

	loadOneSLider: function(){//первоначальная загрузка одного слайдера
		var thisSlider =  this.obj.children('.containerSlider').children('.containerBlock');
		this.oneSlideWidth = thisSlider.children('.slider_block').width();
		thisSlider.children('.clone').remove();
		thisSlider.children('.slider_block').removeClass(this.obj.attr('id') + 'specialEl');
		this.numRealSlide =  thisSlider.children('.slider_block').last().index();/*сколько всего слайдов (настоящих)*/

		/*настройка размеров*/
		thisSlider.parent().css("width", this.numActSlide*this.oneSlideWidth + 'px');
		thisSlider.css("width", (2*this.numActSlide+this.numRealSlide + 1)*this.oneSlideWidth + 'px');/*размеры*/
		/*настройка размеров*/

		var numEndClone = this.numActSlide;/*сколько надо клонов*/
		var i = 0;

		while(numEndClone > 0){
			numEndClone = numEndClone - 1;

			thisSlider.children('.slider_block').eq(2*i).clone().removeClass('active').addClass('clone').appendTo(thisSlider);/*клон снизу*/
			thisSlider.children('.slider_block').eq(this.numRealSlide).clone().removeClass('active').addClass('clone').prependTo(thisSlider);/*клон сверху*/

			i++;
		}

			/*настройка размеров*/
		this.offSet = -this.oneSlideWidth * (this.numActSlide + 1);
		thisSlider.css("transform","translate3d("+ this.offSet +"px, 0, 0)");
			/*настройка размеров*/

		this.switchActSize();
		this.setTimerSlider();
	},

	reloadSlider: function(){//поддержка адаптивной верстки (динамическое изменение размеров слайдера)
		var thisSlider =  this.obj.children('.containerSlider').children('.containerBlock');
		var tempWidth = this.oneSlideWidth;
		this.oneSlideWidth = thisSlider.children('.slider_block').width();
		this.offSet = (this.oneSlideWidth/tempWidth) * this.offSet;
		thisSlider.css({transition:"all 0s linear 0s"});
		thisSlider.css("width", (2*this.numActSlide+this.numRealSlide + 1)*this.oneSlideWidth + 'px');/*размеры*/
		thisSlider.css("transform","translate3d("+ this.offSet +"px, 0, 0)");
		this.setTimerSlider();
	},

	downOnSlider: function(e){//событие при нажатии мышки или тача
		if(this.withGrab /*&& flagOpenMouse == 1*/){
			this.startMouseX = e.pageX - $(this.obj.children('.containerSlider')).offset().left;
			this.startMouseY = e.pageY - $(this.obj.children('.containerSlider')).offset().top;
			//console.log(startMouseX);
			this.flagMouse = 1;
			this.lastOffSet = this.offSet;
			this.falgDir = true;
			//console.log(idMoveMouse);
			clearTimeout(this.timer);//удаление таймера когда нажата мышь
		}
	},

	moveSlider: function(e){//событие при движении мышки или тача
		if(this.flagMouse == 1){
			var parentOffset = this.obj.children('.containerSlider').offset(); 
			var thisSlider =  this.obj.children('.containerSlider').children('.containerBlock');
			
			var temp = parseInt(this.relX - (e.pageX - parentOffset.left - this.startMouseX));
			this.relX = e.pageX - parentOffset.left - this.startMouseX;
			this.relY = e.pageY - parentOffset.top - this.startMouseY;

			if(Math.abs(this.relX) > 5){//не реагировать при скролле
				this.falgDir = false;
			}else{
				if(Math.abs(this.relY) > 5 && this.falgDir){
					this.upSlider();
				}
			}

			this.offSet += -temp;

			if(this.offSet > -this.oneSlideWidth * (this.numActSlide - 1)){//при достижении левой границы резко переместить контейнер на конец списка реальных слайдов
				this.offSet = -this.oneSlideWidth * (this.numActSlide + this.numRealSlide);
				this.lastOffSet = this.offSet;
			}else{
				if(this.offSet < -this.oneSlideWidth * (this.numActSlide + this.numRealSlide + 1)){
					this.offSet = -this.oneSlideWidth * (this.numActSlide);
					this.lastOffSet = this.offSet;
				}
			}
		
			thisSlider.css({transition:"all 0s linear 0s"});
			thisSlider.css("transform","translate3d(" + this.offSet + "px, 0, 0)");	
		}
	},

	upSlider: function(e){//событие при отпускании мышки или тача
		var thisSlider = this.obj.children('.containerSlider').children('.containerBlock');
		if(this.flagMouse == 1){
			if(Math.abs(this.relX) > this.touchPathLength){
				this.offSet = Math.floor(this.offSet/this.oneSlideWidth + 0.5 + 0.5* Math.floor(this.relX/Math.abs(this.relX)))*this.oneSlideWidth;
			}else{
				this.offSet = this.lastOffSet;
			}
			thisSlider.css({transition:"all " + (this.animationTime/2) + "s linear 0s"});
			thisSlider.css("transform","translate3d(" + this.offSet + "px, 0, 0)");
		}
		//console.log(idMoveMouse);
		this.relX = 0;
		this.flagMouse = 0;
		this.relY = 0;

		this.setTimerSlider();//создание таймера когда отпустили
	},

	controlSizeSwitch: function(){
		var tempFlag = this.flagSwitch;//запоминаем предыдущий флаг переключения

		if($( window ).width() > parseInt(this.switchWinSize)){
			this.flagSwitch = 0;
		}else{/*проверка размера экрана и если меньше чем заданный в параметрах, то выставить свойства как для свитч слайдера*/
			this.flagSwitch = 1;
		}

		this.reloadSlider();//перерисовка слайдера (для динамическ размеров)
		this.switchActSize();//выбор размера "окна" для количества отображаемый слайдов
	},

	switchActSize: function(){		
		var thisSlider =  this.obj.children('.containerSlider');

		if(this.flagSwitch == 0){
			thisSlider.css("width", this.numActSlide*this.oneSlideWidth + 'px');
		}else{
			if(this.flagSwitch == 1){
				thisSlider.css("width", this.switchNumActSlide*this.oneSlideWidth + 'px');
			}
		}
	}	
}

/*
baseSlider - прототип слайдера тип 1:
*/
var baseSliderType1 = {
	__proto__: mainBaseSlider,

	funcRight1: function(){
		this.allSlides[this.currSlide].removeClass(this.obj.attr('id') + 'specialEl');
		var tempCurr = this.currSlide;
		if(this.currSlide == this.allSlides.length - 1){
			this.currSlide = 0;
		}else{
			this.currSlide++;
		}

		this.allSlides[this.currSlide].css({transition:"all " + this.animationTime + "s ease 0s"});
		this.allSlides[this.currSlide].addClass(this.obj.attr('id') + 'specialEl');
		this.allSlides[this.currSlide].css("transform","translate3d(" + ((this.oneSlideWidth)/6) + "px, 0, 0)");

		this.allSlides[tempCurr].css("transform","translate3d(" + 0 + "px, 0, 0)");

		if(this.currSlide == this.allSlides.length - 1){
			this.allSlides[0].css("transform","translate3d(" + 2*((this.oneSlideWidth)/6) + "px, 0, 0)");
		}else{
			this.allSlides[this.currSlide + 1].css("transform","translate3d(" + 2*((this.oneSlideWidth)/6) + "px, 0, 0)");
		}

		//console.log("moveRight", this.currSlide);
		if(!(this.objAutoRow === undefined)){
			this.redrawSwitchButtons();
		}
	},

	funcLeft1: function(){	
		this.allSlides[this.currSlide].removeClass(this.obj.attr('id') + 'specialEl');
		var tempCurr = this.currSlide;
		if(this.currSlide == 0){
			this.currSlide = this.allSlides.length - 1;
		}else{
			this.currSlide--;
		}

		this.allSlides[this.currSlide].css({transition:"all " + this.animationTime + "s ease 0s"});
		this.allSlides[this.currSlide].addClass(this.obj.attr('id') + 'specialEl');
		this.allSlides[this.currSlide].css("transform","translate3d(" + ((this.oneSlideWidth)/6) + "px, 0, 0)");

		this.allSlides[tempCurr].css("transform","translate3d(" + 2*((this.oneSlideWidth)/6) + "px, 0, 0)");

		if(this.currSlide == 0){
			this.allSlides[this.allSlides.length - 1].css("transform","translate3d(" + 0 + "px, 0, 0)");
		}else{
			this.allSlides[this.currSlide - 1].css("transform","translate3d(" + 0 + "px, 0, 0)");
		}

		if(!(this.objAutoRow === undefined)){
			this.redrawSwitchButtons();
		}
		//console.log("moveLeft", this.currSlide);
	},

	loadOneSLider: function(){//первоначальная загрузка одного слайдера
		var thisSlider =  this.obj.children('.containerSlider').children('.containerBlock');
		this.oneSlideWidth = thisSlider.children('.slider_block').width();
		this.allSlides = [];

		for(var i=0; i <= thisSlider.children('.slider_block').last().index(); i++){
			this.allSlides.push(thisSlider.children('.slider_block').eq(i));
			this.allSlides[i].css("transform","translate3d(" + 2*((this.oneSlideWidth)/6) + "px, 0, 0)");
		}

		thisSlider.css("width", parseInt((8*this.oneSlideWidth)/6) + 'px');

		thisSlider.css({transition:"all 0s ease 0s"});
		thisSlider.css("transform","translate3d(" + -((this.oneSlideWidth)/6) + "px, 0, 0)");

		var _this = this;
		this.allSlides[this.currSlide].css({transition:"all 0s ease 0s"});
		this.allSlides[this.currSlide].css("transform","translate3d(" + ((this.oneSlideWidth)/6) + "px, 0, 0)");

		setTimeout(function (){
			_this.allSlides[_this.currSlide].css({transition:"all " + _this.animationTime + "s ease 0s"});
		}, 50);

		this.allSlides[this.allSlides.length - 1].css("transform","translate3d(" + 0 + "px, 0, 0)");
	
		this.allSlides[this.currSlide].addClass(this.obj.attr('id') + 'specialEl');

		this.setTimerSlider();
	},

	reloadSlider: function(){//поддержка адаптивной верстки (динамическое изменение размеров слайдера)
		this.loadOneSLider();
	},

	downOnSlider: function(e){//событие при нажатии мышки или тача
		if(this.withGrab /*&& flagOpenMouse == 1*/){
			this.startMouseX = e.pageX - $(this.obj.children('.containerSlider')).offset().left;
			//console.log(startMouseX);
			this.flagMouse = 1;
			//console.log(idMoveMouse);
			clearTimeout(this.timer);//удаление таймера когда нажата мышь
		}
	},

	moveSlider: function(e){//событие при движении мышки или тача
		if(this.flagMouse == 1){
			this.pageX = e.pageX;//при отпускании пальца массив тачей = undefiend и поэтому не запоминается координаты отпускания, здесь мы запоминаем координаты движения, чтобы при отпускании их применить
		}
	},

	upSlider: function(e){//событие при отпускании мышки или тача
		if(this.flagMouse == 1 && this.relX != 0){
			var parentOffset = this.obj.children('.containerSlider').offset(); 

			if((LYC.isMobile()?this.pageX:e.pageX) - parentOffset.left - this.startMouseX < -this.touchPathLength){
				this.switchSliderRight();
			}

			if((LYC.isMobile()?this.pageX:e.pageX) - parentOffset.left - this.startMouseX > this.touchPathLength){
				this.switchSliderLeft();
			}
		}
		this.flagMouse = 0;

		this.setTimerSlider();//создание таймера когда отпустили
	},

	controlSizeSwitch: function(){
		this.reloadSlider();//перерисовка слайдера (для динамическ размеров)
	},

	redrawSwitchButtons: function(){
		this.objAutoRow.children().removeClass('currButton');
		this.objAutoRow.children().eq(this.currSlide).addClass('currButton');
	},

	createAutoRowSwitchButtons: function(){
		//console.log(this.objAutoRow);
		var _this  = this;
		for(var i in this.allSlides){
			var button = $('<div/>', {
			  	class: 'oneButtonInRow',
			  	click: function() {
			    	//_this.currSlide;
			    	if(_this.currSlide - $(this).index() < 0){
				    	for(var i = _this.currSlide; i < $(this).index(); i++){
				    		_this.funcRight1();
				    	}
				    }else{
				    	for(var i = _this.currSlide; i > $(this).index(); i--){
				    		_this.funcLeft1();
				    	}
				    }
			  	},
			});

			this.objAutoRow.append(button);	
		}

		this.redrawSwitchButtons();
	}
}

var LYS = {
	sliders: [],

	addSliderСarousel: function(obj, sliderPropites){	
		/*
		sliderPropites - объект со следующими полями:
		withGrab: true - с захватом, false - без захвата
		timer: число - время переключения слайдов (в мс), по умолчанию false (без таймера)
		numActSlide: количество отображаеммых слайдров, по умолчанию 1
		haveSpecialCenterSlide: количество слфйдеров со спец css эффектами, по умолчанию false (без спец слайдов)
		switchWinSize: размер страницы для изменения параметров (при адаптивной верстке), false по умолчанию (без переключения)

		*/
		function Slider(id){
			this.idSl = id;//id слайдера 
			this.obj = obj;//DOM-объект к которому привязан слайдер 
			this.flagLeftRight = true;
			this.relX = 0;
			this.relY = 0;
			this.offSet = 0;

			this.animationTime = sliderPropites.animationTime/1000;

			if("withGrab" in sliderPropites){
				this.withGrab = sliderPropites.withGrab;
				this.touchPathLength = sliderPropites.touchPathLength;
			}else{
				this.withGrab = false;
			}

			if("time" in sliderPropites){
				this.time = sliderPropites.time;
			}else{
				this.time = false;
			}

			if("numActSlide" in sliderPropites){
				this.numActSlide = sliderPropites.numActSlide;
			}else{
				this.numActSlide = 1;
			}

			if("haveSpecialCenterSlide" in sliderPropites){
				this.haveSpecialCenterSlide = sliderPropites.haveSpecialCenterSlide;
			}else{
				this.haveSpecialCenterSlide = false;
			}

			this.timeDelay = sliderPropites.timeDelay;

			/*ПЕРЕДЕЛАТЬ полность, реализовать не для одного порога а для нескольких*/
			if("switchWinSize" in sliderPropites){
				this.switchWinSize = sliderPropites.switchWinSize;
				this.switchNumActSlide = sliderPropites.switchNumActSlide;

				if($( window ).width() > parseInt(this.switchWinSize)){
					this.flagSwitch = 0;
					//console.log(this.flagSwitch);
				}else{/*проверка размера экрана и если меньше чем заданный в параметрах, то выставить свойства как для свитч слайдера*/
					this.flagSwitch = 1;
					//console.log(this.flagSwitch);
				}
			}else{
				this.switchWinSize = false;
			}
			/**/

			this.__proto__ = baseСarouselSlider;
		};

		this.sliders.push(new Slider(obj.attr('id')));
		this.sliders[this.sliders.length - 1].loadOneSLider();
	},

	addSliderType1: function(obj, sliderPropites){	
		/*
		sliderPropites - объект со следующими полями:
		withGrab: true - с захватом, false - без захвата
		timer: число - время переключения слайдов (в мс), по умолчанию false (без таймера)
		*/
		function Slider(id){
			this.idSl = id;//id слайдера 
			this.obj = obj;//DOM-объект к которому привязан слайдер 
			this.flagLeftRight = true;
			this.currSlide = 0;

			this.animationTime = sliderPropites.animationTime/1000;

			if("withGrab" in sliderPropites){
				this.withGrab = sliderPropites.withGrab;
				this.touchPathLength = sliderPropites.touchPathLength;
			}else{
				this.withGrab = false;
			}

			if("time" in sliderPropites){
				this.time = sliderPropites.time;
			}else{
				this.time = false;
			}

			this.timeDelay = sliderPropites.timeDelay;

			/*ПЕРЕДЕЛАТЬ полность, реализовать не для одного порога а для нескольких*/
			if("switchWinSize" in sliderPropites){
				this.switchWinSize = sliderPropites.switchWinSize;
				this.switchNumActSlide = sliderPropites.switchNumActSlide;

				if($( window ).width() > parseInt(this.switchWinSize)){
					this.flagSwitch = 0;
					//console.log(this.flagSwitch);
				}else{/*проверка размера экрана и если меньше чем заданный в параметрах, то выставить свойства как для свитч слайдера*/
					this.flagSwitch = 1;
					//console.log(this.flagSwitch);
				}
			}else{
				this.switchWinSize = false;
			}
			/**/

			this.__proto__ = baseSliderType1;
		};

		this.sliders.push(new Slider(obj.attr('id')));
		this.sliders[this.sliders.length - 1].loadOneSLider();
	},

	addMouseControl: function(){//ПРИДУМАТЬ упрощенную логику
		for (var i in this.sliders){
			if(this.sliders[i].withGrab){
				if(LYC.isMobile()){
					var _this = this;
					this.sliders[i].obj.children('.containerSlider').children('.containerBlock').on('touchstart', function(e) {
						_this.movingSlider = _this.searchSliderByDOM($(this).closest('.slider')[0]);
						_this.movingSlider.downOnSlider(e.originalEvent.touches[0]);
					});

					this.sliders[i].obj.children('.containerSlider').children('.containerBlock').on('touchmove', function(e) {
						if(!(_this.movingSlider === undefined)){
				   			_this.movingSlider.moveSlider(e.originalEvent.touches[0]);		
				   		}
					});

					this.sliders[i].obj.children('.containerSlider').children('.containerBlock').on('touchend', function(e) {	
						if(!(_this.movingSlider === undefined)){
							_this.movingSlider.upSlider(e.originalEvent.touches[0]);
						}
					});
				}else{
					var _this = this;
					this.sliders[i].obj.children('.containerSlider').children('.containerBlock').mousedown(function(e){//нажатие
						//console.log($(this).closest('.slider')[0]);
						_this.movingSlider = _this.searchSliderByDOM($(this).closest('.slider')[0]);
						_this.movingSlider.downOnSlider(e);
					});

					$(document).mousemove(function(e){//движение
						if(!(_this.movingSlider === undefined)){
				   			_this.movingSlider.moveSlider(e);		
				   		}
					});

					$(document).mouseup(function(e){//отпускание мыши
						if(!(_this.movingSlider === undefined)){
							_this.movingSlider.upSlider(e);
						}
					});
				}
			}
		}
	},

	addAutoRowSwitchButtons: function(objSlider, autoRow){
		var tempComponent = this.searchSliderByDOM(objSlider[0]);
		tempComponent.objAutoRow = autoRow;
		tempComponent.createAutoRowSwitchButtons();
	},

	addWindowSizeListener: function(){
		var _this = this;
		$(window).resize(function(){
			for (var i in _this.sliders){
				_this.sliders[i].controlSizeSwitch();
			}
		});
	},

	addLeftRightButtons: function(objSlider, objLeft, objRight){
		var _this = this;
		//console.log(objSlider);
		$(objRight).on('click', function(e) {
			_this.searchSliderByDOM(objSlider[0]).switchSliderRight();
		});

		$(objLeft).on('click', function(e) {
			_this.searchSliderByDOM(objSlider[0]).switchSliderLeft();
		});
	},

	searchSliderByDOM: function(objDOM){//возвращает объект слайдера по его div-у
		for (var i in this.sliders){
			if(this.sliders[i].obj[0] == objDOM){
				return this.sliders[i];
			}
		}
	},

	loadAllSliders: function(){//old
		for (var i in this.sliders){
			this.sliders[i].loadOneSLider();
		}
	},

	outputAllSliders: function(){
		for (var i in this.sliders){
			this.sliders[i].output();
		}
	}
};
