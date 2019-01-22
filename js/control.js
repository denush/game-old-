function control_module() {

    'use strict';
    
    const KEY_W = 87;
    const KEY_A = 65;
    const KEY_S = 83;
    const KEY_D = 68;

    let keys = {
        87: 'moveUp',
        83: 'moveDown',
        65: 'moveLeft',
        68: 'moveRight'  
    }
    
    let control = {};

    //  инициализация управления
    control.init = function(unit, entities, viewport) {
        
        document.addEventListener('keydown', function(e) {

            //unit[keys[e.keyCode]] = true;

            if (e.keyCode === KEY_W) unit.moveUp = true;
            if (e.keyCode === KEY_S) unit.moveDown = true;
            if (e.keyCode === KEY_A) unit.moveLeft = true;
            if (e.keyCode === KEY_D) unit.moveRight = true;
        });

        document.addEventListener('keyup', function(e) {

            if (e.keyCode === KEY_W) unit.moveUp = false;
            if (e.keyCode === KEY_S) unit.moveDown = false;
            if (e.keyCode === KEY_A) unit.moveLeft = false;
            if (e.keyCode === KEY_D) unit.moveRight = false;
        });

        
        canvas.addEventListener('mousemove', function(e) {
            
            unit.direction = MOUSE_SCREEN_X > unit.screenX + unit.width / 2 ? 'right' : 'left';   
        });

        function funcOnClick(e) {
        
            let entity = entities.entityOnCoords(MOUSE_WORLD_X, MOUSE_WORLD_Y);

            //if (entity) console.log('distance: ' + tools.getDistance(unit, entity));
            
            switch(e.which) {
                case 1:
                    unit.doAction('attack', unit, entities.units, MOUSE_WORLD_X, MOUSE_WORLD_Y);
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