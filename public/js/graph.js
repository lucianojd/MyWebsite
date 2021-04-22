var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    backgroundColor: 0xffffff,
    scene: {
        preload: preload,
        update: update
    }
}

//Global variables.
var game = new Phaser.Game(config);
var nodes = [];
var edges = [];
var currentSelection;
var selectionQueue = [];

//Flags.
var commandFlag = 0;
var addNodeFlag = 1;
var deleteNodeFlag = 2;
var addEdgeFlag = 3;

function preload() {
    this.input.dragDistanceThreshold = 5;
    var ctrlKey =  this.input.keyboard.addKey('ctrl');
    this.input.on('pointerdown', function(pointer, GameObject) {
        if(selectionQueue.length > 0 && ctrlKey.isUp) {
            selectionQueue.forEach((item) => {
                item.deselect();
                selectionQueue = [];
            });
        }
        if (currentSelection != undefined) {
            currentSelection.deselect();
            currentSelection = null;
        }
        if (GameObject[0] != undefined) {
            if (ctrlKey.isDown) {
                selectionQueue[selectionQueue.length] = GameObject[0];
                GameObject[0].select();
            } else {
                currentSelection = GameObject[0];
                currentSelection.select();
            }    
        }
    });
}

function update() {
    switch (commandFlag) {
        case addNodeFlag:
            addNode(this);
            break;
        case addEdgeFlag:
            addEdge(this);
            break;
        case deleteNodeFlag:
            deleteNode();
            break;
        default:
            break;
    }
    commandFlag = 0;
}

function addNode(scene) {
    nodes[nodes.length] = new Node(scene, nodes.length);
}

function deleteNode() {
    if(currentSelection != null && currentSelection != undefined) {
        nodes.splice(currentSelection.id(), 1);

        //Remove node from canvas.
        currentSelection.destroy();
        currentSelection = null;
    }
}

function addEdge(scene) {
    let length = selectionQueue.length
    let e = null;
    for (let i = 0; i < selectionQueue.length-1; i++) {
        let e = new Edge(scene, selectionQueue[i], selectionQueue[i+1]);
        edges[edges.length] = e;
        selectionQueue[i].addEdge(e);
        selectionQueue[i+1].addEdge(e);
    }
}

function setAddNodeFlag() {
    commandFlag = addNodeFlag;
}

function setDeleteNodeFlag() {
    commandFlag = deleteNodeFlag;
}

function setAddEdgeFlag() {
    commandFlag = addEdgeFlag;
}
