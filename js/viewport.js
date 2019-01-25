function viewport_module() {

    let viewport = {
        x:          0,
        y:          0,
        hero:       null,   //  главный персонаж, за ним будет двигаться камера
        entities:   null,   //  все физические объекты на карте
        map:        null,   //  объект карты мира

        //получение координат вьюпорта для внешнего кода
        getCoords: function() {
            return {
                x: this.x,
                y: this.y
            };
        }
    }
    
    //  установка значений объектов для их отрисовки
    viewport.init = function(hero, entities, map, interface) {
        this.hero = hero;
        this.entities = entities;
        this.map = map;
        this.interface = interface;
    }
    
    viewport.update = function() {
        
        
        this.entities.update();
            
        //  обновление координат вьюпорта в зависимости от местоположения героя
        this.x = Math.floor(this.hero.x - canvas.width / 2 + this.hero.width / 2);
        this.y = Math.floor(this.hero.y - canvas.height / 2 + this.hero.height / 2);
        
        //  обновление глобальных координат мыши в зависимости от положения вьюпорта
        MOUSE_WORLD_X = MOUSE_SCREEN_X + this.x;
        MOUSE_WORLD_Y = MOUSE_SCREEN_Y + this.y;
        
        //  обновление точки, на которую смотрит персонаж
        this.hero.lookX = MOUSE_WORLD_X;
        this.hero.lookY = MOUSE_WORLD_Y;
        
        //console.log(MOUSE_WORLD_X + ' ' + MOUSE_WORLD_Y);
    }

    viewport.draw = function() {
        
        this.map.draw(this.x, this.y);
        this.entities.draw(this.x, this.y);
        this.interface.draw(this.hero, this.entities.units);
    }
    
    return viewport;
    
}