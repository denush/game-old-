function files_module() {
    
    'use strict';
    
    let files = {
        unitImages: {},
        subjectImages: {},
        mapImages: [],
    };
    
    files.downloadImages = function() {        
        //  для каждого типа юнита  
        for (let type in g_storage.unitTypes) { 
            //  создаем в объекте files.unitImages новый объект
            files.unitImages[type] = {};
            //  далее также для каждого возможного состояния юнита
            for (let state in g_storage.unitTypes[type].states) {
                //  нужно создать объект данного состояния юнита
                files.unitImages[type][state] = {};
                files.unitImages[type][state].numberOfFrames = g_storage.unitTypes[type].states[state].numberOfFrames;
                files.unitImages[type][state].repeat = g_storage.unitTypes[type].states[state].repeat;
                //  также для каждого возможного направления юнита
                [ 'left', 'right' ].forEach(function(side) {
                    //  мы создаем массив, в котором будут хранится изображения данного состояния для данного направления
                    files.unitImages[type][state][side] = [];
                    //  проходим по всем кадрам состояния и сохраняем изображения в массив
                    for (let i = 0; i < g_storage.unitTypes[type].states[state].numberOfFrames; ++i) {
                        
                        let path = `img/units/${type}/${state}/${side}/${i}.png`;
                        let img = document.createElement('img');
                        img.src = path;
                        
                        files.unitImages[type][state][side].push(img);
                    }
                });
            }
        }
        
        for (let type in g_storage.subjectTypes) {
            let path = 'img/subjects/' + type + '.png'
            let img = document.createElement('img');
            img.src = path;
            this.subjectImages[type] = img;
        }

        g_storage.map.forEach(function(chunk) {
            let path = 'img/map/' + chunk + '.png';
            let img = document.createElement('img');
            img.src = path;
            files.mapImages.push(img); 
        });
    }
    
    console.log(files);
    return files;
}