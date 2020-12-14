const svg = d3
    .select("body")
    .append("svg")
    .attr("id", "stuff");

const BLOCK_SIZE = 50;
let WIDTH, HEIGHT;
resize();
// var HEIGHT = window.innerHeight
//     || document.documentElement.clientHeight
//     || document.body.clientHeight;


function resize() {
    WIDTH = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
    WIDTH *= .95;
    HEIGHT = HEIGHT = WIDTH * .75;

    svg.attr("width", WIDTH)
        .attr("height", HEIGHT);
}


window.onresize = resize;
// let square = drawSquare(0, 0);
// let s = {
//     x: 0,
//     y: 0
// }
// document.getElementById("stuff").onclick = function (e) {
//     var rect = e.target.getBoundingClientRect();
//     var x = e.clientX - rect.left; //x position within the element.
//     var y = e.clientY - rect.top;  //y position within the element.
//     console.log(x, y, square);
//     move(x, y, square)
// }

function move(x, y, item, coll = hit) {
    console.log("move", item);
    let nx, ny = 0;
    item
        .attr("x", x)
        .attr("y", y)
        .transition()
        .attrTween("x", function () {
            return function (t) {
                console.log(x * t);
                nx = s.x +  (x - s.x) * t
                coll(nx, ny);
                return nx;
            }
        }).attrTween("y", function () {
            return function (t) {
                console.log(y * t);
                ny = s.y + ((y - s.y) * t);
                coll(nx, ny);
                return ny;
            }
        }).on("end", () => {
            s.x = x;
            s.y = y;
            console.log(s);
        }).duration(300)

}

function hit(x,y){
    if((y >= 200 && y < (200+(475/2))) && (x >= 200 && x < (200+(386/2))))
        addGAfter();
}

function addImage(x,y,w,h,src){
    svg.append("svg:image")
    .attr('x', x)
    .attr('y', y)
    .attr('width', w)
    .attr('height', h)
    .attr("xlink:href", src)
    .attr("id", "gma");
}
function drawSquare(x, y, color = "white", degrees = 0) {
    return svg
        .append("rect")
        .attr("fill", color)
        .attr("x", x)
        .attr("y", y)
        .attr("width", BLOCK_SIZE)
        .attr("height", BLOCK_SIZE)
        .attr(
            "transform",
            `rotate(${degrees},${x + BLOCK_SIZE / 2},${y + BLOCK_SIZE / 2})`
        );
}

