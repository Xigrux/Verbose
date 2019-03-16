import * as ui from "./ui.js";
import * as generator from "./generator.js";

var isPaused = false;

var initStatuses = {
    NONE: 0,
    PENDING: 1,
    DONE: 2
}
var initStatus = initStatuses.NONE;

function init() {
    if (initStatus == initStatuses.NONE) {
        initStatus = initStatuses.PENDING;
        Promise.all([
            // init stuff here ...
            ui.init(),
            generator.init()
        ]).then(function(v) {
            initStatus = initStatuses.DONE;

            console.log('starting main loop');
            loop();
        })
    }
}

function loop() {
    if (!isPaused) {
        window.requestAnimationFrame(loop)
    }
}

window.onload = function() {
    init()
}