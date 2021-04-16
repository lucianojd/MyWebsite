class NodeGraphics extends Phaser.GameObjects.Arc {
    constructor(scene, x, y, radius, fillColor, fillAlpha) {
        super(scene, x, y, radius, 0, 360, false, fillColor, fillAlpha);
        var node = scene.add.existing(this);
        node.setInteractive({ draggable: true })
            .on('dragstart', function(pointer, dragX, dragY){})
            .on('drag', function(pointer, dragX, dragY){
                node.setPosition(dragX, dragY);
            })
            .on('dragend', function(pointer, dragX, dragY, dropped){});
    }
}

class Node {
    constructor(scene, id) {
        this.graphics = new NodeGraphics(scene, 400, 400, 20, 0x550055, 1);
        this.id = id;
    }
}