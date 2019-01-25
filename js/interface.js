function interface_module() {
    
    let interface = {
        HPBar: {
            x: null,
            y: null,
            width: 60,
            height: 10,
            innerWidth: null
        },
    };

    
    interface.init = function(entities) {
        
        this.entities = entities;
        
    }
    
    //  пока отрисовывается только хпбар
    //  todo запихнуть отрисовку хпбара в отдельный модуль
    interface.draw = function(hero, entities) {
        
        interface.HPBar.x = hero.middleX - interface.HPBar.width / 2;
        interface.HPBar.y = hero.top - interface.HPBar.height - interface.HPBar.height;
        
        ctx.fillStyle = 'black';
        ctx.fillRect(interface.HPBar.x - g_viewport.x,
                     interface.HPBar.y - g_viewport.y,
                     interface.HPBar.width,
                     interface.HPBar.height);

        interface.HPBar.innerWidth = hero.currentHP / hero.fullHP * interface.HPBar.width;
        ctx.fillStyle = 'red';
        ctx.fillRect(interface.HPBar.x - g_viewport.x,
                     interface.HPBar.y - g_viewport.y,
                     interface.HPBar.innerWidth,
                     interface.HPBar.height);
        
        entities.forEach(function(entity) {
            
            interface.HPBar.x = entity.middleX - interface.HPBar.width / 2;
            interface.HPBar.y = entity.top - interface.HPBar.height - interface.HPBar.height;
            
            ctx.fillStyle = 'black';
            ctx.fillRect(interface.HPBar.x - g_viewport.x,
                         interface.HPBar.y - g_viewport.y,
                         interface.HPBar.width,
                         interface.HPBar.height);
            
            interface.HPBar.innerWidth = entity.currentHP / entity.fullHP * interface.HPBar.width;
            ctx.fillStyle = 'red';
            ctx.fillRect(interface.HPBar.x - g_viewport.x,
                         interface.HPBar.y - g_viewport.y,
                         interface.HPBar.innerWidth,
                         interface.HPBar.height);
        });
        
    }
    
    return interface;
}