function entities_module() {
    'use strict';
        
    let entities = {
        hero: null,
        units: [],
        subjects: [],
        all: []
    };

    entities.init = function() {

        this.hero = new Unit(g_storage.hero.x,
                            g_storage.hero.y,
                            g_storage.unitTypes[g_storage.hero.type].width,
                            g_storage.unitTypes[g_storage.hero.type].height,
                            g_storage.unitTypes[g_storage.hero.type].width2,
                            g_storage.unitTypes[g_storage.hero.type].solid,
                            g_storage.hero.type,
                            9999);

        //this.units.push(this.hero);

        g_storage.units.forEach(function(unit, i) {
            entities.units.push(new Unit(unit.x,
                                    unit.y,
                                    g_storage.unitTypes[unit.type].width,
                                    g_storage.unitTypes[unit.type].height,
                                    g_storage.unitTypes[unit.type].width2,
                                    g_storage.unitTypes[unit.type].solid,
                                    unit.type,
                                    i));
        });

        g_storage.subjects.forEach(function(subject, i) {
            entities.subjects.push(new Subject(subject.x,
                                        subject.y,
                                        g_storage.subjectTypes[subject.type].width,
                                        g_storage.subjectTypes[subject.type].height,
                                        g_storage.subjectTypes[subject.type].width2,
                                        g_storage.subjectTypes[subject.type].solid,
                                        subject.type,
                                        i));
        });

        this.all.push(this.hero);
        this.all = this.all.concat(this.units, this.subjects);
    }
    
    entities.update = function() {
        this.all.forEach(function(unit) {
            unit.update();
        });
        
        //  проверяем коллизии для игрока
        let hero = this.hero;
        this.subjects.forEach(function(subject) {
            if (subject.isSolid) {
                hero.resolveCollisions(subject);
            } 
        });
        
        //  проверяем коллизии для других юнитов
        this.units.forEach(function(unit) {
            entities.subjects.forEach(function(subject) {
                if (subject.isSolid)
                    unit.resolveCollisions(subject);
            });
        });
    }

    entities.draw = function(deltaX, deltaY) {
        this.all.sort(function(a, b) {
            return (a.y + a.height) - (b.y + b.height);
        });
        this.all.forEach(function(unit) {
            unit.draw(deltaX, deltaY); 
        });
    }
    
    //  функция возвращает объект, находящийся на указанных координатах
    entities.entityOnCoords = function(x, y) {
        let temp;
        let tempY = 0;
        let hor = false;
        let ver = false;
        entities.all.forEach(function(entity) {
            if (x > entity.left && x < entity.right) ver = true;
            if (y > entity.top && y < entity.bottom) hor = true;
            if (ver && hor) {
                if (entity.bottom > tempY) {
                    temp = entity;
                    tempY = entity.bottom;
                }
            }
            ver = false;
            hor = false;
        });

        if (temp)
            return temp;
        else
            return null;
    }

    return entities;

}