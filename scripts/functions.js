//MISC STUFFS ----------------------------------------------------------------------------------------------
//Initiates the battle variables
var initBattle = function () {
    if (mapLayout[mapPosition] == 0) {
        var enemyTemp = JSON.parse(JSON.stringify(enemies.normal)); //clones the array
        ranNumGen(enemyTemp.length);
        currentEnemy = enemyTemp[ranNum];
        currentActions = enemyActions.normal[currentEnemy.enemyID];
        pickAction();
        shuffleSess2Deck();
    } else if (mapLayout[mapPosition] == 1) {
        var enemyTemp = JSON.parse(JSON.stringify(enemies.elites));
        ranNumGen(enemyTemp.length);
        currentEnemy = enemyTemp[ranNum];
        currentActions = enemyActions.elites[currentEnemy.enemyID];
        pickAction();
        shuffleSess2Deck();
    } else if (mapLayout[mapPosition] == 2) {
        var enemyTemp = JSON.parse(JSON.stringify(enemies.bosses));
        ranNumGen(enemyTemp.length);
        currentEnemy = enemyTemp[ranNum];
        currentActions = enemyActions.bosses[currentEnemy.enemyID];
        pickAction();
        shuffleSess2Deck();
    } else {
        console.log("initBattle has something wrong")
    }
}

//restart the game variables
var restartGame = function () {
    playerSession = "";
    cardsInSession = "";
    mapPosition = 0;
    createMainMenu();
}

//creates a clone of the defaults and resets player position
var createSession = function () {
    playerSession = JSON.parse(JSON.stringify(player));
    cardsInSession = JSON.parse(JSON.stringify(cardStartDefault));
    mapPosition = 0;
}


var playerHPUpdate = function () {
    var playerDis = document.querySelector(".playerDis");
    playerDis.innerText = `HP : ${playerSession.health}\nShield: ${playerSession.shields}`;
}

var enemyHPUpdate = function () {
    var enemyDis = document.querySelector(".enemyDis");
    if (currentEnemy.health < 0) {currentEnemy.health = 0;}
    enemyDis.innerText = `${currentEnemy.name}\nHP : ${currentEnemy.health}\nShield : ${currentEnemy.shields}`;
}

//Map Stuffs------------------------------------------------------------------------------------------------
//the function that is called when you click on a map node
var mapNodeClick = function () {
    var mapType = parseInt(this.attributes.position.textContent);
    if (mapType == mapPosition && mapLayout[mapPosition] < 3) {
        initBattle();
        battleScreen();
    } else if (mapType == mapPosition && mapLayout[mapPosition] == 3) {
        playerSession.health = playerSession.health + (playerSession.maxHealth * 0.25);
        mapPosition++;
        createRestScreen();
    } else if (mapType == mapPosition && mapLayout[mapPosition] == 4) {
        console.log("Something random happens");
        var randomOptions = [0, 1, 3, 4];
        ranNumGen(randomOptions.length);
        var randomOutcome = randomOptions[ranNum];
        switch (randomOutcome) {
            case 0:
                var enemyTemp = JSON.parse(JSON.stringify(enemies.normal)); //clones the array
                ranNumGen(enemyTemp.length);
                currentEnemy = enemyTemp[ranNum];
                currentActions = enemyActions.normal[currentEnemy.enemyID];
                pickAction();
                shuffleSess2Deck();
                battleScreen();
            break;
            case 1:
                var enemyTemp = JSON.parse(JSON.stringify(enemies.elites));
                ranNumGen(enemyTemp.length);
                currentEnemy = enemyTemp[ranNum];
                currentActions = enemyActions.elites[currentEnemy.enemyID];
                pickAction();
                shuffleSess2Deck();
                battleScreen();
            break;
            case 3:
                playerSession.health = playerSession.health + (playerSession.maxHealth * 0.25);
                mapPosition++;
                createRestScreen();
            break;
            case 4:
                mapPosition++;
                cardDraftScreen();
                cardDraftGeneration();
            break;
            default:
                console.log("something is wrong here in the mapNodeClick")
        } //closing bracket for switch
    } else {
        console.log("something is broken or you're clicking on the wrong thing");
    }
}


//maybe I'll try to add some CSS stuff too
var mapNodeHover = function () {

}







