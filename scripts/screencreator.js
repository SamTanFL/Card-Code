



//Battle Screen Testing
var battleScreen = function () {
    container.innerHTML = "";
    var battleScreenDiv = document.createElement("div");
    battleScreenDiv.classList.add("battleScreen");
    container.appendChild(battleScreenDiv)
    var row1Div = document.createElement("div");
    row1Div.classList.add("row", "battleScreenTop");
    battleScreenDiv.appendChild(row1Div);
    var playerImg = document.createElement("img");
    playerImg.classList.add("playerImg", "offset-1");
    playerImg.setAttribute("src", "img/player.png");
    row1Div.appendChild(playerImg);
    var enemyImg = document.createElement("img");
    enemyImg.classList.add("enemyImg", "offset-3");
    enemyImg.setAttribute("src", "img/enemy" + currentEnemy.imgID + ".png");
    row1Div.appendChild(enemyImg);
    var enemyActsContainer = document.createElement("div");
    enemyActsContainer.classList.add("col-1", "enemyActsContainer");
    row1Div.appendChild(enemyActsContainer);
    var enemyAttVal = document.createElement("div");
    enemyAttVal.classList.add("row", "col-1", "attackVal");
    enemyAttVal.innerText = "0";
    enemyActsContainer.appendChild(enemyAttVal);
    var enemyAttImg = document.createElement("img");
    enemyAttImg.setAttribute("src", "img/attack.png");
    enemyAttImg.classList.add("row", "attack");
    enemyActsContainer.appendChild(enemyAttImg);
    var enemyShdVal = document.createElement("div");
    enemyShdVal.classList.add("row", "col-1", "shieldVal");
    enemyShdVal.innerText = "0";
    enemyActsContainer.appendChild(enemyShdVal);
    var enemyShdImg = document.createElement("img");
    enemyShdImg.setAttribute("src", "img/shield.png");
    enemyShdImg.classList.add("row", "shield");
    enemyActsContainer.appendChild(enemyShdImg);
    var row2Div = document.createElement("div");
    row2Div.classList.add("row");
    battleScreenDiv.appendChild(row2Div);
    var playerStatDiv = document.createElement("div");
    playerStatDiv.classList.add("col", "col-2", "offset-2", "playerDis")
    playerStatDiv.innerText = `HP : ${playerSession.health}\nShield : ${playerSession.shields}`;
    row2Div.appendChild(playerStatDiv);
    var enemyStatDiv = document.createElement("div");
    enemyStatDiv.classList.add("col", "col-2", "offset-3", "enemyDis")
    enemyStatDiv.innerText = `${currentEnemy.name}\nHP : ${currentEnemy.health}\nShield : ${currentEnemy.shields}`;
    row2Div.appendChild(enemyStatDiv);
    var row3Div = document.createElement("div");
    row3Div.classList.add("row");
    battleScreenDiv.appendChild(row3Div);
    var actionsFlow = document.createElement("span");
    actionsFlow.classList.add("col", "col-4", "offset-4", "actionsFlow")
    var flowRow = document.createElement("div");
    actionsFlow.appendChild(flowRow);
    flowRow.classList.add("row", "flowRow");
    for (i = 0; i < 3; i++) {
        var flowCol = document.createElement("div");
        flowCol.classList.add("col", "flow", "empty");
        flowCol.setAttribute("id", "flow" + i);
        flowCol.setAttribute("state", "empty");
        flowCol.setAttribute("position", i);
        flowCol.addEventListener("click", flowToHand)
        flowRow.appendChild(flowCol);
    }
    row3Div.appendChild(actionsFlow);
    var actionButton = document.createElement("div");
    actionButton.innerText = "Execute";
    actionButton.classList.add("col", "executeButton", "col-1");
    actionButton.addEventListener("click", resolveActions);
    row3Div.appendChild(actionButton)
    var row4Div = document.createElement("div");
    row4Div.classList.add("row");
    battleScreenDiv.appendChild(row4Div);
    var cardsDisplay = document.createElement("div");
    cardsDisplay.classList.add("cardsInHand");
    row4Div.appendChild(cardsDisplay);
    var deckDisplay = document.createElement("div");
    deckDisplay.classList.add("col", "col-1", "cardDeck");
    row4Div.appendChild(deckDisplay);
    calculateDraw();
    dealCards(turnDraw);
    updateEnemyActions();
}

//Map Screen Creation
var createMapScreen = function () {
    container.innerHTML = "";
    var mapOverallScreen = document.createElement("div");
    mapOverallScreen.classList.add("mapScreenBG", "row", "col-12");
    container.appendChild(mapOverallScreen);
    var mapPath = document.createElement("div");
    mapPath.classList.add("mapPath", "col-10", "offset-1");
    mapOverallScreen.appendChild(mapPath);
    for (i = 0; i < mapLayout.length; i++) {
        var mapNode = document.createElement("div");
        mapNode.classList.add("col-1", "mapNode", "notCleared", "mapNo" + i);
        switch (mapLayout[i]) {
            case 0:
                mapNode.classList.add("normal");
            break;
            case 1:
                mapNode.classList.add("elite");
            break;
            case 2:
                mapNode.classList.add("boss");
            break;
            case 3:
                mapNode.classList.add("rest");
            break;
            case 4:
                mapNode.classList.add("randomEvent");
            break;
            default:
                console.log("something went wrong with the mapLayout");
        } // Switch Statement Closing Bracket
        mapNode.setAttribute("position", i);
        var nodePositionInt = parseInt(mapNode.attributes.position.textContent);
        if (nodePositionInt < mapPosition) {
            mapNode.classList.remove("notCleared");
            mapNode.classList.add("cleared");
        }
        mapNode.addEventListener("click", mapNodeClick);
        mapNode.addEventListener("hover", mapNodeHover);
        mapPath.appendChild(mapNode);
    } // For loop closing Brackets
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
    document.querySelector(".startButton").addEventListener("click", createSession);
    document.querySelector(".startButton").addEventListener("click", createMapScreen);
}


