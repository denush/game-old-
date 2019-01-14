;'use strict';

///////

let tools       = tools_module();
let storage     = storage_module();
let files       = files_module();
let control     = control_module();
let viewport    = viewport_module();
let map         = map_module();
let Entity      = Entity_module();
let Unit        = Unit_module();
let Subject     = Subject_module();
let entities    = entities_module();

auxiliary();
///////

files.uploadImages(storage);
entities.init(storage);
control.init(entities.hero, entities, viewport);
viewport.init(entities.hero, entities, map);

function loop() {
    
    cleanScreen();
    
    viewport.update();
    viewport.draw(files);

    printDebug(entities.hero.animationLength);
    
    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);