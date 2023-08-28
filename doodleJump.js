function doodleJump(config) {
    this.config = config;
    var extendedProps = JSON.parse(decodeURIComponent(this.config.actiondata.ExtendedProps));
    function createGameCSS() {
        const css = `canvas {
            border: 1px solid black;
            width: 100vw;
            height: 100vh;
        }`;
        const styleElement = document.createElement("style");
        styleElement.innerHTML = css;


        const headElement = document.head || document.getElementsByTagName("head")[0];
        headElement.appendChild(styleElement);
    }

    
    if (this.config.actiondata.mail_subscription) {
        createMailSubsScreen();
    } else {
        createGameRule();
    }

    function createGameElements() {
        createGameCSS();
        const platformImage = new Image();
platformImage.src = 'https://raw.githubusercontent.com/JasonMize/coding-league-assets/master/doodle-jump-platform.png';

const doodleImage = new Image();
doodleImage.src = 'https://raw.githubusercontent.com/JasonMize/coding-league-assets/master/doodle-jump-doodler-right.png';

const canvas = document.getElementById('game');
canvas.width = document.body.clientWidth; //document.width is obsolete
canvas.height = document.body.clientHeight; //document.height is obsolete
const context = canvas.getContext('2d');
document.getElementById('game').style.backgroundImage = "url('https://i.pinimg.com/736x/0a/40/bf/0a40bfa373ce7d545ddcedc96ccb1184.jpg')";
document.getElementById('game').style.backgroundSize = "cover";
document.getElementById('game').style.backgroundRepeat = "no-repeat";

let score = 0;
let lastPlatform = null;
let isGameOver = false;
let isFirst = true;


// width and height of each platform and where platforms start
const platformWidth = 85;
const platformHeight = 20;
const platformStart = canvas.height - 50;

// player physics
const gravity = 0.33;
const drag = 0.3;
const bounceVelocity = -12.5;

// minimum and maximum vertical space between each platform
let minPlatformSpace = 1;
let maxPlatformSpace = 100;

// information about each platform. the first platform starts in the
// bottom middle of the screen
let platforms = [{
    x: canvas.width / 2 - platformWidth / 2,
    y: platformStart
}];

// get a random number between the min (inclusive) and max (exclusive)
function random(min, max) {
    return Math.random() * (max - min) + min;
}

// fill the initial screen with platforms
let y = platformStart;
while (y > 0) {

    // the next platform can be placed above the previous one with a space
    // somewhere between the min and max space
    y -= platformHeight + random(minPlatformSpace, maxPlatformSpace);

    // a platform can be placed anywhere 25px from the left edge of the canvas
    // and 25px from the right edge of the canvas (taking into account platform
    // width).
    // however the first few platforms cannot be placed in the center so
    // that the player will bounce up and down without going up the screen
    // until they are ready to move
    let x;
    do {
        x = random(25, canvas.width - 25 - platformWidth);
    } while (
        y > canvas.height / 2 &&
        x > canvas.width / 2 - platformWidth * 1.5 &&
        x < canvas.width / 2 + platformWidth / 2
    );

    platforms.push({
        x,
        y
    });
}

// the doodle jumper
const doodle = {
    width: 65,
    height: 67,
    x: canvas.width / 2 - 20,
    y: platformStart - 80,

    // velocity
    dx: 0,
    dy: 0
};

// keep track of player direction and actions
let playerDir = 0;
let keydown = false;
let prevDoodleY = doodle.y;

// game loop
function loop() {
    if (isGameOver) {
        context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        context.font = "30px Arial";
        context.fillText("Game Over Puanınız: " + score, canvas.width / 2 - 150, canvas.height / 2);

        return; // Stop the game loop if game is over
    }
    requestAnimationFrame(loop);
    context.clearRect(0, 0, canvas.width, canvas.height);

    // apply gravity to doodle
    doodle.dy += gravity;

    // if doodle reaches the middle of the screen, move the platforms down
    // instead of doodle up to make it look like doodle is going up
    if (doodle.y < canvas.height / 2 && doodle.dy < 0) {
        platforms.forEach(function(platform) {
            platform.y += -doodle.dy;
        });

        // add more platforms to the top of the screen as doodle moves up
        while (platforms[platforms.length - 1].y > 0) {
            platforms.push({
                x: random(25, canvas.width - 25 - platformWidth),
                y: platforms[platforms.length - 1].y - (platformHeight + random(minPlatformSpace, maxPlatformSpace))
            })

            // add a bit to the min/max platform space as the player goes up
            minPlatformSpace += 0.5;
            maxPlatformSpace += 0.5;

            // cap max space
            maxPlatformSpace = Math.min(maxPlatformSpace, canvas.height / 2);
        }
    } else {
        doodle.y += doodle.dy;
    }

    if (doodle.y > canvas.height) {
        if (score > 0 && score <= 10) {
            context.font = "30px Arial";
            context.fillText("Game Over Puanınız: " + score, canvas.width / 2 - 150, canvas.height / 2);
            createFinishScreen();
        } else if (score > 10 && score <= 20) {
            context.font = "30px Arial";
            context.fillText("Game Over Puanınız: " + score, canvas.width / 2 - 150, canvas.height / 2);
            createFinishScreen();
        } else if (score > 20 && score <= 30) {
            context.font = "30px Arial";
            context.fillText("Game Over Puanınız: " + score, canvas.width / 2 - 150, canvas.height / 2);
            createFinishScreen();
        } else if (score > 30 && score <= 40) {
            context.font = "30px Arial";
            context.fillText("Game Over Puanınız: " + score, canvas.width / 2 - 150, canvas.height / 2);
            createFinishScreen();
        } else if (score > 40 && score <= 50) {
            context.font = "30px Arial";
            context.fillText("Game Over Puanınız: " + score, canvas.width / 2 - 150, canvas.height / 2);
            createFinishScreen();
        } else if (score > 50 && score <= 60) {
            context.font = "30px Arial";
            context.fillText("Game Over Puanınız: " + score, canvas.width / 2 - 150, canvas.height / 2);
            createFinishScreen();
        } else if (score > 60 && score <= 70) {
            context.font = "30px Arial";
            context.fillText("Game Over Puanınız: " + score, canvas.width / 2 - 150, canvas.height / 2);
            createFinishScreen();
        } else if (score > 70 && score <= 80) {
            context.font = "30px Arial";
            context.fillText("Game Over Puanınız: " + score, canvas.width / 2 - 150, canvas.height / 2);
            createFinishScreen();
        } else if (score > 80 && score <= 90) {
            context.font = "30px Arial";
            context.fillText("Game Over Puanınız: " + score, canvas.width / 2 - 150, canvas.height / 2);
            createFinishScreen();
        } else if (score > 90 && score <= 100) {
            context.font = "30px Arial";
            context.fillText("Game Over Puanınız: " + score, canvas.width / 2 - 150, canvas.height / 2);
            createFinishScreen();
        }

        return; // Stop the game loop
    }

    context.font = "20px Arial";
    context.fillText("Score: " + score, canvas.width - 100, 30);

    // only apply drag to horizontal movement if key is not pressed
    if (!keydown) {
        if (playerDir < 0) {
            doodle.dx += drag;

            // don't let dx go above 0
            if (doodle.dx > 0) {
                doodle.dx = 0;
                playerDir = 0;
            }
        } else if (playerDir > 0) {
            doodle.dx -= drag;

            if (doodle.dx < 0) {
                doodle.dx = 0;
                playerDir = 0;
            }
        }
    }

    doodle.x += doodle.dx;

    // make doodle wrap the screen
    if (doodle.x + doodle.width < 0) {
        doodle.x = canvas.width;
    } else if (doodle.x > canvas.width) {
        doodle.x = -doodle.width;
    }

    // draw platforms

    platforms.forEach(function(platform) {

        context.drawImage(platformImage, platform.x, platform.y, platformWidth, platformHeight);
        
        // make doodle jump if it collides with a platform from above
        if (
            // doodle is falling
            doodle.dy > 0 &&

            // doodle was previous above the platform
            prevDoodleY + doodle.height <= platform.y &&

            // doodle collides with platform
            // (Axis Aligned Bounding Box [AABB] collision check)
            doodle.x < platform.x + platformWidth &&
            doodle.x + doodle.width > platform.x &&
            doodle.y < platform.y + platformHeight &&
            doodle.y + doodle.height > platform.y

        ) {
            // reset doodle position so it's on top of the platform
            doodle.y = platform.y - doodle.height;
            doodle.dy = bounceVelocity;

            if (lastPlatform !== platform) {
                if (score == 100) {
                    createFinishScreen();
                    isGameOver = true;
                    return;
                } else {
                    if (!isFirst) {
                        score++; // Increase score when doodle jumps on a new platform
                        lastPlatform = platform; // Update the last platform
                    } else {
                        isFirst = false;
                    }
                    
                }

            }
        }
    });

    context.drawImage(doodleImage, doodle.x, doodle.y, doodle.width, doodle.height);
    prevDoodleY = doodle.y;

    // draw doodle



    // remove any platforms that have gone offscreen
    platforms = platforms.filter(function(platform) {
        return platform.y < canvas.height;
    })
}

// listen to keyboard events to move doodle
document.addEventListener('keydown', function(e) {
    // left arrow key

    if (e.which === 37) {
        keydown = true;
        playerDir = -1;
        doodle.dx = -3;

    }

    // right arrow key
    else if (e.which === 39) {
        keydown = true;
        playerDir = 1;
        doodle.dx = 3;
    }
});

document.addEventListener('keyup', function(e) {
    keydown = false;
});

// start the game
requestAnimationFrame(loop);
    }

    function createMailSubsScreen() {
        var mailSubsScreen = document.createElement("DIV");
        mailSubsScreen.id = "mail-subs-screen";
        mailSubsScreen.style.height = "100vh";
        mailSubsScreen.style.width = "100vw";
        if (this.config.backgroundImage === "") {
            mailSubsScreen.style.backgroundColor = this.config.backgroundColor;
        } else {
            mailSubsScreen.style.backgroundImage = 'url(' + this.config.backgroundImage + ')';
        }
        mailSubsScreen.style.transition = "all 1s";
        mailSubsScreen.style.position = "absolute";
        mailSubsScreen.style.zIndex = "998";
        mailSubsScreen.style.display = "block";
        mailSubsScreen.style.top = "0";
        mailSubsScreen.style.left = "0";

        var container = document.createElement("DIV");
        container.id = "rmc-container";
        container.style.width = window.innerWidth <= 700 ? "80%" : "43%";
        container.style.height = "auto";
        container.style.position = "relative";
        container.style.transform = "translate(-50%, -50%)";
        container.style.top = "50%";
        container.style.left = "50%";
        container.style.textAlign = "center";

        if (this.config.actiondata.mail_subscription_form.title) {
            var title = document.createElement("DIV");
            title.id = "rmc-mail-subs-title";
            title.style.color = extendedProps.mail_subscription_form.title_text_color;
            title.style.fontSize = fontSizeCalculator(extendedProps.mail_subscription_form.title_text_size) + "px";
            title.style.display = "inline-block";
            title.style.width = "100%";
            title.style.margin = "15px 0";
            title.style.fontFamily = setFontFamily();

            title.innerText = this.config.actiondata.mail_subscription_form.title;
            container.appendChild(title);
        }

        if (this.config.actiondata.mail_subscription_form.message) {
            var message = document.createElement("DIV");
            message.id = "rmc-mail-subs-message";
            message.style.color = extendedProps.mail_subscription_form._text_color;
            message.style.fontSize = fontSizeCalculator(extendedProps.mail_subscription_form._text_size) + "px";
            message.style.display = "inline-block";
            message.style.width = "100%";
            message.style.margin = "15px 0";
            message.style.fontFamily = setFontFamily();

            message.innerText = this.config.actiondata.mail_subscription_form.message
            container.appendChild(message);
        }


        var input = document.createElement("INPUT");
        input.setAttribute("type", "email");
        input.setAttribute("placeholder", this.config.actiondata.mail_subscription_form.placeholder);
        input.id = "mail-subs-email";
        input.style.backgroundColor = "white";
        input.style.width = "100%";
        input.style.padding = "9px";
        input.style.border = "1px solid gray";
        input.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        input.style.borderRadius = "10px";
        input.style.maxWidth = "-webkit-fill-available";
        input.style.fontSize = "19px";
        input.style.fontWeight = "bold";
        input.style.margin = "15px 0";
        input.style.color = "gray";
        input.style.marginBottom = "12px";
        input.style.display = "inline-block";
        input.style.fontFamily = setFontFamily();
        container.appendChild(input);

        var emailAlert = document.createElement("div");
        emailAlert.id = 'emailAlert';
        container.appendChild(emailAlert);

        if (this.config.actiondata.mail_subscription_form.emailpermit_text) {
            var emailPermission = createPermitRow(
                "email-permit",
                this.config.actiondata.mail_subscription_form.emailpermit_text,
                fontSizeCalculator(extendedProps.mail_subscription_form.emailpermit_text_size) + "px",
                setFontFamily(),
                extendedProps.mail_subscription_form.emailpermit_text_url
            )

            container.appendChild(emailPermission);

            var checkboxAlert1 = document.createElement("div");
            checkboxAlert1.id = 'checkboxAlert1';
            container.appendChild(checkboxAlert1);

        }

        if (this.config.actiondata.mail_subscription_form.consent_text) {
            var secondPermission = createPermitRow(
                "consent-permit",
                this.config.actiondata.mail_subscription_form.consent_text,
                fontSizeCalculator(extendedProps.mail_subscription_form.consent_text_size) + "px",
                setFontFamily(),
                extendedProps.mail_subscription_form.consent_text_url
            )

            container.appendChild(secondPermission);

            var checkboxAlert2 = document.createElement("div");
            checkboxAlert2.id = 'checkboxAlert2';
            container.appendChild(checkboxAlert2);

            var successMessage = document.createElement("div");
            successMessage.id = 'successMessage';
            container.appendChild(successMessage);
        }

        var rmcCloseButton = document.createElement('button');
        rmcCloseButton.id = 'rmc-close-button';
        rmcCloseButton.style.position = 'absolute';
        rmcCloseButton.style.right = '0px';
        rmcCloseButton.style.top = '0px';
        rmcCloseButton.style.border = '0px';
        rmcCloseButton.style.color = window.config.closeButtonColor;
        rmcCloseButton.style.padding = '5px 10px';
        rmcCloseButton.style.cursor = 'pointer';
        rmcCloseButton.style.fontSize = '29px';
        rmcCloseButton.style.transition = 'all 1s ease 0s';
        rmcCloseButton.style.borderRadius = '10px';
        rmcCloseButton.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        rmcCloseButton.style.zIndex = '999';
        rmcCloseButton.style.transform = 'translate3d(0px, 0px, 3px)';
        rmcCloseButton.textContent = '✖';
        rmcCloseButton.addEventListener("click", function() {
            utils.close();
        }, false);


        var submit = document.createElement("button");
        submit.id = "email-permit-submit";
        submit.style.backgroundColor = extendedProps.mail_subscription_form.button_color;
        submit.style.color = extendedProps.mail_subscription_form.button_text_color;
        submit.style.padding = "15px 30px";
        submit.style.fontSize = fontSizeCalculator(extendedProps.mail_subscription_form.button_text_size) + "px";
        submit.style.borderRadius = "15px";
        submit.style.border = 0;
        submit.style.position = "fixed";
        submit.style.bottom = "70px";
        submit.style.left = "50%";
        submit.style.width = "fit-content";
        submit.style.transform = "translate(-50%, 0%)";
        submit.style.cursor = "pointer";
        submit.style.fontWeight = "bolder";
        submit.style.fontFamily = setFontFamily();
        submit.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        submit.innerText = this.config.actiondata.mail_subscription_form.button_label;

        submit.addEventListener("click", function() {
            if (emailChecker()) {
                removeAlert("emailAlert");
                if (emailPermitChecker()) {
                    removeAlert("checkboxAlert1");
                    if (secondPermitChecker()) {
                        removeAlert("checkboxAlert2");
                        utils.subscribe(document.querySelector("#mail-subs-email").value.toLowerCase());
                        EMAIL = document.querySelector("#mail-subs-email").value.toLowerCase();

                        if (document.querySelector("#mail-subs-screen")) {
                            createAlert(window.config.successMessage, "successMessage");
                            setTimeout(() => {
                                document.querySelector("#mail-subs-screen").remove();
                                createGameRule();
                            }, 1000);

                        }
                    } else {
                        createAlert(window.config.invalidConsent, 'checkboxAlert2');
                    }
                } else {
                    createAlert(window.config.invalidConsent, 'checkboxAlert1');
                }
            } else {
                removeAlert("checkboxAlert1");
                removeAlert("checkboxAlert2");
                removeAlert("successMessage");
                createAlert(window.config.invalidEmail, 'emailAlert');
            }
        });
        document.body.appendChild(mailSubsScreen);
        mailSubsScreen.appendChild(container);
        mailSubsScreen.appendChild(submit);
        mailSubsScreen.appendChild(rmcCloseButton);
    }

    function emailChecker() {
        if (document.querySelector("#mail-subs-email")) {
            var email = document.querySelector("#mail-subs-email").value.toLowerCase();
            var pattern = new RegExp("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}");
            var emailStatus = pattern.test(email);
            if (emailStatus == true) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    function emailPermitChecker() {
        if (document.querySelector("#email-permit")) {
            if (document.querySelector("#email-permit").checked) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    function secondPermitChecker() {
        if (document.querySelector("#consent-permit")) {
            if (document.querySelector("#consent-permit").checked) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    function removeAlert(id) {
        if (document.querySelector('#' + id)) {
            document.querySelector('#' + id).innerText = ""
        }
    }

    function createAlert(text, id) {
        if (!document.querySelector('#' + id).innerText) {
            var alert = document.createElement("div");
            alert.innerText = text;
            alert.style.width = "100%";
            alert.style.zIndex = "999";
            alert.style.textAlign = "left";
            if (id == "successMessage") {
                alert.style.color = "green";
            } else {
                alert.style.color = extendedProps.mail_subscription_form.title_text_color;
            }

            alert.style.fontSize = "18px";
            alert.style.fontFamily = setFontFamily();
            alert.style.transform = "translate3d(0,0,3px)";
            document.querySelector('#' + id).appendChild(alert)
        }
    }

    function createPermitRow(inputId, desc, fontSize, fontName, url) {
        var container = document.createElement("DIV");
        container.style.color = extendedProps.mail_subscription_form.title_text_color;
        container.style.fontSize = fontSizeCalculator(extendedProps.mail_subscription_form.title_text_size) + "px";
        container.style.margin = "15px 0";
        container.style.width = "100%";
        container.style.display = "flex";
        container.style.alignItems = "center";

        var input = document.createElement("input");
        input.id = inputId;
        input.type = "checkbox";
        input.style.width = "20px";
        input.style.height = "20px";
        input.style.display = "block";
        input.style.marginRight = "15px";
        input.style.float = "left";
        input.style.transform = "scale(1.3)";
        input.style.accentColor = extendedProps.mail_subscription_form.title_text_color;

        var text = document.createElement("div");
        text.innerText = desc;
        text.style.fontSize = fontSize;
        text.style.fontFamily = fontName;
        text.style.textDecoration = "underline";
        text.style.color = extendedProps.mail_subscription_form.title_text_color;

        text.addEventListener('click', () => {
            utils.linkClicked(url)
        })

        container.appendChild(input);
        container.appendChild(text);

        return container;
    }

    function setFontFamily() {
        var fontFamily;
        if (window.config.fontFamily === "custom") {
            if (window.Android) {
                fontFamily = window.config.fontFamilyAndroid;
            } else {
                fontFamily = window.config.fontFamilyIOS;
            }
        } else {
            fontFamily = window.config.fontFamily;
        }
        return fontFamily
    }
    window.doodleJump = this;

    function createGameRule() {
        var rmcGiftCatchDiv = document.createElement('div');
        rmcGiftCatchDiv.id = 'rmc-gift-catch';
        rmcGiftCatchDiv.style.display = "block"
        rmcGiftCatchDiv.style.width = '100vw';
        rmcGiftCatchDiv.style.height = '100vh';
        rmcGiftCatchDiv.style.fontFamily = "Roboto,sans-serif";
        rmcGiftCatchDiv.style.lineHeight = "1em";
        rmcGiftCatchDiv.style.textAlign = "left";
        rmcGiftCatchDiv.style.top = '0';
        rmcGiftCatchDiv.style.left = '0';
        rmcGiftCatchDiv.style.direction = "ltr!important";
        rmcGiftCatchDiv.style.overflowY = "auto";
        rmcGiftCatchDiv.style.zIndex = '2147483647';
        rmcGiftCatchDiv.style.position = 'fixed';

        var rmcRulesScreenDiv = document.createElement('div');
        rmcRulesScreenDiv.id = 'rmc-rules-screen';
        rmcRulesScreenDiv.style.width = '100%';
        rmcRulesScreenDiv.style.height = '100%';
        rmcRulesScreenDiv.style.position = 'fixed';
        rmcRulesScreenDiv.style.transition = 'all 1s ease 0s';
        rmcRulesScreenDiv.style.top = '0px';
        rmcRulesScreenDiv.style.left = '0px';
        rmcRulesScreenDiv.style.zIndex = '997';
        if (this.config.backgroundImage === "") {
            rmcRulesScreenDiv.style.backgroundColor = this.config.backgroundColor;
        } else {
            rmcRulesScreenDiv.style.backgroundImage = 'url(' + this.config.backgroundImage + ')';
        }

        var rmcRulesButton = document.createElement('button');
        rmcRulesButton.id = 'rmc-rules-button';
        rmcRulesButton.style.backgroundColor = this.config.gameRuleButtonColor;
        rmcRulesButton.style.color = this.config.gameRuleButtonTextColor;
        rmcRulesButton.style.padding = '15px 30px';
        rmcRulesButton.style.fontSize = fontSizeCalculator(this.config.gameRuleButtonTextSize) + "px";
        rmcRulesButton.style.borderRadius = '10px';
        rmcRulesButton.style.border = '0px';
        rmcRulesButton.style.position = 'absolute';
        rmcRulesButton.style.bottom = '70px';
        rmcRulesButton.style.left = '50%';
        rmcRulesButton.style.width = 'fit-content';
        rmcRulesButton.style.transform = 'translate(-50%, 0%) translate3d(0px, 0px, 3px)';
        rmcRulesButton.style.cursor = 'pointer';
        rmcRulesButton.style.zIndex = '3';
        rmcRulesButton.style.fontWeight = 'bolder';
        rmcRulesButton.style.fontFamily = 'android101';
        rmcRulesButton.textContent = this.config.actiondata.gamification_rules.button_label;

        var rmcCloseButton = document.createElement('button');
        rmcCloseButton.id = 'rmc-close-button';
        rmcCloseButton.style.position = 'absolute';
        rmcCloseButton.style.right = '0px';
        rmcCloseButton.style.top = '0px';
        rmcCloseButton.style.border = '0px';
        rmcCloseButton.style.color = this.config.closeButtonColor;
        rmcCloseButton.style.padding = '5px 10px';
        rmcCloseButton.style.cursor = 'pointer';
        rmcCloseButton.style.fontSize = '29px';
        rmcCloseButton.style.transition = 'all 1s ease 0s';
        rmcCloseButton.style.borderRadius = '10px';
        rmcCloseButton.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        rmcCloseButton.style.zIndex = '999';
        rmcCloseButton.style.transform = 'translate3d(0px, 0px, 3px)';
        rmcCloseButton.textContent = '✖';
        rmcCloseButton.addEventListener("click", function() {
            utils.close();
        }, false);


        var rmcRulesScreenInnerDiv1 = document.createElement('div');
        rmcRulesScreenInnerDiv1.style.width = '100%';
        rmcRulesScreenInnerDiv1.style.height = '100%';
        rmcRulesScreenInnerDiv1.style.backgroundImage = 'url("' + this.config.actiondata.gamification_rules.background_image + '")';
        rmcRulesScreenInnerDiv1.style.backgroundRepeat = 'no-repeat';
        rmcRulesScreenInnerDiv1.style.backgroundSize = 'contain';
        rmcRulesScreenInnerDiv1.style.backgroundPosition = 'center center';
        rmcRulesScreenInnerDiv1.style.position = 'fixed';
        rmcRulesScreenInnerDiv1.style.transition = 'all 1s ease 0s';
        rmcRulesScreenInnerDiv1.style.top = '0px';
        rmcRulesScreenInnerDiv1.style.left = '0px';
        rmcRulesScreenInnerDiv1.style.zIndex = '2';
        rmcRulesScreenInnerDiv1.style.transform = 'translate3d(0px, 0px, 3px)';

        var rmcRulesScreenInnerDiv2 = document.createElement('div');
        rmcRulesScreenInnerDiv2.style.width = '100%';
        rmcRulesScreenInnerDiv2.style.height = '100%';
        rmcRulesScreenInnerDiv2.style.backgroundImage = 'url("' + this.config.actiondata.gamification_rules.background_image + '")';
        rmcRulesScreenInnerDiv2.style.backgroundRepeat = 'no-repeat';
        rmcRulesScreenInnerDiv2.style.backgroundPosition = 'center center';
        rmcRulesScreenInnerDiv2.style.position = 'fixed';
        rmcRulesScreenInnerDiv2.style.transition = 'all 1s ease 0s';
        rmcRulesScreenInnerDiv2.style.top = '0px';
        rmcRulesScreenInnerDiv2.style.left = '0px';
        rmcRulesScreenInnerDiv2.style.zIndex = '1';
        rmcRulesScreenInnerDiv2.style.filter = 'blur(35px)';


        rmcRulesScreenDiv.appendChild(rmcRulesScreenInnerDiv1);
        rmcRulesScreenDiv.appendChild(rmcRulesScreenInnerDiv2);
        rmcRulesScreenDiv.appendChild(rmcRulesButton);
        rmcGiftCatchDiv.appendChild(rmcRulesScreenDiv);
        rmcGiftCatchDiv.appendChild(rmcCloseButton);


        document.body.appendChild(rmcGiftCatchDiv);
        rmcRulesButton.addEventListener("click", function() {
            rmcGiftCatchDiv.remove();
            createGameElements();
        });
    }

    function createFinishScreen() {
        var likecardgame = document.querySelector("#game");
        if (likecardgame) {
            document.querySelector("#game").remove();
        }

        var rmcFinishScreenDiv = document.createElement('div');
        rmcFinishScreenDiv.id = 'rmc-finish-screen';
        rmcFinishScreenDiv.style.width = '100%';
        rmcFinishScreenDiv.style.height = '100%';
        if (this.config.backgroundImage === "") {
            rmcFinishScreenDiv.style.backgroundColor = extendedProps.background_color;
        } else {
            rmcFinishScreenDiv.style.backgroundImage = 'url(' + this.config.backgroundImage + ')';
        }
        rmcFinishScreenDiv.style.backgroundRepeat = 'no-repeat';
        rmcFinishScreenDiv.style.backgroundSize = 'cover';
        rmcFinishScreenDiv.style.backgroundPosition = 'center center';
        rmcFinishScreenDiv.style.transition = 'all 1s ease 0s';
        rmcFinishScreenDiv.style.position = 'fixed';
        rmcFinishScreenDiv.style.top = '0px';
        rmcFinishScreenDiv.style.left = '0px';
        rmcFinishScreenDiv.style.zIndex = '994';

        var rmcFinishContainerDiv = document.createElement('div');
        rmcFinishContainerDiv.id = 'rmc-finish-container';
        rmcFinishContainerDiv.style.width = '100%';
        rmcFinishContainerDiv.style.height = 'auto';
        rmcFinishContainerDiv.style.position = 'absolute';
        rmcFinishContainerDiv.style.transform = 'translate(-50%, -50%)';
        rmcFinishContainerDiv.style.top = '50%';
        rmcFinishContainerDiv.style.left = '50%';
        rmcFinishContainerDiv.style.textAlign = 'center';

        var rmcFinishTitleDiv = document.createElement('div');
        rmcFinishTitleDiv.id = 'rmc-finish-title';
        rmcFinishTitleDiv.style.color = this.config.gameResultTitleTextColor;
        rmcFinishTitleDiv.style.fontSize = fontSizeCalculator(this.config.gameResultTitleTextSize) + "px";
        rmcFinishTitleDiv.style.display = 'inline-block';
        rmcFinishTitleDiv.style.margin = '15px 0px';
        rmcFinishTitleDiv.style.width = 'inherit';
        rmcFinishTitleDiv.style.fontFamily = '"Poiret One", sans-serif';
        rmcFinishTitleDiv.innerHTML = this.config.actiondata.game_result_elements.title.replace(/\n/g, "<br>");

        var rmcFinishMessageDiv = document.createElement('div');
        rmcFinishMessageDiv.id = 'rmc-finish-message';
        rmcFinishMessageDiv.style.color = this.config.gameResultMessageTextColor;
        rmcFinishMessageDiv.style.fontSize = fontSizeCalculator(this.config.gameResultMessageTextSize) + "px";
        rmcFinishMessageDiv.style.display = 'inline-block';
        rmcFinishMessageDiv.style.margin = '15px 0px';
        rmcFinishMessageDiv.style.width = 'inherit';
        rmcFinishMessageDiv.style.fontFamily = '"Poiret One", sans-serif';
        rmcFinishMessageDiv.innerHTML = this.config.actiondata.game_result_elements.message.replace(/\n/g, "<br>");

        var rmcFinishResultText = document.createElement('div');
        rmcFinishResultText.id = 'rmc-finish-result';
        rmcFinishResultText.style.color = "#000";
        rmcFinishResultText.style.fontSize = fontSizeCalculator(this.config.gameResultTitleTextSize) + "px"
        rmcFinishResultText.style.display = 'inline-block';
        rmcFinishResultText.style.margin = '15px 0px';
        rmcFinishResultText.style.width = 'inherit';
        rmcFinishResultText.style.fontFamily = '"Poiret One", sans-serif';
        rmcFinishResultText.innerHTML = "";

        var rmcFinishFinishDiv = document.createElement('div');
        rmcFinishFinishDiv.id = 'rmc-finish-finish';
        rmcFinishFinishDiv.style.transition = 'all 1s ease 0s';
        rmcFinishFinishDiv.style.padding = '15px 25px';
        rmcFinishFinishDiv.style.width = 'fit-content';
        rmcFinishFinishDiv.style.margin = '0px auto';
        rmcFinishFinishDiv.style.fontWeight = 'bold';
        rmcFinishFinishDiv.style.color = this.config.promoCodeTextColor;
        rmcFinishFinishDiv.style.fontFamily = '"Poiret One", sans-serif';
        rmcFinishFinishDiv.style.fontSize = '22px';
        rmcFinishFinishDiv.style.background = this.config.promoCodeBackgroundColor;
        rmcFinishFinishDiv.style.borderRadius = '15px';
        rmcFinishFinishDiv.innerHTML = CODE;

        var rmcFinishButtonSpan = document.createElement('span');
        rmcFinishButtonSpan.id = 'rmc-finish-button';
        rmcFinishButtonSpan.style.backgroundColor = this.config.copyButtonColor;
        rmcFinishButtonSpan.style.color = this.config.copyButtonTextColor;
        rmcFinishButtonSpan.style.padding = '15px 30px';
        rmcFinishButtonSpan.style.fontSize = fontSizeCalculator(this.config.copyButtonTextSize) + "px"
        rmcFinishButtonSpan.style.borderRadius = '10px';
        rmcFinishButtonSpan.style.border = '0px';
        rmcFinishButtonSpan.style.width = 'fit-content';
        rmcFinishButtonSpan.style.position = 'relative';
        rmcFinishButtonSpan.style.top = '30px';
        rmcFinishButtonSpan.style.cursor = 'pointer';
        rmcFinishButtonSpan.style.zIndex = '3';
        rmcFinishButtonSpan.style.fontWeight = 'bolder';
        rmcFinishButtonSpan.style.fontFamily = '"Poiret One", sans-serif';
        rmcFinishButtonSpan.style.boxShadow = 'rgba(0, 0, 0, 0.2) 0px 4px 8px 0px, rgba(0, 0, 0, 0.19) 0px 6px 20px 0px';
        rmcFinishButtonSpan.innerHTML = this.config.actiondata.copybutton_label;
        rmcFinishButtonSpan.addEventListener("click", function() {
            utils.copyToClipboard();
        }, false);

        var rmcCloseButton = document.createElement('button');
        rmcCloseButton.id = 'rmc-close-button';
        rmcCloseButton.style.position = 'absolute';
        rmcCloseButton.style.right = '0px';
        rmcCloseButton.style.top = '0px';
        rmcCloseButton.style.border = '0px';
        rmcCloseButton.style.color = this.config.closeButtonColor;
        rmcCloseButton.style.padding = '5px 10px';
        rmcCloseButton.style.cursor = 'pointer';
        rmcCloseButton.style.fontSize = '29px';
        rmcCloseButton.style.transition = 'all 1s ease 0s';
        rmcCloseButton.style.borderRadius = '10px';
        rmcCloseButton.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        rmcCloseButton.style.zIndex = '999';
        rmcCloseButton.style.transform = 'translate3d(0px, 0px, 3px)';
        rmcCloseButton.textContent = '✖';
        rmcCloseButton.addEventListener("click", function() {
            utils.close();
        }, false);


        if (this.config.actiondata.game_result_elements.title != "") {
            rmcFinishContainerDiv.appendChild(rmcFinishTitleDiv);
        }
        if (this.config.actiondata.game_result_elements.message != "") {
            rmcFinishContainerDiv.appendChild(rmcFinishMessageDiv);
        }
        rmcFinishContainerDiv.appendChild(rmcFinishResultText);
        rmcFinishContainerDiv.appendChild(rmcFinishFinishDiv);
        rmcFinishContainerDiv.appendChild(rmcFinishButtonSpan);
        rmcFinishScreenDiv.appendChild(rmcFinishContainerDiv);
        rmcFinishScreenDiv.appendChild(rmcCloseButton);


        document.body.appendChild(rmcFinishScreenDiv);
        utils.saveCodeGotten();
    }
    let utils = {
        copyToClipboard: () => {
            if (window.Android) {
                window.Android.copyToClipboard(CODE, "");
            } else if (window.webkit.messageHandlers.eventHandler) {
                const args = {
                    method: 'copyToClipboard',
                    couponCode: CODE,
                };
                window.webkit.messageHandlers.eventHandler.postMessage(args);
            }
        },
        sendReport: () => {
            const method = 'sendReport';
            if (window.Android) window.Android.sendReport();
            else if (window.webkit && window.webkit.messageHandlers)
                window.webkit.messageHandlers.eventHandler.postMessage({ method });
        },
        close: () => {
            const method = 'close';
            if (window.Android) window.Android.close();
            else if (window.webkit && window.webkit.messageHandlers)
                window.webkit.messageHandlers.eventHandler.postMessage({ method });
        },
        subscribe: (email) => {
            if (!email) return

            if (window.Android) {
                Android.subscribeEmail(email.trim());
            } else if (window.webkit && window.webkit.messageHandlers) {
                window.webkit.messageHandlers.eventHandler.postMessage({
                    method: "subscribeEmail",
                    email: email.trim()
                })
            }
        },
        linkClicked: (url) => {
            const args = { method: 'linkClicked', url: url || '' };
            if (window.Android) document.location.href = args.url;
            else if (window.webkit && window.webkit.messageHandlers)
                window.webkit.messageHandlers.eventHandler.postMessage(args);
        },
        saveCodeGotten: () => {
            const args = {
                method: 'saveCodeGotten',
                code: CODE,
                email: EMAIL,
                report: REPORT,
            };
            if (window.Android)
                window.Android.saveCodeGotten(args.code, args.email, args.report);
            else if (window.webkit && window.webkit.messageHandlers)
                window.webkit.messageHandlers.eventHandler.postMessage(args);
        }
    }

    function fontSizeCalculator(BEFS) {
        const fontSizeMapping = {
            10: 28,
            9: 26,
            8: 24,
            7: 22,
            6: 20,
            5: 18,
            4: 16,
            3: 14,
            2: 12,
            1: 10,
        };
        BEFS = parseInt(BEFS, 10);
        return fontSizeMapping[BEFS] || 18;
    }
}

