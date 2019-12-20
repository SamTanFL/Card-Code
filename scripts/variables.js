//===============================================Player Stuff===============================================
//An object to keep track of player stats
var player = {
    health: 100,
    maxHealth: 100,
    energy: 3,
    maxEnergy: 3,
    shields: 0,
    handLimit: 5,
    money: 0, //might use at a later time
    playerState: {
        debuff: [],
        buff: []
    },
    progress: 0
};


//Not sure if this will be kept but an array for the different status effects
var status = [];



//===============================================Card Stuff==================================================
//An array to store the different card types and their states
var cards = [
    {
        cardID: 0,
        cardName: "Attack",
        cardCost: 1,
        cardType: 1,
        cardEff: 5,
        cardDesc: "For testing purpose. Attack",
        cardAdd: false
    },
    {
        cardID: 1,
        cardName: "Block",
        cardCost: 1,
        cardType: 2,
        cardEff: 5,
        cardDesc: "For testing purpose. Block",
        cardAdd: false
    },
    {
        cardID: 2,
        cardName: "MultiStrike",
        cardCost: 1,
        cardType: 1,
        cardEff: 3,
        cardDesc: "For testing purpose. Can I do it?",
        cardAdd: "multi 3"
    }
];

var cardsInPlay = [];
var cardsInSession = [];
var cardsInDeck = [];
var cardsInHand = [];








//==========================================Enemy Stuffs=====================================================
//An object to store the different types of enemies you will encounter
var enemies = {
    normal: [
    {
        name: "Some Long String",
        health: 100,
        maxHealth: 100,
        type: 1
    },
    {
        name: "Some Floaty Floats",
        health: 100,
        maxHealth: 100,
        type: 2
    }
    ],
    elites: [],
    bosses: []
};












//=========================================MISC==============================================================
//Finding my page elements
var container = document.querySelector(".container");
var initGameButton = document.querySelector(".initGame");