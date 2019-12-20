//Deck Stuffs ---------------------------------------------------------------------------------------------
var createStartingDeck = function () {
    for (i = 0; i < 10; i++) {
        if (i < 5) {
            cardsInSession[i] = cards[0];
        } else {
            cardsInSession[i] = cards[1];
        }
    }
}

var initBattle = function () {
    currentEnemy = enemies.normal[0];
    shuffleSess2Deck();
}


var shuffleSess2Deck = function () {
    let tempD = cardsInSession;
    shuffle(tempD);
    cardsInDeck = tempD;
}


var getSlotData = function (event) {
    if (this.attributes.state.textContent !== "empty") {
        console.log("do something");
    } else {
        console.log("do nothing");
    }
}



var selectCard2Flow = function () {
}


var dealDeck = function () {
    for (var i = 0; i < 5; i++) {
        var cards = document.querySelectorAll(".cards")
        cards[i].setAttribute("state", "" + cardsInDeck[i].cardID);
        cardsInHand.push(cardsInDeck.shift());
        cards[i].innerText = cardsInHand[i].cardID;
    }
}

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



//Combat Stuffs---------------------------------------------------------------------------------------------
































//Randomizer Stuffs-----------------------------------------------------------------------------------
var ranNumGen = function (numRange) {
    ranNum = Math.floor(Math.random()*numRange);
    console.log(ranNum);
    return ranNum;
};


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  };
}