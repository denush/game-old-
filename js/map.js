function map_module() {

    let matrix = [
        [ 1, 1, 1, 1, 1, 1, 1, 1 ],
        [ 1, 1, 1, 1, 1, 1, 1, 1 ],
        [ 1, 1, 1, 1, 1, 1, 1, 1 ],
        [ 1, 1, 1, 1, 1, 1, 1, 1 ],
        [ 1, 1, 1, 1, 1, 1, 1, 1 ],
        [ 1, 1, 1, 1, 1, 1, 1, 1 ],
        [ 1, 1, 1, 1, 1, 1, 1, 1 ],
        [ 1, 1, 1, 1, 1, 1, 1, 1 ]
    ];

    const PIXEL_PER_SQUARE = 100;

    let map = {
        matrix: matrix,
        pps: PIXEL_PER_SQUARE,
    }

    map.draw = function(deltaX, deltaY, files) {
        for (let i = 0; i < this.matrix.length; ++i) {
            for (let j = 0; j < this.matrix.length; ++j) {
                
                    let img = files.mapImages[ this.matrix[i][j] ];
                    let x = i * this.pps - deltaX;
                    let y = j * this.pps - deltaY;
                    ctx.drawImage(img, x, y, this.pps, this.pps);
            }
        }
    }

    return map;

}