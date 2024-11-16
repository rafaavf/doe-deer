class Tasks {
    constructor() {
        this.lastTask = null;
        this.dialogcount = 0
    }

    task() {
        if (state.task !== this.lastTask) {
            this.runTaskSetup();
            this.lastTask = state.task;
        }
    }

    taskDraw() {
        if (state.task === 'fridge') {
            this.fridgeTaskDraw();
        }

        if (state.task === 'beforeprepare') {
            this.beforePrepareTaskDraw();
            uniFunc.dialogProgress(dialogs_2);
        }

        if (state.task === 'baking') {
            uniFunc.dialogProgress(dialogs_3)
            this.bakingDraw()
        }

        if(state.task === 'baked'){
            uniFunc.dialogProgress(dialogs_4);
            this.bakedDraw()
        }

        if(state.task === 'end'){
            uniFunc.dialogProgress(dialogs_5);
            this.end()
        }
    }

    runTaskSetup() {
        if (state.task === 'fridge') {
            this.setupFridgeTask();
        }

        if (state.task === 'beforeprepare') {
            state.dialog.isDialog = true;
            state.dialog.currentDialogIndex = 0;
            uniFunc.dialog(dialogs_2[0].text, dialogs_2[0].name);

            this.setupBeforePrepareTask();
        }

        if (state.task === 'duringprepare') {
            this.prepareCakeSetup();
        }

        if (state.task === 'baking') {
            state.dialog.isDialog = true;
            state.dialog.currentDialogIndex = 0;
            uniFunc.dialog(dialogs_3[0].text, dialogs_3[0].name);
            this.baking();
        }

        if (state.task === 'baked'){
            state.dialog.isDialog = true;
            state.dialog.currentDialogIndex = 0;
            uniFunc.dialog(dialogs_4[0].text, dialogs_4[0].name)

            this.baked()
        }

        if(state.task === 'end'){
            state.dialog.isDialog = true;
            state.dialog.currentDialogIndex = 0;
            uniFunc.dialog(dialogs_5[0].text, dialogs_5[0].name)
        }
    }

    setupFridgeTask() {
        this.fridgeCollider = createSprite(454, 180, 60, 100);
        this.fridgeCollider.visible = false;
    }

    fridgeTaskDraw() {
        if (this.fridgeCollider && alice.sprite.overlap(this.fridgeCollider) && keyWentDown('E')) {
            state.task = 'beforeprepare';
        }
    }

    setupBeforePrepareTask() {
        this.ingredientsCollider = createSprite(300, 180, 100, 100);
        this.ingredientsCollider.visible = false;

        this.ingredientsAnimation = createSprite(300, 158, 50, 50);
        this.ingredientsAnimation.addAnimation("ingredients", tasksAnimations.ingredients);
        this.ingredientsAnimation.depth = 2;
        this.ingredientsAnimation.scale = 1.3;
    }

    beforePrepareTaskDraw() {
        if (this.ingredientsCollider && alice.sprite.overlap(this.ingredientsCollider) && keyWentDown('E')) {
            state.task = 'duringprepare';
        }
    }

    prepareCakeSetup() {
        this.bg = createSprite(300, 250, 700, 700);
        this.bg.shapeColor = 'black';

        this.clickedSprites = [];

        this.sprites = [];
        this.sprites.push(this.createInteractiveSprite(100, 220, tasksAnimations.milk, "milk"));
        this.sprites.push(this.createInteractiveSprite(180, 220, tasksAnimations.sugar, "sugar"));
        this.sprites.push(this.createInteractiveSprite(260, 220, tasksAnimations.egg, "egg"));
        this.sprites.push(this.createInteractiveSprite(340, 220, tasksAnimations.egg, "egg"));
        this.sprites.push(this.createInteractiveSprite(420, 220, tasksAnimations.flour, "flour"));
        this.sprites.push(this.createInteractiveSprite(500, 220, tasksAnimations.butter, "butter"));

        this.bow = createSprite(300, 330);
        this.bow.addAnimation('bow', tasksAnimations.bow);
        this.bow.addAnimation('bow2', tasksAnimations.bow2);
        this.bow.addAnimation('bow3', tasksAnimations.bow3);
        this.bow.changeAnimation('bow');
        this.bow.scale = 2
    }

    createInteractiveSprite(x, y, animation, name) {
        let sprite = createSprite(x, y, 100, 180);
        sprite.addAnimation(name, animation);
        sprite.scale = 2;

        sprite.onMousePressed = () => {
            if (!this.clickedSprites.includes(sprite)) {
                this.clickedSprites.push(sprite);
                //console.log(`${name} clicked`);
                sprite.visible = false;

                if (this.clickedSprites.length === this.sprites.length) {
                    this.bg.remove();
                    this.bow.remove();
                    this.ingredientsAnimation.remove();

                    state.task = 'baking';
                }

                if (this.clickedSprites.length >= 3) {
                    this.bow.changeAnimation('bow2')

                } else if (this.clickedSprites.length > 0) {
                    this.bow.changeAnimation('bow3')
                }
            }
        };
        return sprite;
    }

    baking() {

        this.stoveCollider = createSprite(150, 200, 60, 60);
        this.stoveCollider.visible = false;

        this.bowAnimation = createSprite(300, 162);
        this.bowAnimation.addAnimation('bow', tasksAnimations.bowAnimation);
        this.bowAnimation.scale = 1.3;
        this.bowAnimation.depth = 2;

    }

    bakingDraw() {

        if (alice.sprite.overlap(this.stoveCollider) && keyWentDown('E')) {
            if (!state.setTimeout) {
                state.setTimeout = true;
                this.bowAnimation.remove();
                console.log('djfka')
                setTimeout(() => {
                    console.log('settimeout')
                    state.task = 'baked'
                    state.setTimeout = false;
                }, 10000)
            }
        }

    }

    baked() {
        this.tableCollider = createSprite(300,315,190,70);
        this.tableCollider.visible = false;

        this.cake = createSprite(300,300);
        this.cake.addAnimation('cake', tasksAnimations.cake);
        this.cake.visible = false;
        this.cake.scale = 1.3; 
    }

    bakedDraw(){
        if (alice.sprite.overlap(this.tableCollider) && keyWentDown('E')){
            this.cake.visible = true;
            state.task = 'end'
            state.dialog.isDialog = true;
        }
    }

    end(){
        if (!state.dialog.isDialog){
            window.close();
        }
    }

}
