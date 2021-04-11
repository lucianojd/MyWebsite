var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    backgroundColor: 0xffffff,
    scene: {
        preload: preload,
        create: create, 
        update: update 
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: "false"
        }
    }
}

var game = new Phaser.Game(config);
var nodes = [];

function preload() {
    this.add.renderTexture(0,0,800,800);
}

function create() {
    this.add.circle(200,200,40,0x1111ff);
}

function update() {
}