//Deck Stuffs ---------------------------------------------------------------------------------------------
//empties the flow area & resets flow
var emptyFlow = function () {
    flowArea = document.querySelectorAll(".flow");
    for (var i = 0; i < 3; i++) {
        flowArea[i].attributes.class.textContent = "flow empty";
    }
    cardsInFlow = [];
}

//shuffles deck and slots it into the deck variable
var shuffleSess2Deck = function () {
    var tempD = JSON.parse(JSON.stringify(cardsInSession));
    shuffle(tempD);
    cardsInDeck = JSON.parse(JSON.stringify(tempD));
}

//Empties the hand into the discard pile
var discardHand = function () {
    var cardsHand = document.querySelectorAll(".cards");
    var handSize = cardsInHand.length
    for (var i = 0; i < handSize; i++) {
        cardsInDiscard.push(cardsInHand.shift());
    }
    var cardsDisplay = document.querySelector(".cardsInHand");
    cardsDisplay.innerHTML = "";
}

var shuffleDiscard2Deck = function () {
    shuffle(cardsInDiscard);
    var discardSize = cardsInDiscard.length
    for (var i = 0; i < discardSize; i++) {
        cardsInDeck.push(cardsInDiscard.shift());
    };
}

//moves the card from Hand to flow area. Helps with tracking where card comes from
var handToFlow = function (event) {
    var cardsHand = document.querySelectorAll(".cards");
    var flowArea = document.querySelectorAll(".flow");
    var cardPosition = parseInt(this.attributes.position.textContent);
    if (cardsInFlow.length < 3) {
        cardsInFlow.push(cardsInHand.splice(cardPosition, 1)[0]);
        updateHand();
        updateFlow();
    } else {
        console.log("Flow is Full")
    }
}

//moves card from flow back to hand
var flowToHand = function (event) {
    var flowPosition = parseInt(this.attributes.position.textContent);
    if (cardsInFlow[flowPosition] !== undefined) {
        cardsInHand.push(cardsInFlow.splice(flowPosition, 1)[0]);
        updateHand();
        updateFlow();
    } else {
        console.log("do nothing");
    }
}

//card dealing function.
var dealCards = function (draws) {
    var cardsDisplay = document.querySelector(".cardsInHand");
    cardsDisplay.innerHTML = "";
    for (i = 0; i < draws; i++) {
        if (cardsInDeck == 0) {shuffleDiscard2Deck()};
        cardsInHand.push(cardsInDeck.shift());
        var card = document.createElement("div");
        card.classList.add("col", "cards", "type" + cardsInHand[i]);
        card.setAttribute("id", "card" + i);
        card.setAttribute("position", i);
        card.addEventListener("click", handToFlow);
        cardsDisplay.appendChild(card);
    }
}

//recreates the hand
var updateHand = function () {
    var cardsDisplay = document.querySelector(".cardsInHand");
    cardsDisplay.innerHTML = "";
    for (i = 0; i < cardsInHand.length; i++) {
        var card = document.createElement("div");
        card.classList.add("cards", "type" + cardsInHand[i]);
        card.setAttribute("position", i);
        card.addEventListener("click", handToFlow);
        cardsDisplay.appendChild(card);
    }
}

//recreates the flow
var updateFlow = function () {
    var flowRow = document.querySelector(".flowRow");
    flowRow.innerHTML = "";
    for (i = 0; i < 3; i++) {
        var flowCol = document.createElement("div");
        if (cardsInFlow[i] == undefined){
            flowCol.classList.add("flow", "empty");
        } else {
            flowCol.classList.add("flow", "type" + cardsInFlow[i]);
        }
        flowCol.setAttribute("position", i);
        flowCol.addEventListener("click", flowToHand)
        flowRow.appendChild(flowCol);
    }
}


//calculate how many cards to draw;
var calculateDraw = function () {
    turnDraw = parseInt(playerSession.naturalDraw) + parseInt(playerSession.addDraw);
    playerSession.addDraw = 0;
}


//---------------------Card Drafting stuffs---------------------------\\
//this helps identify and pick the card you wish to draft
var cardDraftSelectEvent = function (event) {
    var cardDraftCards = document.querySelectorAll(".cardDraft");
    for (var i = 0; i < 3; i++) {
        cardDraftCards[i].classList.remove("selected");
    }
    this.classList.add("selected");
    var cardDraftPosition = parseInt(this.attributes.position.textContent);
    cardToDraft = parseInt(cardsInDraft[cardDraftPosition]);
}


