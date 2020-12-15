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
let square = drawSquare(0, 0);
let s = {
    x: 0,
    y: 0
}

let wolfFriend = addImage(0, 0, 150, 75, "./wolf.png", "wolf");
let wolfFriend2 = addImage(150, 0, 150, 75, "./wolf.png", "wolf");
let kittenFriend = addImage(100, 100, 100, 100, "https://target.scene7.com/is/image/Target/GUEST_bd945555-f106-40e9-80ad-4c6668b4e534?wid=488&hei=488&fmt=pjpeg", "cow");
document.getElementById("stuff").onclick = function (e) {
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top;  //y position within the element.
    console.log(x, y, square);
    //move(x, y, square)

       wolfFriend.transition()
        .duration(500)
        .attr("x",x)
        .attr("y",y)
    
        wolfFriend2.transition()
            .duration(1000)
            .attr("x",x)
            .attr("y",y)
            .on("start", function(){
                kittenFriend.transition()
                    .duration(200)
                    .attr("x",x+100)
                    .attr("y",y+100)
            });




}

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
                nx = s.x + (x - s.x) * t
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
        })
        .duration(300)


}

function hit(x, y, action) {
    if ((y >= 200 && y < (200 + (475 / 2))) && (x >= 200 && x < (200 + (386 / 2))))
        {
            alert("you found the hidden spot!");
            addImage(x,y, 150, 75, "./wolf.png", "wolf");
        }
}

function addImage(x, y, w, h, src, id) {
    return svg.append("svg:image")
        .attr('x', x)
        .attr('y', y)
        .attr('width', w)
        .attr('height', h)
        .attr("xlink:href", src)
        .attr("id", id);
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








































// let character = {
//     x: 0,
//     y: HEIGHT - 75,
//     w: 150,
//     h: 75,
//     img: "./kitten.png",
//     id: "kitten",
//     item: null,
//     render: function () {
//         this.item = addImage(this.x, this.y, this.w, this.h, this.img, this.id);
//     },
//     kill: function () {
//         document.getElementById(this.id).remove();
//         let c = confirm("You died! WOuld you like to continue?");
//         if (c)
//             loadLevel(this.currentLevel);
//     },
//     currentLevel: null
// }

// function loadLevel(level) {
//     if (level == null)
//         level = Level1;
//     level.load();

//     choice = "";
//     // while (choice == null || (choice !== "A" && choice !== "B" && choice !== "E"))
//     //     choice = prompt(level.instructions);

//     if (choice[0] == "A")
//         Level1.A();

//     if (choice[0] == "B")
//         Level1.B();
// }

// function getElement(name){
//     return document.getElementById(name);
// }

// const Level1 = {
//     instructions: "Press A to Jump!",
//     load: function () {
//         character.render();
//         let wolf = addImage(WIDTH / 2, HEIGHT - 75, 150, 75, "./wolf.png", "wolf");
//         move(character.x,character.y-250, wolf);
//     },
//     A: function () {
//     },

//     B: function () {

//     }
// }

// loadLevel(Level1);


