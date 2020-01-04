



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
        var flowCol = document.createElement("span");
        flowCol.classList.add("col", "col-1", "flow", "empty");
        flowCol.setAttribute("id", "flow" + i);
        flowCol.setAttribute("state", "empty");
        flowCol.setAttribute("position", i);
        flowCol.addEventListener("click", flowToHand)
        flowRow.appendChild(flowCol);
    }
    row3Div.appendChild(actionsFlow);
    var actionButton = document.createElement("button");
    actionButton.innerText = "Execute";
    actionButton.addEventListener("click", resolveActions);
    row3Div.appendChild(actionButton)
    var row4Div = document.createElement("div");
    row4Div.classList.add("row");
    battleScreenDiv.appendChild(row4Div);
    var cardsDisplay = document.createElement("div");
    cardsDisplay.classList.add("cardsInHand");
    row4Div.appendChild(cardsDisplay);
    for (i = 0; i < 10; i++){
        var card = document.createElement("div")
        card.classList.add("col", "col-1", "cards", "empty");
        card.setAttribute("id", "card" + i);
        card.setAttribute("state", "empty");
        card.setAttribute("position", i);
        card.innerText = "test";
        card.addEventListener("click", getSlotData);
        cardsDisplay.appendChild(card);
        }
    var deckDisplay = document.createElement("div");
    deckDisplay.classList.add("col", "col-1", "cardDeck");
    row4Div.appendChild(deckDisplay);
    setTimeout(dealDeck, 500);
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