//create card draft screen popup to append when needed
var cardDraftScreen = function () {
    var cardDraftPopupBG = document.createElement("div");
    cardDraftPopupBG.classList.add("cardDraftBG", "background");
    container.appendChild(cardDraftPopupBG);
    var cardDraftScreen = document.createElement("div");
    cardDraftScreen.classList.add("cardDraftScreen");
    cardDraftPopupBG.appendChild(cardDraftScreen);
    var cardDraftHeader = document.createElement("div");
    cardDraftHeader.innerText = "Add A Card To Your Deck";
    cardDraftHeader.classList.add("cardDraftHeader");
    cardDraftScreen.appendChild(cardDraftHeader);
    var cardDraftSelection = document.createElement("div");
    cardDraftSelection.classList.add("selectionContainer");
    cardDraftScreen.appendChild(cardDraftSelection);
    for (var i = 0; i < 3; i++) {
        var cardDraft = document.createElement("div");
        cardDraft.classList.add("cardDraft");
        cardDraft.id = "draft" + i;
        cardDraft.setAttribute("position", i);
        cardDraft.addEventListener("click", cardDraftSelectEvent);
        cardDraftSelection.appendChild(cardDraft);
    } //for loop closing bracket
    var draftConfirmButton = document.createElement("button");
    draftConfirmButton.innerText = "Confirm your Selection";
    draftConfirmButton.classList.add("draftConfirmButton");
    draftConfirmButton.addEventListener("click", cardDraftConfirmEvent);
    cardDraftScreen.appendChild(draftConfirmButton);
    var draftSkipButton = document.createElement("button");
    draftSkipButton.innerText = "Skip Adding A Card";
    draftSkipButton.classList.add("draftSkipButton");
    draftSkipButton.addEventListener("click", cardDraftSkipEvent);
    cardDraftScreen.appendChild(draftSkipButton);
}

var restScreenChoice = function () {
    var restScreenMain = document.querySelector(".restScreenMain");
    restScreenMain.innerHTML = "";
    var restChoiceContainer = document.createElement("div");
    restChoiceContainer.classList.add("row", "col-10", "offset-1", "restChoiceContainer");
    restScreenMain.appendChild(restChoiceContainer);
}


var createRestScreen = function () {
    var restScreenBG = document.createElement("div");
    restScreenBG.classList.add("restScreenBG", "background");
    container.appendChild(restScreenBG);
    var restScreenMain = document.createElement("div");
    restScreenMain.classList.add("restScreenMain", "col-10", "row", "offset-1");
    restScreenBG.appendChild(restScreenMain);
    var restImg = document.createElement("img");
    restImg.setAttribute("src", "img/rest.png");

    restScreenMain.appendChild(restImg);
}


var createRestartPrompt = function () {
    var winScreenBG = document.querySelector(".winScreenBG");
    winScreenBG.innerHTML = "";
    var restartPromptContainer = document.createElement("div");
    restartPromptContainer.classList.add("row", "restartContainer");
    winScreenBG.appendChild(restartPromptContainer);
    var restartYes = document.createElement("button");
    restartYes.classList.add("col-1", "row", "offset-5", "restartYes");
    restartYes.innerText = "Yes";
    restartYes.addEventListener("click", restartGame);
    restartPromptContainer.appendChild(restartYes)
    var restartNo = document.createElement("button")
    restartNo.classList.add("col-1", "row", "offset-5", "restartNo");
    restartNo.innerText = "No";
    restartNo.addEventListener("click", winnerScreenNo);
    restartPromptContainer.appendChild(restartNo);
}


var winnerWinnerScreen = function () {
    container.innerHTML = "";
    var winScreenBG = document.createElement("div");
    winScreenBG.classList.add("winScreenBG", "background");
    container.appendChild(winScreenBG);
    var winScreen = document.createElement("div");
    winScreen.classList.add("row", "col-10", "offset-1", "win");
    winScreen.addEventListener("click", createRestartPrompt);
    winScreenBG.appendChild(winScreen);
}

var winnerScreenNo = function () {
    container.innerHTML = "";
    var winScreenBG = document.createElement("div");
    winScreenBG.classList.add("winScreenBG", "background");
    container.appendChild(winScreenBG);
    var winScreen = document.createElement("div");
    winScreen.classList.add("row", "col-10", "offset-1", "win");
    winScreen.addEventListener("click", createRestartPrompt);
    winScreenBG.appendChild(winScreen);
}