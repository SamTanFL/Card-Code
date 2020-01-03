//===============================================Player Stuff===============================================
//An object to keep track of player stats
var player = {
    health: 100,
    maxHealth: 100,
    shields: 0,
    naturalDraw: 5,
    money: 0, //might use at a later time
    playerState: {
        debuff: [],
        buff: []
    },
    progress: 0
};

var playerSession; //used so that to restart I can just clone the player stats again


//Not sure if this will be kept but an array for the different status effects
var status = [];



//==============================================Card Stuff==================================================
//An array to store the different card types and their states
var cards = [
    {
        cardUniqueID: 0,
        cardName: "Attack",
        cardType: 1,
        cardEff: 5,
        cardDesc: "For testing purpose. Attack",
        cardAdd: false
    },
    {
        cardUniqueID: 1,
        cardName: "Block",
        cardType: 2,
        cardEff: 5,
        cardDesc: "For testing purpose. Block",
        cardAdd: false
    },
    {
        cardUniqueID: 2,
        cardName: "MultiStrike",
        cardType: "Multi",
        cardEff: 2,
        cardDesc: "For testing purpose. Can I do it?",
        cardAdd: 3
    }
];

var cardStartDefault = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1];
var cardsInSession = [];
var cardsInDeck = [];
var cardsInHand = [];
var cardsInFlow = [ "empty", "empty", "empty"]; //for referencing what cards do
var cardsInFlowPosition = ["empty", "empty", "empty"]; //used for keeping track where cards came from
var cardsInDiscard = [];



//==========================================Enemy Stuffs====================================================
//An object to store the different types of enemies you will encounter
var enemies = {
    normal: [
    {
        name: "Mr.Sticks",
        health: 20,
        maxHealth: 20,
        shields: 0,
        enemyID: 0,
        status: {
            debuff: [],
            buff: []
        }
    },
    {
        name: "Mrs.Sticks",
        health: 30,
        maxHealth: 30,
        shields: 0,
        enemyID: 1
    }
    ],
    elites: [],
    bosses: []
};


var currentEnemy;
var currentActions;
var turnAction;


//Actions that the enemies can take will be stored here in an object for the different types
var enemyActions = {
    normal: [
    [[0, 5], [1, 5], [2, 4, 4]],//First enemy patterns. the first number denotes the type
    [[0, 3], [1, 8], [2, 4, 8]] //2nd enemy's pattern. more defensive.
    ],
    elites: [],
    bosses: []
}







//=======================================Map Stuffs=========================================================
var mapLayout = [0, 0, 1, 3, 0, 4, 0, 1, 3, 2] // may try to randomize & have multiple paths in the future.










//========================================MISC==============================================================
//For random Numbers
var ranNum;





//Finding my page elements
var container = document.querySelector(".container");
var initGameButton = document.querySelector(".initGame");