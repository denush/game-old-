'use strict';

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

//  глобальные переменные координат мыши
let MOUSE_SCREEN_X = null;
let MOUSE_SCREEN_Y = null;

let MOUSE_WORLD_X = null;
let MOUSE_WORLD_Y = null;

//  устанавлием глобальные переменные координат мыши
canvas.addEventListener('mousemove', function(e) {
    let screenX = e.clientX - canvas.offsetLeft - canvas.clientLeft;
    let screenY = e.clientY - canvas.offsetTop - canvas.clientTop;
    
    let worldX = screenX + viewport.x;
    let worldY = screenY + viewport.y;
        
    MOUSE_SCREEN_X = screenX;
    MOUSE_SCREEN_Y = screenY;
    
    MOUSE_WORLD_X = worldX;
    MOUSE_WORLD_Y = worldY;
});

//  отменяем действия браузера по умолчанию при работе с мышью
canvas.addEventListener('click', function(e) {
    e.preventDefault();
});
canvas.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});
canvas.addEventListener('mousedown', function(e) {
    e.preventDefault();
});
document.addEventListener('dblclick', function(e) {
    e.preventDefault();
});

//  функция для очистки экрана в каждом кадре
function cleanScreen() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

let debug = document.getElementById('debug');
function printDebug(str) {
    debug.innerHTML = str;
}