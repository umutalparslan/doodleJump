var doodlerSize = 60;
var doodlerX;
var doodlerY;
var doodlerVelocity;
var doodlerXSpeed = 5;
var platformWidth = 85;
var platformHeight = 15;
var numOfPlatforms = 5;
var platformList = [];
var platYChange = 0;
var gameStarted;
var score = 0;
var doodlerLeftImg;
var doodlerRightImg;
var platformImg;
var backgroundImg;
var finishScreenBGImg;
var gameOver = false;
let copyButton;
let xButton;

// ===========================
//  Preload the Image Sprites
// ===========================
function preload() {

    backgroundImg = loadImage("https://yt3.googleusercontent.com/BI-cbJAWqwKeyrYOOFDy3sPKdO-IVrqC8q4BL6Jxf8cHemCV3Jh1pXym-RNBopgr2k1Ov7JlGog=s900-c-k-c0x00ffffff-no-rj");
    finishScreenBGImg = loadImage("https://floimages.mncdn.com/media/catalog/product/img/banners/23-07/28/reen-c-ok-arananlar-1200x160.jpg.webp");
    doodlerLeftImg = loadImage("https://raw.githubusercontent.com/JasonMize/coding-league-assets/master/doodle-jump-doodler.png");
    doodlerRightImg = loadImage("https://raw.githubusercontent.com/JasonMize/coding-league-assets/master/doodle-jump-doodler-right.png");
    platformImg = loadImage("https://raw.githubusercontent.com/JasonMize/coding-league-assets/master/doodle-jump-platform.png");
}

// ===========================
//  Controllers
// ===========================
function setup() {
    createCanvas(400, 600);
    frameRate(60);
    gameStarted = false;
}

function draw() {
    background(247, 239, 231);
    image(backgroundImg, 0, 0, 400, 600);
    if (gameStarted == true && gameOver == false) {
        //Set up and draw the game
        drawPlatforms();
        drawDoodler();
        checkCollision();
        moveDoodler();
        moveScreen();
        fill(0);
        textAlign(RIGHT);
        textSize(20);
        text("Score: " + score, width - 5, 55);
        xButton = createButton('X');
        xButton.mouseClicked(() => close());
        xButton.position((width - 25), 5);
        xButton.style('background-color', 'rgba(0,0,0,0)');
        xButton.style('border', '0');
        xButton.style('color', '#000');
        xButton.style('font-size', '20px');
    } else {
        // Start menu
        textAlign(CENTER);
        fill(0);
        if (!gameOver) {
            textSize(60);
            text("Start", width / 2, height / 2);
        }

        if (gameOver) {
            image(finishScreenBGImg, 0, 0, 400, 600);
            textSize(60);
            text("Oyun Bitti", width / 2, 270);
            textSize(30);
            text("Score: " + score, width / 2, 325);
            if (score >= 0 && score < 10) {
                textSize(30);
                text("Kazanılan Kupon Kodu:", width / 2, 360);
                textSize(20);
                text("KOD-1", width / 2, 400);
            } else if (score > 10 && score < 20) {
                textSize(30);
                text("Kazanılan Kupon Kodu:", width / 2, 360);
                textSize(20);
                text("KOD-2", width / 2, 400);
            } else if (score > 20 && score < 30) {
                textSize(30);
                text("Kazanılan Kupon Kodu:", width / 2, 360);
                textSize(20);
                text("KOD-3", width / 2, 400);
            }
            copyButton = createButton('Kopyala');
            copyButton.mouseClicked(() => copyPromoCode('PROMOKOD123'));
            copyButton.position(width / 3, 430);
            copyButton.style('background-color', '#000');
            copyButton.style('color', '#fff');
            copyButton.style('padding', '15px 30px');
            copyButton.style('font-size', '20px');
            copyButton.style('border-radius', '10px');
            copyButton.style('border', '0px');
            copyButton.style('cursor', 'pointer');
            copyButton.style('z-index', '3');
            copyButton.style('font-weight', 'bolder');
            copyButton.style('font-family', '"Poiret One", sans-serif');
        }

    }
}

function moveScreen() {
    if (doodlerY < 250) {
        platYChange = 3;
        doodlerVelocity += 0.25;
    } else {
        platYChange = 0;
    }
}

// Start Game
function mousePressed() {
    if (gameStarted == false && gameOver == false) {
        score = 0;
        setupPlatforms();
        doodlerY = 350;
        doodlerX = platformList[platformList.length - 1].xPos + 15;
        doodlerVelocity = 0.1;
        gameStarted = true;
    }
}

// ===========================
//  Doodler
// ===========================
function drawDoodler() {
    fill(204, 200, 52);
    image(doodlerLeftImg, doodlerX, doodlerY, doodlerSize, doodlerSize);
}

function moveDoodler() {
    // doodler falls with gravity
    doodlerVelocity += 0.2;
    doodlerY += doodlerVelocity;

    if (keyIsDown(LEFT_ARROW)) {
        doodlerX -= doodlerXSpeed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        doodlerX += doodlerXSpeed;
    }
}

// ===========================
//  Platforms
// ===========================
function setupPlatforms() {
    for (var i = 0; i < numOfPlatforms; i++) {
        var platGap = height / numOfPlatforms;
        var newPlatformYPosition = i * platGap;
        var plat = new Platform(newPlatformYPosition);
        platformList.push(plat);
    }
}

function drawPlatforms() {
    fill(106, 186, 40);
    platformList.forEach(function(plat) {
        // move all platforms down
        plat.yPos += platYChange;
        image(platformImg, plat.xPos, plat.yPos, plat.width, plat.height);

        if (plat.yPos > 600) {
            score++;
            platformList.pop();
            var newPlat = new Platform(0);
            platformList.unshift(newPlat); // add to front
        }
    });
}

function Platform(newPlatformYPosition) {
    this.xPos = random(15, 300);
    this.yPos = newPlatformYPosition;
    this.width = platformWidth;
    this.height = platformHeight;
}

// ===========================
//  Collisions
// ===========================
function checkCollision() {
    platformList.forEach(function(plat) {
        if (
            doodlerX < plat.xPos + plat.width &&
            doodlerX + doodlerSize > plat.xPos &&
            doodlerY + doodlerSize < plat.yPos + plat.height &&
            doodlerY + doodlerSize > plat.yPos &&
            doodlerVelocity > 0
        ) {
            doodlerVelocity = -10;
        }
    });
    if (score == 30 || doodlerY > height) {
        gameStarted = false;
        platformList = [];
        gameOver = true;
    }

    // screen wraps from left to right
    if (doodlerX < -doodlerSize) {
        doodlerX = width;
    } else if (doodlerX > width) {
        doodlerX = -doodlerSize;
    }
}

function copyPromoCode(promoCode) {
    if (window.Android) {
        window.Android.copyToClipboard(CODE, "");
    } else if (window.webkit.messageHandlers.eventHandler) {
        const args = {
            method: 'copyToClipboard',
            couponCode: CODE,
        };
        window.webkit.messageHandlers.eventHandler.postMessage(args);
    }
}

function close() {
    console.log("kapandı");
}
