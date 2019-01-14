function storage_module() {    

    let storage = {
        hero: {
            x: 10,
            y: 10,
            width: 50,
            height: 80,
            width2: 10,
            solid: false,
            type: 'human'
        },
        unitTypes: {
            human: {
                width: 50,
                height: 80,
                width2: 10,
                solid: false,
                states: {
                    stay: 1,
                    walk: 6
                }
            },
        },
        subjectTypes: {
            house1: {
                width: 200,
                height: 300,
                width2: 200,
                solid: true
            },
            bush1: {
                width: 80,
                height: 50,
                width2: 0,
                solid: false
            }
        },
        units: [
            {
                x: 100,
                y: 10,
                type: 'human'
            },
            {
                x: 300,
                y: 150,
                type: 'human'
            },
            {
                x: 230,
                y: 360,
                type: 'human'
            },
        ],
        subjects: [
            {
                x: 400,
                y: 100,
                type: 'house1'
            },
            {
                x: 100,
                y: 100,
                type: 'house1'
            },
            {
                x: 100,
                y: 500,
                type: 'bush1'
            },
            {
                x: 210,
                y: 30,
                type: 'bush1'
            }
        ],
        map: [
            'grass',
            'grass',
        ]
    };    
    
    return storage;
    
}