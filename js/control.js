function control_module() {

    'use strict';
    
    const KEY_W = 87;
    const KEY_A = 65;
    const KEY_S = 83;
    const KEY_D = 68;

    let keys = {
        87: false,
        83: false,
        65: false,
        68: false  
    }
    
    let control = {};

    //  инициализация управления
    control.init = function(unit, entities) {
        
        document.addEventListener('keydown', function(e) {

            //unit[keys[e.keyCode]] = true;

            if (e.keyCode === KEY_W) unit.moveUp = true;
            if (e.keyCode === KEY_S) unit.moveDown = true;
            if (e.keyCode === KEY_A) unit.moveLeft = true;
            if (e.keyCode === KEY_D) unit.moveRight = true;

//            switch (e.keyCode) { 
//                case KEY_W:
//                    if (keys[KEY_S]) {
//                        keys[KEY_S] = false;
//                        unit.moveDown = false;
//                        unit.moveDownLeft = false;
//                        unit.moveDownRight = false;
//                    }
//                    keys[KEY_W] = true;
//                    if      (keys[KEY_A]) { unit.moveUpLeft  = true; unit.moveLeft  = false; }
//                    else if (keys[KEY_D]) { unit.moveUpRight = true; unit.moveRight = false; }
//                    else                    unit.moveUp      = true;
//                    break;
//                case KEY_S:
//                    if (keys[KEY_W]) {
//                        keys[KEY_W] = false;
//                        unit.moveUp = false;
//                        unit.moveUpLeft = false;
//                        unit.moveUpRight = false;
//                    }
//                    keys[KEY_S] = true;
//                    if      (keys[KEY_A]) { unit.moveDownLeft  = true; unit.moveLeft  = false; }
//                    else if (keys[KEY_D]) { unit.moveDownRight = true; unit.moveRight = false;}
//                    else                    unit.moveDown      = true;
//                    break;
//                case KEY_A:
//                    if (keys[KEY_D]) {
//                        keys[KEY_D] = false;
//                        unit.moveRight = false;
//                        unit.moveUpRight = false;
//                        unit.moveDownRight = false;
//                    }
//                    keys[KEY_A] = true;
//                    if      (keys[KEY_W]) { unit.moveUpLeft   = true; unit.moveUp  = false; }
//                    else if (keys[KEY_S]) { unit.moveDownLeft = true; unit.moveDown = false; }
//                    else                    unit.moveLeft     = true;
//                    break;
//                case KEY_D:
//                    if (keys[KEY_A]) {
//                        keys[KEY_A] = false;
//                        unit.moveLeft = false;
//                        unit.moveUpLeft = false;
//                        unit.moveDownLeft = false;
//                    }
//                    keys[KEY_D] = true;
//                    if      (keys[KEY_W]) { unit.moveUpRight   = true; unit.moveUp   = false; }
//                    else if (keys[KEY_S]) { unit.moveDownRight = true; unit.moveDown = false;}
//                    else                    unit.moveRight     = true;
//                    break;
//                    
//            }
        });

        document.addEventListener('keyup', function(e) {

            if (e.keyCode === KEY_W) unit.moveUp = false;
            if (e.keyCode === KEY_S) unit.moveDown = false;
            if (e.keyCode === KEY_A) unit.moveLeft = false;
            if (e.keyCode === KEY_D) unit.moveRight = false;
            
//            switch (e.keyCode) { 
//                case KEY_W:
//                    keys[KEY_W] = false;
//                    if      (keys[KEY_A]) { unit.moveUpLeft  = false; unit.moveLeft  = true; }
//                    else if (keys[KEY_D]) { unit.moveUpRight = false; unit.moveRight = true; }
//                    else                    unit.moveUp      = false;
//                    break;
//                case KEY_S:
//                    keys[KEY_S] = false;
//                    if      (keys[KEY_A]) { unit.moveDownLeft  = false; unit.moveLeft  = true; }
//                    else if (keys[KEY_D]) { unit.moveDownRight = false; unit.moveRight = true; }
//                    else                    unit.moveDown      = false;
//                    break;
//                case KEY_A:
//                    keys[KEY_A] = false;
//                    if      (keys[KEY_W]) { unit.moveUpLeft   = false; unit.moveUp   = true; }
//                    else if (keys[KEY_S]) { unit.moveDownLeft = false; unit.moveDown = true; }
//                    else                    unit.moveLeft     = false;
//                    break;
//                case KEY_D:
//                    keys[KEY_D] = false;
//                    if      (keys[KEY_W]) { unit.moveUpRight   = false; unit.moveUp   = true; }
//                    else if (keys[KEY_S]) { unit.moveDownRight = false; unit.moveDown = true; }
//                    else                    unit.moveRight     = false;
//                    break;
//                    
//            }
        });

        
        canvas.addEventListener('mousemove', function(e) {

        });

        function funcOnClick(e) {
        
            let entity = entities.entityOnCoords(MOUSE_WORLD_X, MOUSE_WORLD_Y);
            
            switch(e.which) {
                case 1:
                    //unit.doAction('attack', unit, entities.units, MOUSE_WORLD_X, MOUSE_WORLD_Y);
                    unit.isAttacking = true;
                    break;
                case 3  :
                    unit.action2(entity);
                    break;
            }
        }

        canvas.addEventListener('click', funcOnClick);
        canvas.addEventListener('contextmenu', funcOnClick);
    }
    
    return control;
}