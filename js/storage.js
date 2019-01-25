function storage_module() {    

    let storage = {
        hero: {
            x: 10,
            y: 10,
            type: 'human'
        },
        unitTypes: {
            human: {
                width: 50,
                height: 80,
                width2: 10,
                solid: false,
                states: {
                    stay: {
                        numberOfFrames: 1,
                        repeat: true
                    },
                    walk: {
                        numberOfFrames: 6,
                        repeat: true
                    },
                    attack: {
                        numberOfFrames: 1,
                        repeat: false
                    }
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
                x: 40,
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