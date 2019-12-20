



//Battle Screen Testing
var battleScreen = function () {
    container.innerHTML = "";
    var battleScreenDiv = document.createElement("div");
    battleScreenDiv.classList.add("battleScreen");
    container.appendChild(battleScreenDiv)
    var row1Div = document.createElement("div");
    row1Div.classList.add("row", "battleScreenTop");
    battleScreenDiv.appendChild(row1Div);
    var screenImg = document.createElement("img");
    screenImg.setAttribute("src", "https://1001freedownloads.s3.amazonaws.com/vector/thumb/63319/Placeholder.png");
    row1Div.appendChild(screenImg);
    var row2Div = document.createElement("div")
    row2Div.classList.add("row");
    battleScreenDiv.appendChild(row2Div);
    var playerStatDiv = document.createElement("div");
    playerStatDiv.classList.add("col", "col-2", "offset-2", "playerDis")
    playerStatDiv.innerText = `HP : ${player.health}`;
    row2Div.appendChild(playerStatDiv);
    var enemyStatDiv = document.createElement("div");
    enemyStatDiv.classList.add("col", "col-2", "offset-3", "enemyDis")
    enemyStatDiv.innerText = `${enemies.normal[0].name}\nHP : ${enemies.normal[0].health}`;
    row2Div.appendChild(enemyStatDiv);
    var row3Div = document.createElement("div");
    row3Div.classList.add("row");
    battleScreenDiv.appendChild(row3Div);
    var actionsFlow = document.createElement("span");
    actionsFlow.classList.add("col", "col-4", "offset-4", "actionsFlow")
    actionsFlow.innerText = "Just enter some text here for now. PLACEHOLDER";
    row3Div.appendChild(actionsFlow);
    var row4Div = document.createElement("div");
    row4Div.classList.add("row");
    battleScreenDiv.appendChild(row4Div);
    var cardsDisplay = document.createElement("div");
    cardsDisplay.classList.add("cardsInHand");
    row4Div.appendChild(cardsDisplay);
    for (i = 0; i < 10; i++){
            var card = document.createElement("div")
            card.classList.add("col", "col-1", "cards");
            card.setAttribute("id", "card" + i);
            card.setAttribute("state", "empty");
            card.innerText = "PLACEHOLDER";
            card.addEventListener("click", getSlotData);
            cardsDisplay.appendChild(card);
        }
    var deckDisplay = document.createElement("div");
    deckDisplay.classList.add("col", "col-1", "cardDeck");
    row4Div.appendChild(deckDisplay);
    setTimeout(dealDeck, 1500);
}

//Main Menu Creation
var createMainMenu = function () {
    container.innerHTML = "";
    var startScreenDiv = document.createElement("div");
    startScreenDiv.classList.add("startScreen");
    container.appendChild(startScreenDiv)
    var row1Div = document.createElement("div");
    row1Div.classList.add("row", "startScreenHeader");
    startScreenDiv.appendChild(row1Div);
    var row2Div = document.createElement("div");
    row2Div.classList.add("row");
    startScreenDiv.appendChild(row2Div);
    var row3Div = document.createElement("div");
    row3Div.classList.add("row");
    startScreenDiv.appendChild(row3Div);
    var startButton = document.createElement("button");
    startButton.classList.add("startButton", "col-2", "offset-5");
    startButton.innerText = "Dive into the Code";
    row2Div.appendChild(startButton);
    var helpButton = document.createElement("button");
    helpButton.classList.add("helpButton", "col-2", "offset-5");
    helpButton.innerText = "Instructions"
    row3Div.appendChild(helpButton);
    document.querySelector(".startButton").addEventListener("click", createStartingDeck);
    document.querySelector(".startButton").addEventListener("click", initBattle);
    document.querySelector(".startButton").addEventListener("click", battleScreen);
}