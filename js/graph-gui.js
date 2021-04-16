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
}

var game = new Phaser.Game(config);
var nodes = [];

//Flags.
var newNode = false;

function preload() {

}

function create() {
    
}

function update() {
    if (newNode){
        nodes.concat(new Node(this, nodes.length));
        newNode = false;
    }
}

function addNode() {
    newNode = true;
}
