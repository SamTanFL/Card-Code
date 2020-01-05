//===============================================Player Stuff===============================================
//An object to keep track of player stats
var player = {
    health: 100,
    maxHealth: 100,
    shields: 0,
    naturalDraw: 5,
    addDraw: 0,
    money: 0, //might use at a later time
    playerState: {
        debuff: [],
        buff: []
    },
    progress: 0
};

var turnDraw;

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
var cardsInDraft = [];
var cardToDraft;



//==========================================Enemy Stuffs====================================================
//An object to store the different types of enemies you will encounter
var enemies = {
    normal: [
    {
        name: "Mr.Sticks",
        health: 30,
        maxHealth: 30,
        shields: 0,
        enemyID: 0,
        imgID: 0,
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
        enemyID: 1,
        imgID: 1,
        status: {
            debuff: [],
            buff: []
        }
    },
    {
        name: "Stick Dog",
        health: 25,
        maxHealth: 25,
        shields: 0,
        enemyID: 2,
        imgID: 2,
        status: {
            debuff: [],
            buff: []
        }
    }
    ],
    elites: [
    {
        name: "Bigus Badus",
        health: 50,
        maxHealth: 50,
        shields: 0,
        enemyID: 0,
        imgID: 3,
        status: {
            debuff: [],
            buff: []
        }
    }
    ],
    bosses: [
    {
        name: "The Great Round One",
        health: 314.159,
        maxHealth: 314.159,
        shields: 0,
        enemyID: 0,
        imgID: 4,
        status: {
            debuff: [],
            buff: []
        }
    }
    ]
};


var currentEnemy;
var currentActions;
var turnAction;


//Actions that the enemies can take will be stored here in an object for the different types
var enemyActions = {
    normal: [
    [[0, 8], [1, 4], [2, 8, 4]],//Mr.Stick's actions
    [[0, 4], [1, 8], [2, 4, 8]], //Mrs.Stick's actions
    [[0, 10], [0, 10], [2, 8, 3]] //Stick Dog's actions
    ],
    elites: [
    [[0, 10], [1, 10], [2, 6, 6]] //bigus badus actions
    ],
    bosses: [
    [[0,10], [0,10], [1,10], [2,8,8]] //Round One's actions
    ]
}







//=======================================Map Stuffs=========================================================
var mapLayout = [0, 0, 1, 3, 0, 4, 0, 1, 3, 2] // may try to randomize & have multiple paths in the future.

var mapPosition = 0; //to track where the player is.








//========================================MISC==============================================================
//For random Numbers
var ranNum;





//Finding my page elements
var container = document.querySelector(".container");
var initGameButton = document.querySelector(".initGame");
var restScreen;