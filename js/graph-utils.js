class Node extends Phaser.GameObjects.Arc {
    constructor(scene, nodeId) {
        let width = scene.scale.width/2;
        let height = scene.scale.height/2;
        let radius = 20;
        let fillColor = 0xffffff;
        let fillAlpha = 1;

        super(scene, width, height, radius, 0, 360, false, fillColor, fillAlpha);

        this.nodeId = nodeId;
        this.edgeList = [];

        this.setStrokeStyle(2, 0x000000, 1);
        this.setInteractive({ draggable: true })
            .on('dragstart', function(pointer, dragX, dragY){
                this.select();
            })
            .on('drag', function(pointer, dragX, dragY){
                this.setPosition(dragX, dragY);
            })
            .on('dragend', function(pointer, dragX, dragY, dropped){
            });

        scene.add.existing(this);
    }

    id() {
        return this.nodeId;
    }

    select() {
        this.setStrokeStyle(5, 0x000000, 1);
        return this;
    }

    deselect() {
        this.setStrokeStyle(2, 0x000000, 1);
        return this;
    }
}

class Edge extends Phaser.GameObjects.Line {

}