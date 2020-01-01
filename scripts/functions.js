//Deck Stuffs ---------------------------------------------------------------------------------------------
//Every New game that starts this is used to make the starting deck.
var createStartingDeck = function () {
    cardsInSession = cardStartDefault.slice();
}

//Initiates the battle variables
var initBattle = function () {
    currentEnemy = enemies.normal[0]; //picks enemy
    shuffleSess2Deck();
}

//shuffles deck and slots it into the deck variable
var shuffleSess2Deck = function () {
    var tempD = cardsInSession.slice();
    shuffle(tempD);
    cardsInDeck = tempD.slice();
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
    var tempHands = cardsInHand.slice();
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
    for (var i = 0; i < 5; i++) {
        var card = document.querySelectorAll(".cards")
        cardsInHand.push(cardsInDeck.shift());
        card[i].setAttribute("state", "" + cardsInHand[i]);
        card[i].classList.add("type" + cardsInHand[i]);
        card[i].classList.remove("empty");
    }
}

//Empties the hand into the discard pile
var discardHand = function () {
    var handSize = cardsInHand.length
    for (var i = 0; i < handSize; i++) {
        cardsInDiscard.push(cardsInHand.shift());
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

var resolveActions = function () {

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