function tools_module() {

    'use strict';
    
    function getDistance(unit1, unit2) {

        let distance;
        let unit1x = unit1.x + unit1.width / 2;

        if (unit1x > unit2.left && unit1x < unit2.right) {
            distance = Math.abs(unit1.bottom - unit2.bottom);
        }
        else {
            let xDist1 = Math.abs(unit1x - unit2.left);
            let xDist2 = Math.abs(unit1x - unit2.right);
            let deltaX = xDist1 < xDist2 ? xDist1 : xDist2;
            let deltaY = Math.abs(unit1.bottom - unit2.bottom);
            
            distance = Math.floor(Math.sqrt(deltaX * deltaX + deltaY * deltaY));
        }
        
        return distance;
    }

    return {
        getDistance: getDistance,
    };
    
}