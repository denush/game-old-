;'use strict';

///////

let g_tools     = tools_module();
let g_storage   = storage_module();
let g_files     = files_module();
let g_viewport  = viewport_module();
let control     = control_module();
let map         = map_module();
let interface   = interface_module();
let Entity      = Entity_module();
let Unit        = Unit_module();
let Subject     = Subject_module();
let entities    = entities_module();

auxiliary();
///////

g_files.downloadImages();
entities.init();
control.init(entities.hero, entities);
g_viewport.init(entities.hero, entities, map, interface);

function loop() {
    
    cleanScreen();
    
    g_viewport.update();
    g_viewport.draw();

    printDebug(entities.hero.isMoving);
    
    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);