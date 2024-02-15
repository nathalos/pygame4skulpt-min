"use strict";
const basePath = 'https://cdn.rawgit.com/Petlja/pygame4skulpt/3435847b/pygame/';
Sk.externalLibraries = {
    'pygame': { path: basePath + '__init__.js' },
    'pygame.display': { path: basePath + 'display.js' },
    'pygame.draw': { path: basePath + 'draw.js' },
    'pygame.event': { path: basePath + 'event.js' },
    'pygame.font': { path: basePath + 'font.js' },
    'pygame.image': { path: basePath + 'image.js' },
    'pygame.key': { path: basePath + 'key.js' },
    'pygame.mouse': { path: basePath + 'mouse.js' },
    'pygame.time': { path: basePath + 'time.js' },
    'pygame.transform': { path: basePath + 'transform.js' },
    'pygame.version': { path: basePath + 'version.js' },
    'skulptcookies':   { path: "./lib/skulptcookies.js" } //Uses AJAX. I would need to publish SkulptCookies on a CDN to get it working.
};

const app = {
    init: function() {
        (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas';
        Sk.configure({ read: app.builtinRead, output: console.log });
        const canvas = $("canvas");
        //bah CSS loading bug makes this break on replit
        //        app.baseCanvasSize = { width: canvas.width(), height: canvas.height(), aspect: canvas.width() / canvas.height() };
        app.baseCanvasSize = { width: 1280, height: 720, aspect: 16 / 9 };
        $(window).on("resize", app.fitToScreen);
        app.fitToScreen();
        app.runCode();
    },

    fitToScreen: function() {
        const canvas = $("canvas");
        console.log(canvas.width(), canvas.height(), innerWidth, innerHeight);
        if (innerWidth / innerHeight < app.baseCanvasSize.aspect)  //too narrow, squash vertically
            canvas.width(innerWidth).height(innerWidth / app.baseCanvasSize.aspect);
        else
            canvas.height(innerHeight).width(innerHeight * app.baseCanvasSize.aspect);
    },

    builtinRead: function(x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
            throw "File not found: '" + x + "'";
        return Sk.builtinFiles["files"][x];
    },

    runCode: function() {
        Sk.main_canvas = $("canvas")[0];

        //WIP: load an external script using AJAX
        const scripturl = $("#program").attr("src");
        if (scripturl) {
            $.get(scripturl, function(data) {
                //console.log(data);
                app.exec(data);
            });
        } else {
            app.exec($("#program").text());
        }
    },

    exec: function(prog) {
        Sk.misceval.asyncToPromise(function() {
            try {
                return Sk.importMainWithBody("<stdin>", false, prog, true);
            } catch (e) {
                alert(e)
            }
        });
    }
};

$(app.init);
