function Subject_module() {

    'use strict';
    
    function Subject(x, y, w, h, w2, s, t, id) {

        Entity.call(this, x, y, w, h, w2, s);

        this.type = t;
        this.subjectId = id;
    }
    
    Subject.prototype = Object.create(Entity.prototype);
    
    //  SUBJECT METHODS
    Subject.prototype.update = function() {
    }

    Subject.prototype.draw = function(deltaX, deltaY, files) {
        let x = this.x - deltaX;
        let y = this.y - deltaY;
        
        let img = files.subjectImages[this.type];
        
        ctx.drawImage(img, x, y, this.width, this.height);
    }
    
    //  EVENTS
    Subject.prototype.getActioned = function(action) {
        switch(action) {
            case 'interact':
                console.log('IMAHOUSE');
                break;
        }
    }
    
    return Subject;
    
}