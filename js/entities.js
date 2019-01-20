function entities_module() {
    'use strict';
        
    let entities = {
        hero: null,
        units: [],
        subjects: [],
        all: []
    };

    entities.init = function(storage, viewport) {

        this.hero = new Unit(storage.hero.x,
                            storage.hero.y,
                            storage.hero.width,
                            storage.hero.height,
                            storage.hero.width2,
                            storage.hero.solid,
                            storage.hero.type,
                            9999);

        this.units.push(this.hero);

        storage.units.forEach(function(unit, i) {
            entities.units.push(new Unit(unit.x,
                                    unit.y,
                                    storage.unitTypes[unit.type].width,
                                    storage.unitTypes[unit.type].height,
                                    storage.unitTypes[unit.type].width2,
                                    storage.unitTypes[unit.type].solid,
                                    unit.type,
                                    i));
        });

        storage.subjects.forEach(function(subject, i) {
            entities.subjects.push(new Subject(subject.x,
                                        subject.y,
                                        storage.subjectTypes[subject.type].width,
                                        storage.subjectTypes[subject.type].height,
                                        storage.subjectTypes[subject.type].width2,
                                        storage.subjectTypes[subject.type].solid,
                                        subject.type,
                                        i));
        });

        this.all = this.units.concat(this.subjects);
        this.all.forEach(function(entity) {
            entity.initViewport(viewport);
        });
    }
    
    entities.update = function() {
        this.all.forEach(function(unit) {
            unit.update();
        });
        this.units.forEach(function(unit) {

            entities.subjects.forEach(function(subject) {
                if (subject.isSolid)
                    unit.resolveCollisions(subject);
            });
        });
    }

    entities.draw = function(deltaX, deltaY, files) {
        this.all.sort(function(a, b) {
            return (a.y + a.height) - (b.y + b.height);
        });
        this.all.forEach(function(unit) {
            unit.draw(deltaX, deltaY, files); 
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