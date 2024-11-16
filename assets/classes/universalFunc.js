class UniversalFunc {
    constructor() {}

    //================================== ## DIALOG FUNCTIONS ## ==================================


    dialog(string, name) {
        if (!this.boxStroke) {
            this.boxStroke = createSprite(310, 480, 606, 146);
            this.boxStroke.shapeColor = color(255, 255, 255);
        }

        if (!this.box) {
            this.box = createSprite(310, 480, 600, 140);
            this.box.shapeColor = color(0, 0, 0);
        }

        if(!this.picturebg){
            this.picturebg = createSprite(80, 480, 120, 120);
            this.picturebg.shapeColor = 'white';
        }

        if (!this.picture) {
            this.picture = createSprite(80, 480, 120, 120);
            this.picture.addAnimation('alice',alice.animation.idle_d);
            this.picture.scale = 1.5;
        }

        this.dialogText = {
            name: name,
            string: string,
            formatted: string.match(/[\s\S]{1,60}(?!\S)/g),
        };

        this.boxStroke.visible = true;
        this.box.visible = true;
        this.picture.visible = true;
        this.picturebg.visible = true;
    }

    drawDialog(dialogText) {
        if (dialogText) {

            textFont(fonts.pixelatedDisplay);
            textSize(18);
            fill(255);
            text(dialogText.name, 150, 440);

            textFont(fonts.sfPixelated);
            textSize(12);
            let t = dialogText.formatted;
            for (let i = 0; i < t.length; i++) {
                text(t[i].trim(), 150, 460 + (16 * i));
            }

            text('> Press E to continue', 430, 540);
        }
    }

    clearDialog() {
        if (this.boxStroke) this.boxStroke.visible = false;
        if (this.box) this.box.visible = false;
        if (this.picture) this.picture.visible = false;
        if (this.picturebg) this.picturebg.visible = false;

        this.dialogText = null;
    }

    destroyDialogSprites() {
        if (this.boxStroke) {
            this.boxStroke.remove();
            this.boxStroke = null;
        }
        if (this.box) {
            this.box.remove();
            this.box = null;
        }
        if (this.picture) {
            this.picture.remove();
            this.picture = null;
        }
        if(this.picturebg){
            this.picturebg.remove();
            this.picturebg = null;
        }

        this.dialogText = null;
    }

    dialogProgress(dialogs) {
        if (state.dialog.isDialog && keyWentDown('e')) {
            if (state.dialog.currentDialogIndex < dialogs.length - 1) {
                state.dialog.currentDialogIndex++;
                let currentDialog = dialogs[state.dialog.currentDialogIndex];
                this.dialog(currentDialog.text, currentDialog.name);
            } else {
                state.dialog.isDialog = false;
                this.clearDialog();
                state.dialog.dialogCompleted = true;
            }
        }
    }

    //================================== ## WALK FUNCTION ## ==================================

    walk(entity) {
        if (!state.isWalking) {
            entity.sprite.changeAnimation(`idle_${state.lastDirection}`);
        } else {
            entity.sprite.changeAnimation(state.isWalking);
        }

        if (keyDown("w")) {
            state.isWalking = 'up';
            state.lastDirection = 'u';
            entity.sprite.position.y -= 6.5;
        } else if (keyDown("a")) {
            state.isWalking = 'left';
            state.lastDirection = 'l';
            entity.sprite.position.x -= 6.5;
        } else if (keyDown("s")) {
            state.isWalking = 'down';
            state.lastDirection = 'd';
            entity.sprite.position.y += 6.5;
        } else if (keyDown("d")) {
            state.isWalking = 'right';
            state.lastDirection = 'r';
            entity.sprite.position.x += 6.5;
        } else {
            state.isWalking = false;
        }
    }

    //================================== ## MAP RENDERING ## ==================================

    map() {
        var bg = createSprite(300, 250, 700, 700);
        bg.shapeColor = "black";

        map.sprite = createSprite(300, 250, 200, 200);
        map.sprite.addAnimation("map", map.animation);
        map.sprite.scale = 1.3
        map.sprite.depth = 1;

    }

    adjustTableAliceDepth() {

        if (table.sprite) {
            table.sprite.visible = false;
        }

        table.sprite = createSprite(300, 330, 200, 150);

        if (alice.sprite && table.sprite) {
            if (alice.sprite.position.y < table.sprite.position.y) {
                table.sprite.depth = 4;
            } else {
                table.sprite.depth = 2;
            }
        }

        table.sprite.addAnimation("table", table.animation);
        table.sprite.scale = 1.3;
    }

    colliders() {
        this.cGroup = new Group();

        var c1 = createSprite(300, 140, 380, 30);
        this.cGroup.add(c1);

        var c2 = createSprite(103, 250, 30, 450);
        this.cGroup.add(c2);

        var c3 = createSprite(497, 250, 30, 450);
        this.cGroup.add(c3);

        var c4 = createSprite(300, 481, 380, 30);
        this.cGroup.add(c4);

        var c5 = createSprite(300, 315, 191, 30);
        this.cGroup.add(c5);

        this.cGroup.forEach(sprite => sprite.visible = false);
    }

    aliceCollide() {
        if (!this.cGroup) {
            console.warn("cGroup is not defined. Initializing colliders.");
            this.colliders();
        }
        alice.sprite.collide(this.cGroup);
    }



    alice(x, y) {
        alice.sprite = createSprite(x, y, 100, 100);
        alice.sprite.scale = 1.4;
        alice.sprite.depth = 3;
        // alice.sprite.debug = true;
        alice.sprite.setCollider("rectangle", 0, 0, 40, 60);

        alice.sprite.addAnimation("right", alice.animation.right);
        alice.sprite.addAnimation("left", alice.animation.left);
        alice.sprite.addAnimation("down", alice.animation.down);
        alice.sprite.addAnimation("up", alice.animation.up);

        alice.sprite.addAnimation("idle_u", alice.animation.idle_u);
        alice.sprite.addAnimation("idle_d", alice.animation.idle_d);
        alice.sprite.addAnimation("idle_l", alice.animation.idle_l);
        alice.sprite.addAnimation("idle_r", alice.animation.idle_r);
    }

}