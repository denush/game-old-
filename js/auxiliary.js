;'use strict';

function auxiliary() {
    
    let coords = document.getElementById('coords');
    coords.children[0].children[0].innerHTML = 'x';
    coords.children[1].children[0].innerHTML = 'y';
    
    canvas.addEventListener('mousemove', function(e) {

        coords.children[0].children[1].innerHTML = MOUSE_SCREEN_X;
        coords.children[1].children[1].innerHTML = MOUSE_SCREEN_Y;
        
        coords.children[0].children[2].innerHTML = MOUSE_WORLD_X;
        coords.children[1].children[2].innerHTML = MOUSE_WORLD_Y;
    });
}