function files_module() {
    
    'use strict';
    
    let files = {
        unitImages: {},
        subjectImages: {},
        mapImages: [],
    };
    
    files.uploadImages = function(storage) {
        //  для каждого типа юнита  
        for (let type in storage.unitTypes) { 
            //  создаем в объекте files.unitImages новый объект
            files.unitImages[type] = {};
            //  также для каждого возможного направления юнита
            [ 'left', 'right' ].forEach(function(side) {
                //  нужно создать свой объект внутри данного типа юнита
                files.unitImages[type][side] = {};
                //  далее также для каждого возможного состояния юнита
                for (let state in storage.unitTypes[type].states) {
                    //  необходимо создать массив, в котором будут хранится изображения 
                    files.unitImages[type][side][state] = [];   // для анимации данного состояния
                    //  проходим по всем кадрам состояния и сохраняем изображения в массив
                    for (let i = 0; i < storage.unitTypes[type].states[state]; ++i) {
                        
                        let path = `img/units/${type}/${side}/${state}/${i}.png`;
                        let img = document.createElement('img');
                        img.src = path;
                        files.unitImages[type][side][state].push(img);
                    }
                }
            });
        }
        
        for (let type in storage.subjectTypes) {
            let path = 'img/subjects/' + type + '.png'
            let img = document.createElement('img');
            img.src = path;
            this.subjectImages[type] = img;
        }

        storage.map.forEach(function(chunk) {
            let path = 'img/map/' + chunk + '.png';
            let img = document.createElement('img');
            img.src = path;
            files.mapImages.push(img); 
        });
    }
    
    return files;
}