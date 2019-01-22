function Entity_module() {

    'use strict';
    
    function Entity(x, y, w, h, w2, s) {

        this.viewport = null;

        this.x = x;
        this.y = y;
        this.width = w;
        this.width2 = w2;
        this.height = h;
        this.isSolid = s;

    }

    //  GET / SET получение координат сторон юнита
    Object.defineProperties(Entity.prototype, {
        top: {
            get: function() { return this.y; },
            set: function(n) { this.y = n; }
        },
        bottom: {
            get: function() { return this.y + this.height; },
            set: function(n) { this.y = n - this.height; }
        },
        left: {
            get: function() { return this.x; },
            set: function(n) { this.x = n; }
        },
        right: {
            get: function() { return this.x + this.width; },
            set: function(n) { this.x = n - this.width; }
        },
        bottom2: {
            get: function() { return this.y + this.height - this.width2; },
            set: function(n) { this.y = n + this.width2 - this.height; }
        },
        middleX: {
            get: function() { return this.x + this.width / 2; }
        },
        screenX: {
            get: function() { return this.x - viewport.x; }
        },
        screenY: {
            get: function() { return this.y - viewport.y; }
        }
    });

    //  ENTITY METHODS
    Entity.prototype.initViewport = function(viewport) {
        this.viewport = viewport;
    }

    Entity.prototype.update = function() {

    }

    Entity.prototype.draw = function(deltaX, deltaY) {//TEST TEMP
        let x = this.x - deltaX;
        let y = this.y - deltaY;
        ctx.fillStyle = 'red';
        ctx.fillRect(x, y, this.width, this.height);
    }
    
    //  EVENTS
    Entity.prototype.clicked = function() {
        console.log('its a structure!!!');
    }
    
    //  END
    return Entity;
}