//confirm button event listener function
var cardDraftConfirmEvent = function () {
    if (cardToDraft !== NaN) {
        cardsInSession.push(cardToDraft);
        createMapScreen();
        cardsInDraft = [];
        cardToDraft = NaN;
    }
        console.log("confirm the card selection to your deck");
}

//to skip adding a card
var cardDraftSkipEvent = function () {
    createMapScreen();
    cardsInDraft = [];
    console.log("no good cards?");
}

//Randomly generates which card you can draft
var cardDraftGeneration = function () {
    var cardDraftBG = document.querySelector(".cardDraftBG");
    while (cardsInDraft.length < 3) {
        ranNumGen(cards.length);
        if (ranNum !== cardsInDraft[0] && ranNum !== cardsInDraft[1] && ranNum !== cardsInDraft[2]) {
            cardsInDraft.push(ranNum);
        } // closing bracket for If Statement
    } // closing bracket for WHILE loop
    var cardDraft = document.querySelectorAll(".cardDraft");
    for (var i = 0; i < cardsInDraft.length; i++) {
        cardDraft[i].classList.add("type" + cardsInDraft[i]);
    } // closing brackets for I loop
}


//Combat Stuffs---------------------------------------------------------------------------------------------
//does the actions of the cards you picked to play
var executeFlow = function () {
    for (var i = 0; i < 3; i++) {
        var cardId = parseInt(cardsInFlow[i]);
        var card = cards[cardId];
        switch (card.cardType) {
            case 1: //1s are normal flat damage attacks
                if (currentEnemy.shields < 0) {currentEnemy.shields = 0};
                currentEnemy.shields = currentEnemy.shields - card.cardEff;
                if (currentEnemy.shields < 0) {
                    currentEnemy.health = currentEnemy.health + currentEnemy.shields};
                enemyHPUpdate();
            break;
            case 2: // 2s are blocks
                playerSession.shields = playerSession.shields + card.cardEff;
                playerHPUpdate();
            break;
            case 3: //a different kind of card that does multiple strikes
                if (currentEnemy.shields < 0) {currentEnemy.shields = 0};
                for (i = 0; i < card.cardAdd; i++) {
                    currentEnemy.shields = currentEnemy.shields - card.cardEff;
                };
                if (currentEnemy.shields < 0) {
                    currentEnemy.health = currentEnemy.health + currentEnemy.shields;
                };
                enemyHPUpdate();
            break;
            case 4: //inflicts status
                if (card.cardAdd[1] == 1) {
                    if (currentEnemy.shields < 0) {currentEnemy.shields = 0};
                    currentEnemy.shields = currentEnemy.shields - card.cardEff;
                    if (currentEnemy.shields < 0) {
                        currentEnemy.health = currentEnemy.health + currentEnemy.shields};
                    currentEnemy.status.debuff[0] = ["weak", card.cardAdd[0]];
                    enemyHPUpdate();
                } else if (card.cardAdd[1] == 2) {
                    playerSession.shields = playerSession.shields + card.cardEff;
                    currentEnemy.status.debuff[0] = ["weak", card.cardAdd[0]];
                    playerHPUpdate();
                }
            break;
            default:
                console.log("something went wrong in executeFlow");
        }; // <<=============end of switch bracket
    } //    <<==============end of the for loop bracket
}

//executes the enemies' actions
var enemyActs = function () {
    switch (turnAction[0]) {
        case 0:
            if (playerSession.shields < 0) {playerSession.shields = 0};
            if (currentEnemy.status.debuff[0][0] == "weak") {
                playerSession.shields = playerSession.shields - Math.floor(turnAction[1] * 0.75);
            } else {
                playerSession.shields = playerSession.shields - turnAction[1];
            }
            if (playerSession.shields < 0) {
                playerSession.health = playerSession.health + playerSession.shields;
            };
            playerHPUpdate();
        break;
        case 1:
            if (currentEnemy.shields < 0) { currentEnemy.shields = 0};
            currentEnemy.shields = currentEnemy.shields + turnAction[1];
            enemyHPUpdate();
        break;
        case 2:
             if (playerSession.shields < 0) {playerSession.shields = 0};
            playerSession.shields = playerSession.shields - turnAction[1];
            if (playerSession.shields < 0) {
                playerSession.health = playerSession.health + playerSession.shields;
            };
            playerHPUpdate();
            if (currentEnemy.shields < 0) { currentEnemy.shields = 0};
            currentEnemy.shields = currentEnemy.shields + turnAction[2];
            enemyHPUpdate();
        break;
        default:
            console.log("something went wrong in enemyActions function")
    } // <<============switch's closing bracket
} // <<==================the whole function's closing bracket


