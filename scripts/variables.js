//An object to keep track of player stats
var player = {
    health: 0,
    maxHealth: 0,
    energy: 0,
    maxEnergy: 0,
    money: 0,
    playerState: {
        debuff: [],
        buff: []
    },
    progress: 0
};





//An array to store the different card types and their states
var cards = [];
var cardsInPlay = [];
var cardsInDeck = [];
var cardsInHand = [];






//An object to store the different types of enemies you will encounter
var enemies = {
    normal: [],
    elites: [],
    bosses: []
};







//Not sure if this will be kept but an array for the different status effects
var status = [];














//Finding my page elements
var container = document.querySelector(".container");
var initGameButton = document.querySelector(".initGame");