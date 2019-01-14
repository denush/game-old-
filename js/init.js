;'use strict';

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

function cleanScreen() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

let debug = document.getElementById('debug');
function printDebug(str) {
    debug.innerHTML = str;
}

