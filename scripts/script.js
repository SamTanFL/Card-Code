//Main Menu creation

var createStartScreen = function () {
    container.innerHTML = "";
    var startScreenDiv = document.createElement("div");
    startScreenDiv.classList.add("startScreen");
    var row1Div = document.createElement("div");
    row1Div.classList.add("row", "startScreenHeader");
    container.appendChild(row1Div);
    var row2Div = document.createElement("div");
    row2Div.classList.add("row");
    container.appendChild(row2Div);
    var row3Div = document.createElement("div");
    row3Div.classList.add("row");
    container.appendChild(row3Div);
    var startButton = document.createElement("button");
    startButton.classList.add("startButton", "col-4", "offset-4");
    startButton.innerText = "Enter the Pen";
    row2Div.appendChild(startButton);
    var helpButton = document.createElement("button");
    helpButton.classList.add("helpButton", "col-4", "offset-4");
    helpButton.innerText = "Instructions"
    row3Div.appendChild(helpButton);
}

document.querySelector(".initGame").addEventListener("click", createStartScreen);


