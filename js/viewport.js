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
    viewport.init = function(hero, entities, map) {
        this.hero = hero;
        this.entities = entities;
        this.map = map;
    }
    
    viewport.update = function() {
        
        this.entities.update();
            
        //  обновление координат вьюпорта в зависимости от местоположения героя
        this.x = this.hero.x - canvas.width / 2 + this.hero.width / 2;
        this.y = this.hero.y - canvas.height / 2 + this.hero.height / 2;
    }

    viewport.draw = function(files) {
        
        this.map.draw(this.x, this.y, files);
        this.entities.draw(this.x, this.y, files);
    }
    
    return viewport;
    
}