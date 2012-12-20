 // ==UserScript==
// @author 		   Pikachu
// @name           JTVhkgicon
// @version 	   3.5
// @description    hkgicon@JTV
// @namespace      https://github.com/kIsSkIt17/JTVhkgicon
// @include        http://justin.tv/*
// @include        http://*.justin.tv/*
// @include        http://twitch.tv/*
// @include        http://*.twitch.tv/*
// ==/UserScript==

function hkg()
{
	script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = "https://raw.github.com/kIsSkIt17/JTVhkgicon/master/OPEN/OPEN.js?"+Math.random();
	thehead = document.getElementsByTagName('head')[0];
	if(thehead) thehead.appendChild(script);
}
hkg();

function js1()
{
	js1 = document.createElement('script');
	js1.type = 'text/javascript';
	js1.src = "https://raw.github.com/kIsSkIt17/JTVhkgicon/master/js-global/FancyZoom.js";
	js1head = document.getElementsByTagName('head')[0];
	if(js1head) js1head.appendChild(js1);
}
js1();

function js2()
{
	js2 = document.createElement('script');
	js2.type = 'text/javascript';
	js2.src = "https://raw.github.com/kIsSkIt17/JTVhkgicon/master/js-global/FancyZoomHTML.js";
	js2head = document.getElementsByTagName('head')[0];
	if(js2head) js2head.appendChild(js2);
}
js2();

function css1()
{
	css1 = document.createElement('style');
	css1.type = 'text/css';
	css1.innerHTML = ".clickicon{\
						cursor:pointer;\
						vertical-align:bottom;\
						a{text-decoration:none}\
						a:hover{text-decoration:none}";
	css1head = document.getElementsByTagName('head')[0];
	if(css1head) css1head.appendChild(css1);
}
css1();