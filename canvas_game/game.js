let img_player = new Image();
let img_enemy = new Image();
let img_stone = new Image();

img_player.src = "img/face-monkey.png";
img_enemy.src = "img/face-devilish.png";
img_stone.src = "img/face-cool.png";

let game = {
    canvas: document.getElementById("field"),
    start() {
        console.log(this.canvas);
        this.context = this.canvas.getContext("2d");
        this.clear();
        this.interval = setInterval(redraw, 20);
        this.intervalNewEnemy = setInterval(newEnemy, 600);
        this.intervalNewStone = setInterval(newStone, 1000);
        this.player = new sprite(30, 30, "player", 10, 120);
        this.enemies = [];
        this.stones = [];
        this.highscore = 0;
        this.playtime = 0;
        this.intervalPlaytime = setInterval(playtimeInterval, 1000);
        this.keyCode = -1; //when there is no key pressed
        window.addEventListener('keydown', (e) => {
            this.keyCode = e.keyCode;
        });

        window.addEventListener('keyup', (e) => {
            this.keyCode = -1;
        });
    },
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function start() {
    console.log("Game started");
    game.start();

}


function sprite(width, height, type, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    ctx = game.context;

    this.redraw = function () {
        ctx = game.context;
        if (type == "player") {
            ctx.drawImage(img_player, this.x, this.y, this.width, this.height);
        } else if (type == "enemy") {
            ctx.drawImage(img_enemy, this.x, this.y, this.width, this.height);
        } else if (type == "stone") {
            ctx.drawImage(img_stone, this.x, this.y, this.width, this.height);
        }
    }
}

function redraw() {
    game.clear();
    switch (game.keyCode) {
        case 37: //left
            game.player.x -= 5;
            break;
        case 38: //up
            game.player.y -= 5;
            break;
        case 39: //right
            game.player.x += 5;
            break;
        case 40: //down
            game.player.y += 5;
            break;
    }

    game.player.redraw();


    game.enemies.forEach((e) => {
        console.log(e)
        if (game.player.x < e.x + e.width && game.player.x + game.player.width > e.x && game.player.y < e.y + e.height && game.player.y + game.player.height > e.y) {
            clearInterval(game.interval);
            clearInterval(game.intervalNewEnemy);
            clearInterval(game.intervalNewStone);
            clearInterval(game.intervalPlaytime);
            console.log("Game Over");
            alert("Game Over! Your highscore: " + game.highscore);
        }
        let yDelta = Math.floor(Math.random() * 11) - 5;
        e.x -= 1;
        e.y += yDelta;
        e.redraw();
    })

    game.stones.forEach((s) => {
        console.log(s)
        if (game.player.x < s.x + s.width && game.player.x + game.player.width > s.x && game.player.y < s.y + s.height && game.player.y + game.player.height > s.y) {
            game.highscore += 5;
            game.stones = game.stones.filter(stone => stone !== s);
        }
        let yDelta = Math.floor(Math.random() * 11) - 5;
        s.x -= 1;
        s.y += yDelta;
        s.redraw();
    })

    ctx = game.context;
    ctx.font = "20px Arial";
    ctx.strokeText("Highscore: " + game.highscore, 10, 20);
    ctx.strokeText("Playtime: " + game.playtime, 10, 40);
}

function newEnemy() {
    let y = Math.floor(Math.random() * 1024);
    e = new sprite(30, 30, "enemy", 1000, y);
    game.enemies.push(e);

}

function newStone() {
    let y = Math.floor(Math.random() * 1024);
    s = new sprite(30, 30, "stone", 1000, y);
    game.stones.push(s);
}

function playtimeInterval() {
    game.playtime++;
    if (game.playtime % 10 == 0) {
        game.highscore++;
    }
}