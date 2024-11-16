var state = {
    gamestate: 'start',
    isWalking: false,
    lastDirection: 'd',
    dialog: {
        isDialog: false,
        currentDialogIndex: undefined,
        dialogCompleted: false
    },
    task: 'fridge',
    lastTask: null,
    setTimeout: false
}

var alice = {
    sprite: undefined,
    animation: {
        right: undefined,
        left: undefined,
        up: undefined,
        down: undefined,
        idle_u: undefined,
        idle_d: undefined,
        idle_l: undefined,
        idle_r: undefined
    },
    item: null
}

var fonts = {
    pixelatedDisplay: undefined,
    sfPixelated: undefined
}

var map = {
    animation: undefined,
    sprite: undefined,
}

var table = {
    animation: undefined,
    sprite: undefined
}

var tasksAnimations = {
    ingredients: undefined,
    milk: undefined,
    sugar: undefined,
    butter: undefined,
    flour: undefined,
    egg: undefined,
    bow: undefined,
    bow1: undefined,
    bow2: undefined,
    bow3: undefined,
    bowAnimation: undefined,
    cake: undefined
}

function preload() {
    alice.animation.right = loadAnimation('./assets/images/animations/alice_r1.png', './assets/images/animations/alice_r2.png', './assets/images/animations/alice_r3.png', './assets/images/animations/alice_r2.png', './assets/images/animations/alice_r4.png', './assets/images/animations/alice_r5.png', './assets/images/animations/alice_r4.png');
    alice.animation.left = loadAnimation('./assets/images/animations/alice_l1.png', './assets/images/animations/alice_l2.png', './assets/images/animations/alice_l3.png', './assets/images/animations/alice_l2.png', './assets/images/animations/alice_l4.png', './assets/images/animations/alice_l5.png', './assets/images/animations/alice_l4.png');
    alice.animation.up = loadAnimation('./assets/images/animations/alice_u1.png', './assets/images/animations/alice_u2.png', './assets/images/animations/alice_u3.png', './assets/images/animations/alice_u2.png', './assets/images/animations/alice_u4.png', './assets/images/animations/alice_u5.png', './assets/images/animations/alice_u4.png');
    alice.animation.down = loadAnimation('./assets/images/animations/alice_d1.png', './assets/images/animations/alice_d2.png', './assets/images/animations/alice_d3.png', './assets/images/animations/alice_d2.png', './assets/images/animations/alice_d4.png', './assets/images/animations/alice_d5.png', './assets/images/animations/alice_d4.png');

    alice.animation.idle_u = loadAnimation('./assets/images/animations/alice_u1.png');
    alice.animation.idle_d = loadAnimation('./assets/images/animations/alice_d1.png');
    alice.animation.idle_l = loadAnimation('./assets/images/animations/alice_l1.png');
    alice.animation.idle_r = loadAnimation('./assets/images/animations/alice_r1.png');

    map.animation = loadAnimation('./assets/images/map.png');
    table.animation = loadAnimation('./assets/images/table.png');

    tasksAnimations.ingredients = loadAnimation('./assets/images/ingredients.png');

    tasksAnimations.milk = loadAnimation('./assets/images/milk.png');
    tasksAnimations.egg = loadAnimation('./assets/images/egg.png');
    tasksAnimations.butter = loadAnimation('./assets/images/butter.png');
    tasksAnimations.sugar = loadAnimation('./assets/images/sugar.png');
    tasksAnimations.flour = loadAnimation('./assets/images/flour.png')
    tasksAnimations.bow = loadAnimation('./assets/images/bow.png');
    tasksAnimations.bow2 = loadAnimation('./assets/images/bow2.png');
    tasksAnimations.bow3 = loadAnimation('./assets/images/bow3.png');
    tasksAnimations.bowAnimation = loadAnimation('./assets/images/bowAnimation.png');
    tasksAnimations.cake = loadAnimation('./assets/images/cake.png')

    fonts.pixelatedDisplay = loadFont('./assets/fonts/pixelated_display/PixelatedDisplay.ttf');
    fonts.sfPixelated = loadFont('./assets/fonts/sf_pixelate/SF Pixelate.ttf');

}

function setup() {
    createCanvas(620, 560);

    uniFunc = new UniversalFunc
    tasks = new Tasks

    camera.on()

    if (state.gamestate === 'start') {
        frameRate(27);

        uniFunc.map()
        uniFunc.alice(190, 220);
        uniFunc.adjustTableAliceDepth();

        state.dialog.isDialog = true;
        state.dialog.currentDialogIndex = 0;
        uniFunc.dialog(dialogs_1[0].text, dialogs_1[0].name);

    } else if (state.gamestate === 'walkaround') {
        frameRate(27);

        uniFunc.map();
        uniFunc.colliders();
        uniFunc.alice(120, 180);
    }

}

function draw() {
    background(220);

    if (state.gamestate === 'start') {

        alice.sprite.changeAnimation("idle_d");

        if (state.dialog.dialogCompleted) {
            state.dialog.dialogCompleted = false;
            state.gamestate = 'walkaround';
        };

        drawSprites();
        uniFunc.drawDialog(uniFunc.dialogText);
        uniFunc.dialogProgress(dialogs_1);

    } else if (state.gamestate === 'walkaround') {
        if (!state.dialog.isDialog && state.task != 'duringprepare') {
            uniFunc.walk(alice);
        }


        uniFunc.adjustTableAliceDepth();
        uniFunc.aliceCollide();

        if (state.lastTask != state.task) {
            tasks.task();
            tasks.taskDraw();

            lastTask = state.task;
        }

        drawSprites();

        if(state.dialog.isDialog){
            uniFunc.drawDialog(uniFunc.dialogText);
            
        }

    }
}