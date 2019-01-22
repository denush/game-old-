function tools_module() {

    'use strict';

    //  получение расстояния между двумя юнитами
    function getDistance(unit1, unit2) {
        
        let modY = 0.5;
        let distance;

        if (unit1.left <= unit2.right && unit1.right >= unit2.left) {
            distance = Math.floor(Math.abs(unit1.bottom - unit2.bottom) * modY);
        }
        else if (unit1.right < unit2.left) {
            let deltaX = unit2.left - unit1.right;
            let deltaY = Math.floor(Math.abs(unit1.bottom - unit2.bottom) * modY);
            
            distance = Math.floor(Math.sqrt(deltaX * deltaX + deltaY * deltaY));
        }
        else if (unit1.left > unit2.right) {
            let deltaX = unit1.left - unit2.right;
            let deltaY = Math.floor(Math.abs(unit1.bottom - unit2.bottom) * modY);
            
            distance = Math.floor(Math.sqrt(deltaX * deltaX + deltaY * deltaY));
        }
        
        return distance;
    }

    return {
        getDistance: getDistance,
    };
}