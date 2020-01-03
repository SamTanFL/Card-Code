//MISC STUFFS ----------------------------------------------------------------------------------------------
//Initiates the battle variables
var initBattle = function () {
    var enemyTemp = JSON.parse(JSON.stringify(enemies.normal)); //clones the array
    ranNumGen(enemyTemp.length)
    currentEnemy = enemyTemp[ranNum];
    currentActions = enemyActions.normal[currentEnemy.enemyID];
    pickAction();
    shuffleSess2Deck();
}

var createSession = function () {
    playerSession = JSON.parse(JSON.stringify(player));
    createStartingDeck();
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

//Deck Stuffs ---------------------------------------------------------------------------------------------
//Every New game that starts this is used to make the starting deck.
var createStartingDeck = function () {
    cardsInSession = JSON.parse(JSON.stringify(cardStartDefault));
}


//empties the flow area & resets flow
var emptyFlow = function () {
    flowArea = document.querySelectorAll(".flow");
    for (var i = 0; i < 3; i++) {
        flowArea[i].attributes.class.textContent = "col col-1 flow empty";
    }
    cardsInFlow = [ "empty", "empty", "empty"];
    cardsInFlowPosition = ["empty", "empty", "empty"];
}

//shuffles deck and slots it into the deck variable
var shuffleSess2Deck = function () {
    var tempD = JSON.parse(JSON.stringify(cardsInSession));
    shuffle(tempD);
    cardsInDeck = JSON.parse(JSON.stringify(tempD));
}

//gets the state of the card slot clicked and executes
var getSlotData = function (event) {
    if (this.attributes.state.textContent !== "empty" && this.attributes.state.textContent !== "used") {
        var cardPosition = parseInt(this.attributes.position.textContent);
        handToFlow(cardPosition);
    } else {
        console.log("do nothing");
    }
}

//moves the card from Hand to flow area. Helps with tracking where card comes from
var handToFlow = function (cardPosition) {
    var tempHands = JSON.parse(JSON.stringify(cardsInHand));
    var cardsHand = document.querySelectorAll(".cards");
    var flowArea = document.querySelectorAll(".flow");
    if (cardsInFlow[0] == "empty") {
        cardsInFlow[0] = tempHands[cardPosition];
        cardsInFlowPosition[0] = cardPosition;
        flowArea[0].classList.remove("empty")
        flowArea[0].classList.add("type" + cardsInFlow[0]);
        cardsHand[cardPosition].setAttribute("state", "used");
    } else if (cardsInFlow[1] == "empty") {
        cardsInFlow[1] = tempHands[cardPosition];
        cardsInFlowPosition[1] = cardPosition;
        flowArea[1].classList.remove("empty")
        flowArea[1].classList.add("type" + cardsInFlow[1]);
        cardsHand[cardPosition].setAttribute("state", "used");
    } else if (cardsInFlow[2] == "empty") {
        cardsInFlow[2] = tempHands[cardPosition];
        cardsInFlowPosition[2] = cardPosition;
        flowArea[2].classList.remove("empty")
        flowArea[2].classList.add("type" + cardsInFlow[2]);
        cardsHand[cardPosition].setAttribute("state", "used");
    } else {
        alert("Flow is Full")
    }
}

//Moves cardsSession to deck.
var dealDeck = function () {
    for (var i = 0; i < playerSession.naturalDraw; i++) {
        if (cardsInDeck == 0) {shuffleDiscard2Deck()};
        var card = document.querySelectorAll(".cards");
        cardsInHand.push(cardsInDeck.shift());
        card[i].setAttribute("state", "" + cardsInHand[i]);
        card[i].classList.add("type" + cardsInHand[i]);
        card[i].classList.remove("empty");
    };
}

//Empties the hand into the discard pile
var discardHand = function () {
    var cardsHand = document.querySelectorAll(".cards");
    var handSize = cardsInHand.length
    for (var i = 0; i < handSize; i++) {
        cardsInDiscard.push(cardsInHand.shift());
        cardsHand[i].attributes.class.textContent = "col col-1 cards empty";
    }
}

var shuffleDiscard2Deck = function () {
    shuffle(cardsInDiscard);
    var discardSize = cardsInDiscard.length
    for (var i = 0; i < discardSize; i++) {
        cardsInDeck.push(cardsInDiscard.shift());
    };
}

//moves card from flow back to hand
var flowToHand = function (event) {
        var flowPosition = parseInt(this.attributes.position.textContent);
        var cardsHand = document.querySelectorAll(".cards");
    if (cardsInFlow[flowPosition] !== "empty") {
        cardsHand[cardsInFlowPosition[flowPosition]].setAttribute("state", cardsInFlow[flowPosition]);
        this.setAttribute("state", "empty");
        this.classList.remove("type" + cardsInFlow[flowPosition])
        this.classList.add("empty");
        cardsInFlow[flowPosition] = "empty";
        cardsInFlowPosition[flowPosition] = "empty";
    } else {
        console.log("do nuthing");
    }
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
            case "Multi": //a different kind of card that does multiple strikes
                if (currentEnemy.shields < 0) {currentEnemy.shields = 0};
                for (i = 0; i < card.cardAdd; i++) {
                    currentEnemy.shields = currentEnemy.shields - card.cardEff;
                };
                if (currentEnemy.shields < 0) {
                    currentEnemy.health = currentEnemy.health + currentEnemy.shields;
                };
                enemyHPUpdate();
            break;
            default:
                console.log("something went wrong in executeFlow");
        }; // <<=============end of switch bracket
    } //    <<==============end of the for loop bracket
    if (currentEnemy.health <= 0) {endBattle()};
}

var enemyActs = function () {
    switch (turnAction[0]) {
        case 0:
            if (playerSession.shields < 0) {playerSession.shields = 0};
            playerSession.shields = playerSession.shields - turnAction[1];
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


//function to decide what the enemy is doing this turn
var pickAction = function () {
    ranNumGen(currentActions.length);
    turnAction = currentActions[ranNum];
}

//shields reset every turn so heres the function that does that for the player
var resetPlayerShields = function () {
    playerSession.shields = 0;
    setTimeout(playerHPUpdate, 1500);
}

//resets for enemy
var resetEnemyShields = function () {
    currentEnemy.shields = 0;
    setTimeout(enemyHPUpdate, 1500);
}

var endBattle = function () {
    console.log("enemy is dead");
}

var resolveActions = function () {
    if (cardsInFlow[0] != "empty" && cardsInFlow[1] != "empty" && cardsInFlow[2] != "empty") {
        executeFlow();
        resetEnemyShields();
        enemyActs();
        resetPlayerShields();
        discardHand();
        emptyFlow();
        setTimeout(dealDeck, 1000);
        pickAction();
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