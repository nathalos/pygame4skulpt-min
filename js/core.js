"use strict";
const basePath = 'https://cdn.rawgit.com/Petlja/pygame4skulpt/3435847b/pygame/';
Sk.externalLibraries = {
	'pygame': 			{ path: basePath + '__init__.js' },
	'pygame.display':   { path: basePath + 'display.js' },
	'pygame.draw': 		{ path: basePath + 'draw.js' },
	'pygame.event': 	{ path: basePath + 'event.js' },
	'pygame.font': 		{ path: basePath + 'font.js' },
	'pygame.image': 	{ path: basePath + 'image.js' },
	'pygame.key': 		{ path: basePath + 'key.js' },
	'pygame.mouse': 	{ path: basePath + 'mouse.js' },
	'pygame.time': 		{ path: basePath + 'time.js' },
	'pygame.transform': { path: basePath + 'transform.js' },
	'pygame.version': 	{ path: basePath + 'version.js' },
	//'skulptcookies':   { path: "./lib/skulptcookies.js" } //Uses AJAX. I would need to publish SkulptCookies on a CDN to get it working.
};

const app = {
	init: function() {
		(Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas';
		Sk.configure({read: app.builtinRead, output: console.log});
		const canvas = $("canvas");
		app.baseCanvasSize = { width: canvas.width(), height:canvas.height() , aspect: canvas.width()/canvas.height()};
		$(window).on("resize",app.fitToScreen);
		app.fitToScreen();
		app.runCode();
	},
	
	fitToScreen: function() {
		const canvas = $("canvas");
		if (innerWidth/innerHeight < app.baseCanvasSize.aspect)  //too narrow, squash vertically
			canvas.width(innerWidth).height(innerWidth/app.baseCanvasSize.aspect);
		else
			canvas.height(innerHeight).width(innerHeight*app.baseCanvasSize.aspect);
	},

	builtinRead: function(x) {
		if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
			throw "File not found: '" + x + "'";
		return Sk.builtinFiles["files"][x];
	},
	
	loadScript: function(path) {
		$.get(path, function(data) { $("#program").text(data) });
	},

	runCode: function() {
		Sk.main_canvas = $("canvas")[0];
		
		//WIP: load an external script using AJAX
		const prog = $("#program").text();

		Sk.misceval.asyncToPromise(function () {
			try {
				return Sk.importMainWithBody("<stdin>", false, prog, true);
			} catch (e) {
				alert(e)
			}
		});
	}
};

$(app.init);
