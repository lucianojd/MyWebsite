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
var currentSelection;

//Flags.
var addNodeFlag = false;
var deleteNodeFlag = false;

function preload() {
    this.input.dragDistanceThreshold = 5;
    this.input.on('pointerdown', function(pointer, GameObject) {
        if (currentSelection != undefined) {
            currentSelection.deselect();
            currentSelection = null;
        }
        if (GameObject[0] != undefined) {
            currentSelection = GameObject[0];
            currentSelection.select();
        }
    });
}

function create() {
    
}

function update() {
    if (addNodeFlag) {
        nodes[nodes.length] = new Node(this, nodes.length);
        addNodeFlag = false;
    }
    if (deleteNodeFlag && currentSelection != undefined && currentSelection != null) {
        //Remove node from list.
        nodes.splice(currentSelection.id(), 1);

        //Remove node from canvas.
        currentSelection.destroy();
        currentSelection = null;
        deleteNodeFlag = false;
    } else if(deleteNodeFlag) {
        deleteNodeFlag = false;
    }
}

function addNode() {
    addNodeFlag = true;
}

function deleteNode() {
    deleteNodeFlag = true;
}

function addEdge() {
    newEdge = true;
}
