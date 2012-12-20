 // ==UserScript==
// @author 		   Pikachu2012
// @name           JTV hkgicon
// @version 	   3.4
// @description    JTV hkgicon
// @namespace      http://code.google.com/p/jtvhkgicon/
// @include        http://justin.tv/*#/*/*
// @include        http://*.justin.tv/*#/*/*
// @include        http://twitch.tv/*
// @include        http://*.twitch.tv/*
// @include        http://justin.tv/chat/*
// @include        http://*.justin.tv/chat/*
// ==/UserScript==

function hkg()
{
	script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = "http://jtvhkgicon.googlecode.com/svn/IE/V3.4/IE.js?"+Math.random();
	thehead = document.getElementsByTagName('head')[0];
	if(thehead) thehead.appendChild(script);
}
hkg();

function js1()
{
	js1 = document.createElement('script');
	js1.type = 'text/javascript';
	js1.src = "http://jtvhkgicon.googlecode.com/svn/js-global/FancyZoom.js";
	js1head = document.getElementsByTagName('head')[0];
	if(js1head) js1head.appendChild(js1);
}
js1();

function js2()
{
	js2 = document.createElement('script');
	js2.type = 'text/javascript';
	js2.src = "http://jtvhkgicon.googlecode.com/svn/js-global/FancyZoomHTML.js";
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
								}\
						a{text-decoration:none}\
						a:hover{text-decoration:none}";
	css1head = document.getElementsByTagName('head')[0];
	if(css1head) css1head.appendChild(css1);
}
css1();