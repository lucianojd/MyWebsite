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
                this.edgeList.forEach((e) => {
                    e.adjustEndpoints();
                });
            })
            .on('dragend', function(pointer, dragX, dragY, dropped){
            });

        scene.add.existing(this);
    }

    addEdge(e) {
        this.edgeList[this.edgeList.length] = e;
    }

    id() {
        return this.nodeId;
    }

    X() {
        return this.x;
    }

    Y() {
        return this.y;
    }

    R() {
        return this.radius;
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
    constructor(scene, node1, node2) {
        console.log(node1);
        let x1 = node1.X();
        let y1 = node1.Y();

        let x2 = node2.X();
        let y2 = node2.Y();

        let lineWidth = 1;

        let x = Math.abs(x1-x2)/2;
        let y = Math.abs(y1-y2)/2;

        super(scene, x, y, x1, y1, x2, y2, 0x000000);
        this.node1 = node1;
        this.node2 = node2;

        this.setInteractive();
        this.setLineWidth(lineWidth);
        scene.add.existing(this);
    }

    adjustEndpoints() {
        let x1 = this.node1.X();
        let y1 = this.node1.Y();

        let x2 = this.node2.X();
        let y2 = this.node2.Y();

        this.setTo(x1, y1, x2, y2);
    }

    select() {
    }

    deselect() {
    }
}


