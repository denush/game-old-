function auxiliary() {
    
    let coords = document.getElementById('coords');
    coords.children[0].children[0].innerHTML = 'x';
    coords.children[1].children[0].innerHTML = 'y';
    
    canvas.addEventListener('mousemove', function(e) {
        let screenX = e.clientX - canvas.offsetLeft - canvas.clientLeft;
        let screenY = e.clientY - canvas.offsetTop - canvas.clientTop;

        let worldX = screenX + viewport.x;
        let worldY = screenY + viewport.y;
        
        coords.children[0].children[1].innerHTML = screenX;
        coords.children[1].children[1].innerHTML = screenY;
        
        coords.children[0].children[2].innerHTML = worldX;
        coords.children[1].children[2].innerHTML = worldY;
    });
    
    
    let debug = document.getElementById('debug');
    function printDebug(str) {
        debug.innerHTML = str;
    }
    
}