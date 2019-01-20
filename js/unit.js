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

        this.isMoving = null;   //  движется ли юнит в данный момент

        this.prevState = null;    //  cостояние юнита в предыдущем кадре
        this.state = null;        //  состояние юнита в текущем кадре -- состояние обновляется в update()
        
        //  св-ва для подсчета кадров анимации
        this.animationFrame = 0;        // номер текущего кадра анимации
        this.animationLength = 0;       // кол-во кадров в текущей анимации
        this.frameCounter = 0;          // счетчик для установки длительности каждого кадра анимации 
        this.frameLength = 10;          // длительность одного кадра анимации
        
        this.direction = 'right';   //  направление взгляда
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

        //  сохраняем в каждом кадре значения координат предыдущего кадра
        this.prevX = this.x;
        this.prevY = this.y;

        //  изменяем координаты для эффекта движения юнита
        if (this.moveUp) {
            this.y -= this.speed;
        }
        if (this.moveDown) {
            this.y += this.speed;
        }
        if (this.moveLeft) {
            this.x -= this.speed;
            //this.direction = 'left'; // если юнит движется влево, то взгляд направлен туда же
        }
        if (this.moveRight) {
            this.x += this.speed;
            //this.direction = 'right';
        }
        
        //  если юнит совершает движение, запоминаем это (isMoving)
        if (this.moveUp || this.moveDown ||
            this.moveLeft || this.moveRight) {
            this.isMoving = true;
            this.prevState = this.state;
            this.state = 'walk';   
        }
        else {
            this.isMoving = false;
            this.prevState = this.state;
            this.state = 'stay';
        }
    }

    //  DRAW
    Unit.prototype.draw = function(deltaX, deltaY, files) {
        let x = this.x - deltaX;
        let y = this.y - deltaY;

        //  если изменилось состояние юнита
        if (this.state !== this.prevState) {
            this.animationFrame = 0;
            this.frameCounter = 0;
            this.animationLength = files.unitImages[this.type][this.direction][this.state].length;
        }
        
        // картинка, которую надо будет отрисовать в этом кадре
        let img = files.unitImages[this.type][this.direction][this.state][this.animationFrame];

        this.frameCounter++;
        if (this.frameCounter % this.frameLength === 0) {
            this.frameCounter = 0;
            this.animationFrame++;
            if (this.animationFrame >= this.animationLength)
                this.animationFrame = 0;
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
    
    //  EVENTS
    Unit.prototype.action1 = function(entity) {
        if (entity) {
            entity.getActioned('interact');
            let dist = tools.getDistance(this, entity);
        }
    }

    Unit.prototype.action2 = function(entity) {
        if (entity) {
            entity.getActioned('inspect');
            let dist = tools.getDistance(this, entity);
        }
    }

    Unit.prototype.getActioned = function(action) {

        console.log('world x: ' + this.x);
        console.log('world y: ' + this.y);
        console.log('screen x: ' + this.screenX);
        console.log('screen x: ' + this.screenY);

        switch(action) {
            case 'interact':
                getInteracted();
                break;
            case 'inspect':
                getInspected(this.unitId);
                break;

        }
    }

    function getAttacked(entity) {
        
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