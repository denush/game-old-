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
    
    let control = {
        
        mouseClick: {
            x: 0,
            y: 0
        },
    };

    //  инициализация управления
    control.init = function(unit, entities, viewport) {
        
        document.addEventListener('keydown', function(e) {

            //unit[keys[e.keyCode]] = true;

            if (e.keyCode === KEY_W) unit.moveUp = true;
            if (e.keyCode === KEY_S) unit.moveDown = true;
            if (e.keyCode === KEY_A) unit.moveLeft = true;
            if (e.keyCode === KEY_D) unit.moveRight = true;

            //console.log(e.keyCode);
        });

        document.addEventListener('keyup', function(e) {

            if (e.keyCode === KEY_W) unit.moveUp = false;
            if (e.keyCode === KEY_S) unit.moveDown = false;
            if (e.keyCode === KEY_A) unit.moveLeft = false;
            if (e.keyCode === KEY_D) unit.moveRight = false;
        });


        function funcOnClick(e) {
            e.preventDefault();

            let screenX = e.clientX - canvas.offsetLeft - canvas.clientLeft;
            let screenY = e.clientY - canvas.offsetTop - canvas.clientTop;
            let worldX = screenX + viewport.getCoords().x;
            let worldY = screenY + viewport.getCoords().y;

            let entity = entities.entityOnCoords(worldX, worldY);

            if (entity) {
                entity.clicked(e.which);
                let dist = tools.getDistance(unit, entity);
            }
        }

        canvas.addEventListener('click', funcOnClick);
        canvas.addEventListener('contextmenu', funcOnClick);

        canvas.addEventListener('mousedown', function(e) {
            e.preventDefault();
        });
        document.addEventListener('dblclick', function(e) {
            e.preventDefault();
        });
    }
    
    return control;

}