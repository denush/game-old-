function Unit_module() {

    'use strict';
    
    function Unit(x, y, w, h, w2, s, t, id) {

        Entity.call(this, x, y, w, h, w2, s);

        this.type = t;
        this.unitId = id;
        
        this.speed = 2; //  скорость юнита в пикс/кадр

        //  координаты юнита в предыдущем кадре
        this.prevX = x;
        this.prevY = y;

        //  движение юнита в определенную сторону
        this.moveUp = false;
        this.moveDown = false;
        this.moveLeft = false;
        this.moveRight = false;
        
//        this.moveUpLeft = false;
//        this.moveUpRight = false;   
//        this.moveDownLeft = false;
//        this.moveDownRight = false;

        this.isMoving = null;   //  движется ли юнит в данный момент

        this.prevState = null;    //  cостояние юнита в предыдущем кадре
        this.state = null;        //  состояние юнита в текущем кадре -- состояние обновляется в update()
        this.stateLength = null   //  длительность состояния (в кадрах)
        
        //  св-ва для подсчета кадров анимации
        this.animationFrame = 0;        // номер текущего кадра анимации
        this.animationLength = 0;       // кол-во кадров в текущей анимации
        this.frameCounter = 0;          // счетчик для установки длительности каждого кадра анимации 
        this.frameLength = 10;          // длительность одного кадра анимации
        
        this.direction = null;   //  направление взгляда
        
        this.stats = {
            strength: 20,
        }
        
        this.fullHP = 200;
        this.currentHP = this.fullHP;
        
        
        //*************************//
        //*******   TEST    *******//
        //*************************//
        
        this.weapon =  {
            range: 50,
            damage: 30,
            frames: 1
        }
        
        this.isAttacking = false;
        this.statenEnd = false;
        
        this.lookX = null;
        this.lookY = null;
    }

    Unit.prototype = Object.create(Entity.prototype);

    //  UNIT GET получение координат сторон юнита в предыдущем кадре
    Object.defineProperties(Unit.prototype, {
        prevTop: {
            get: function() { return this.prevY; }
        },
        prevBottom: {
            get: function() { return this.prevY + this.height; }
        },
        prevLeft: {
            get: function() { return this.prevX; }
        },
        prevRight: {
            get: function() { return this.prevX + this.width; }
        },
        prevBottom2: {
            get: function() { return this.prevY + this.height - this.width2; }
        }
    });

    //  UNIT METHODS
    //  UPDATE
    Unit.prototype.update = function() {
        
        //Entity.prototype.update.call(this);

        //  устанавливаем сторону, в которую направлен персонаж
        this.direction = this.lookX < this.middleX ? 'left' : 'right';
        
        //  сохраняем в каждом кадре значения координат предыдущего кадра
        this.prevX = this.x;
        this.prevY = this.y;

        //  изменяем координаты для эффекта движения юнита
        if (this.moveUp && this.moveLeft) {
            this.x -= this.speed;
            this.y -= this.speed;
            this.isMoving = true;
        }
        else if (this.moveUp && this.moveRight) {
            this.x += this.speed;
            this.y -= this.speed;
            this.isMoving = true;
        }
        else if (this.moveDown && this.moveLeft) {
            this.x -= this.speed;
            this.y += this.speed;
            this.isMoving = true;
        }
        else if (this.moveDown && this.moveRight) {
            this.x += this.speed;
            this.y += this.speed;
            this.isMoving = true;
        }     
        else if (this.moveUp) {
            this.y -= this.speed;
            this.isMoving = true;
        }
        else if (this.moveDown) {
            this.y += this.speed;
            this.isMoving = true;
        }
        else if (this.moveLeft) {
            this.x -= this.speed;
            this.isMoving = true;
        }
        else if (this.moveRight) {
            this.x += this.speed;
            this.isMoving = true;
        }
        else {
            this.isMoving = false;
        }
        
        //  STATES OF THE UNIT
        this.prevState = this.state;
        
        if (this.stateEnd) {
            
            switch(this.prevState) {
                case 'attack':
                    
                    this.isAttacking = false;
                    this.stateEnd = false;
                    this.state = null;
                    
                    this.doAction('attack');
                    
                    break;
            }
        }
        
        if (this.isAttacking) {
            this.state = 'attack';
        }
        else if (this.isMoving) {
            //this.isMoving = true;           //  если юнит совершает движение, запоминаем это (isMoving)
            this.state = 'walk';
        }
        else {
            //this.isMoving = false; 
            this.state = 'stay';
        }
        this.stateLengh = g_storage.unitTypes[this.type].states[this.state].numberOfFrames;
    }

    //  DRAW
    Unit.prototype.draw = function(deltaX, deltaY) {
        //  устанавливаем координта для отрисовки в зависимости от смещения вьюпорта
        let x = this.x - deltaX;
        let y = this.y - deltaY;

        //  если изменилось состояние юнита
        if (this.state !== this.prevState) {
            this.animationFrame = 0;
            this.frameCounter = 0;
            this.animationLength = g_files.unitImages[this.type][this.state].numberOfFrames;
        }
        
        // картинка, которую надо будет отрисовать в этом кадре
        let img = g_files.unitImages[this.type][this.state][this.direction][this.animationFrame];

        this.frameCounter++;    //  увеличим длительность текущего кадра
        if (this.frameCounter % this.frameLength === 0) {   //  если кадр длится больше установленного времени
            this.frameCounter = 0;                          //  сбрасываем длительность в ноль
            this.animationFrame++;                          //  и переходим к следующему кадру анимации
        }

        if (this.animationFrame >= this.animationLength) {  //  если кадры в текущей анимации закончились
                
            //  смотрим, имеет ли состояние свойство повторяться
            if (g_files.unitImages[this.type][this.state].repeat) {
                this.animationFrame = 0;    //  если повторяется, начинаем анимацию сначала
            }
            else {
                this.stateEnd = true;       //  если нет, устанавливаем флаг об окончании состояния
            }
        }
        ctx.drawImage(img, x, y, this.width, this.height);
    }
    
    //  RESOLVE COLLISIONS
    Unit.prototype.resolveCollisions = function(unit) {
        if (checkCollisions(this, unit)) {
            //  проверяем, с какой стороны произошла коллизия
            let side = checkCollisionSide(this, unit);
            //  и смещаем эту сторону из коллизии на границу пересечения юнитов
            if (side === 'top')
                this.bottom2 = unit.bottom;
            else if (side === 'bottom')    
                this.bottom = unit.bottom2;   
            else if (side === 'left')
                this.left = unit.right; 
            else if (side === 'right')
                this.right = unit.left; 
        }
    }

    //  проверка коллизии у двух прямоугольников(вспомогательная ф-ия для resolveCollisions)
    function checkCollisions(unit1, unit2) {    

        let hcol = false;
        let vcol = false;

        //  проверяем, было ли пересечение прямоугольников по горизонтали и вертикали
        if ( (unit1.left < unit2.right) && (unit1.right > unit2.left) )         hcol = true;
        if ( (unit1.bottom2 < unit2.bottom) && (unit1.bottom > unit2.bottom2) ) vcol = true;

        //  если было было одновременное пересечение, значит была коллизия
        if (hcol && vcol) return true;
    }

    //  проверка, с какой стороны произошла коллизия(вспомогательная ф-ия для resolveCollisions)
    function checkCollisionSide(unit1, unit2) {
        //  если до коллизии уже было горизонтальное пересечение проекций, значит коллизия произошла по вертикали
        if ( (unit1.prevLeft < unit2.right) && (unit1.prevRight > unit2.left) ) {
            if (unit1.y - unit1.prevY > 0)  //  в какую сторону двигался юнит
                return 'bottom';
            else
                return 'top';
        }
        else {
            if (unit1.x - unit1.prevX > 0)
                return 'right';
            else
                return 'left';
        }
    }
    
    //  ACTIONS
    let actionList = {
        attack: attack,
    }
    
    Unit.prototype.doAction = function(action) {
        actionList[action].call(this);  //  вызываем необходимое действие и передаем все аргументы
        //this.isAttacking = true;
    }
    

    //  действие - атака
    function attack() {
        let unit = this;
        //  радиус поражения удара -- тестовое решение
        let effectiveRange = unit.weapon.range;    //  TEST
        let resultDamage = unit.weapon.damage;
        
        //  определение, в какой сектор вокруг персонажа наносится удар
        let sector = 0;
        if (unit.lookY >= unit.top && unit.lookY <= unit.bottom) {
            sector = unit.lookX < unit.middleX ? 4 : 5;     //  секторы перед персонажем строго по горизонтали
        }
        else if (unit.lookX >= unit.left && unit.lookX <= unit.right) {
            sector = unit.lookY < unit.top ? 2 : 7;         //  секторы строго по вертикали
        }
        else if (unit.lookX < unit.left) {
            sector = unit.lookY < unit.top ? 1 : 6;         //  секторы слева от персонажа по диагонали
        }
        else if (unit.lookX > unit.right) {
            sector = unit.lookY < unit.top ? 3 : 8;         //  секторы справа по диагонали
        }
        
        let entities = g_tools.getEntities(unit);
        //  для каждого юнита, который находится в радиусе поражения, 
        entities.forEach(function(entity) {
            if (g_tools.getDistance(unit, entity) <= effectiveRange) {    //  смотрим, находится ли он в секторе удара
                
                let presenceFlag = false;
                //  в зависимости от сектора удара смотрим, находится ли цель в нем
                //  и если находится, то устанавливаем флаг presenceFlag
                switch(sector) {
                    case 1:
                        if (entity.bottom <= unit.bottom &&
                            entity.middleX <= unit.middleX)
                            presenceFlag = true;
                        break;    
                    case 2:
                        if (entity.right >= unit.left && entity.left <= unit.right &&
                            entity.bottom <= unit.bottom)
                            presenceFlag = true;  
                        break;
                    case 3:
                        if (entity.bottom <= unit.bottom &&
                            entity.middleX >= unit.middleX)
                            presenceFlag = true;
                        break;
                    case 4:
                        if (entity.bottom >= unit.bottom - effectiveRange &&
                            entity.bottom <= unit.bottom + effectiveRange &&
                            entity.middleX <= unit.middleX)
                            presenceFlag = true;
                        break;
                    case 5:
                        if (entity.bottom >= unit.bottom - effectiveRange &&
                            entity.bottom <= unit.bottom + effectiveRange &&
                            entity.middleX >= unit.middleX)
                            presenceFlag = true;
                        break;
                    case 6:
                        if (entity.bottom >= unit.bottom &&
                            entity.middleX <= unit.middleX)
                            presenceFlag = true;
                        break;
                    case 7:
                        if (entity.right >= unit.left && entity.left <= unit.right &&
                            entity.bottom >= unit.bottom)
                            presenceFlag = true;
                        break;
                    case 8:
                        if (entity.bottom >= unit.bottom &&
                            entity.middleX >= unit.middleX)
                            presenceFlag = true;
                        break;
                }
                
                //  если юнит действительно находтся в секторе удара,
                //  вызываем у пораженного юнита соотвествующее событие
                if (presenceFlag) {
                    entity.popEvent('attack', entity, resultDamage);    
                }
            }
        });
    }
    
    //  EVENTS
    let eventList = {
        attack: getAttacked,
        inspect: getInspected,
    }
    
    Unit.prototype.popEvent = function(action) {
        eventList[action].apply(null, arguments);
    }

    function getAttacked(action, unit, power) {
        
        unit.currentHP -= power;
        
        if (unit.currentHP < 0) {
            unit.currentHP = 0;
        }
        
        console.log('==================');
        console.log('unit id: ' + unit.unitId);
        console.log('HIT for ' + power);
        console.log('current HP: ' + unit.currentHP);
        console.log('==================');
    }
    
    function getKicked() {
        
    }
    
    function getInteracted() {
        console.log('HELLO!!!');
    }
    
    function getInspected(id) {
        
    }
    
    //  END
    return Unit;
};