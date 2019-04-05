/*
LivYCore
	Сontains basic methods for working with LivYScripts
version: 1.0
made by Nikolya Andreychik
date: 23.03.19
*/
var LYC = {
	isMobile: function (){//определение мобильного устройства
	   	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	        return true; 
	    }
	    
	    return false;
	}
};