//updates values to visually show what enemy is doing
var updateEnemyActions = function () {
    var attackVal = document.querySelector(".attackVal");
    var shieldVal = document.querySelector(".shieldVal");
    switch (turnAction[0]) {
        case 0:
            if (currentEnemy.status.debuff[0][0] == "weak") {
                attackVal.innerText = Math.floor(turnAction[1] * 0.75)
                shieldVal.innerText = 0;
            } else {
            attackVal.innerText = turnAction[1];
            shieldVal.innerText = 0;
            }
        break;
        case 1:
            shieldVal.innerText = turnAction[1];
            attackVal.innerText = 0;
        break;
        case 2:
            if (currentEnemy.status.debuff[0][0] == "weak") {
                attackVal.innerText = Math.floor(turnAction[1] * 0.75);
                shieldVal.innerText = turnAction[2];
            } else {
            attackVal.innerText = turnAction[1];
            shieldVal.innerText = turnAction[2];
            }
        break;
        default:
            console.log("something went wrong updating attacks")
    }
}

//function for counting down the status effect turns
var statusTurns = function () {
    var enemyStatus = document.querySelector(".status");
    if (currentEnemy.status.debuff[0][0] == "weak"); {
        enemyStatus.setAttribute("src", "img/weak.png");
    }
    enemyStatusTurns = currentEnemy.status.debuff[0][1];
    enemyStatusTurns--;
    if (enemyStatusTurns <= 0) {
        currentEnemy.status.debuff[0] = "none";
        enemyStatus.setAttribute("src", "img/fine.png");
    }
}


//function to decide what the enemy is doing this turn
var pickAction = function () {
    ranNumGen(currentActions.length);
    turnAction = currentActions[ranNum];
}

//shields reset every turn so heres the function that does that for the player
var resetPlayerShields = function () {
    playerSession.shields = 0;
    setTimeout(playerHPUpdate);
}

//resets for enemy
var resetEnemyShields = function () {
    currentEnemy.shields = 0;
    setTimeout(enemyHPUpdate);
}

var endBattle = function () {
    alert("The Enemy Died");
    mapPosition++;
    if (mapPosition == mapLayout.length) {
        container.innerHTML = "";
        cardsInFlow = [ "empty", "empty", "empty"];
        cardsInFlowPosition = ["empty", "empty", "empty"];
        winnerWinnerScreen();
    } else {
    cardsInFlow = [ "empty", "empty", "empty"];
    cardsInFlowPosition = ["empty", "empty", "empty"];
    cardDraftScreen();
    cardDraftGeneration();
    };
}

//gameOver check
var gameoverCheck = function () {
    if (playerSession.health <= 0) {
        gameOverScreen();
    }
}

var resolveActions = function () {
    if (cardsInFlow[0] != "empty" && cardsInFlow[1] != "empty" && cardsInFlow[2] != "empty") {
        executeFlow();
        resetEnemyShields();
        if (currentEnemy.health > 0) {
            enemyActs();
            resetPlayerShields();
            discardHand();
            emptyFlow();
            setTimeout(function(){dealCards(turnDraw)}, 1000);
            pickAction();
            if (currentEnemy.status.debuff[0] !== "none") {
            statusTurns();
        }
            updateEnemyActions();
            gameoverCheck();
        } else {
            endBattle();
        }
    } else {
        alert("Are you forgetting something?");
    }
}


//Randomizer Stuffs-----------------------------------------------------------------------------------
var ranNumGen = function (numRange) {
    ranNum = Math.floor(Math.random()*numRange);
    console.log(ranNum);
    return ranNum;
};

//Well.... it shuffles.
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  };
} //it takes the