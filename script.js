let xp = 0;
let health = 100;
let gold = 500;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = [  { 
  name: 'Stick', 
  power: 5,
  enchanted: false,
  img: '<i class="fa-solid fa-slash"></i>'
}];
let playerspells = 0;
let playerMana = 100;
let spells =[];
let gameCounter = 1;
let level = 1;

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const button5 = document.querySelector("#button5");

const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const manaText = document.querySelector("#manaText");
const goldText = document.querySelector("#goldText");

const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText =document.querySelector("#monsterHealth");

const image = document.querySelector("#image");

const saveButton = document.querySelector("#saveButton");
const loadButton = document.querySelector("#loadButton");

const inventoryButton = document.querySelector("#inventoryButton");
const closeInventoryButton = document.querySelector("#closeInventoryButton");
const inventoryDiv = document.querySelector("#inventory");
const inventoryList = document.querySelector("#inventoryList");

const spellSelectionDiv = document.querySelector("#spellSelection");
const spellList = document.querySelector("#spellList");
const closeSpellWindowButton = document.querySelector("#closeSpellWindowButton");

const weapons = [
  { 
    name: 'Stick', 
    power: 5,
    enchanted: false,
    img: '<i class="fa-solid fa-slash"></i>'
  },
  { 
    name: 'Dagger', 
    power: 30,
    enchanted: false,
    img: '🗡️'
  },
  { 
    name: 'War hammer', 
    power: 50,
    enchanted: false,
    img: '🔨'
  },
  { 
    name: 'Sword', 
    power: 100,
    enchanted: false,
    img: '⚔️'
  }
];
const magic = [
  {
    name: "Fire ball",
    power: 100,
    mana: 30,
    img: '🔥'
  },
  {
    name: "Ice shards",
    power: 200,
    mana: 50,
    img: '❄️'
  },
  {
    name: "Lava burst",
    power: 300,
    mana: 70,
    img:'🌋'

  },
  {
    name: "Lightning Storm",
    power: 400,
    mana: 90,
    img: '⚡'
  }
];
const monsters = [
  {
    name: "Slime",
    level: 2,
    health: 15,
    image: "./img/slime.png"
  },
  {
    name: "Goblin",
    level: 5,
    health: 30,
    image: "./img/goblin.png"
  },
  {
    name: "Fanged Beast",
    level: 8,
    health: 60,
    image: "./img/fangedbeast.png"
  },
  {
    name: "Ogre",
    level: 15,
    health: 100,
    image: "./img/ogre.png"
  },
  {
    name: "Goblin King",
    level: 20,
    health: 200,
    image: "./img/goblinking.png"
  },
  {
    name: "Dragon",
    level: 20,
    health: 300,
    image:"./img/dragon.png"
  },
  {
    name: "Demon",
    level: 50,
    health: 1000,
    image: "./img/demon.png"
  }
]
const monsterEncounter =[fightSlime, fightGoblin, fightBeast, fightOgre, fightGoblinKing];

const locations = [
    {
        name: "town square",
        "button text": ["🛖 Go to store ", "🕳️ Go to cave", " 🐲 Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"Store\".",
        image: "./img/town.png"
    },
    {
        name: "store",
        "button text": ['Buy 10 health (10 <i class="fa-solid fa-coins">)', 
        'Buy 10 Mana (30 <i class="fa-solid fa-coins">)', 
        'Buy Weapon (30 <i class="fa-solid fa-coins">)'],
        "button functions": [buyHealth, buyMana, buyWeapon],
        text: "You enter the store.",
        image: "./img/store.png"

    },
    {
        name: "cave",
        "button text": ["Take the left path", "Take the right path", "🏘️Go to town square"],
        "button functions": [randomMonsterEncounter, randomMonsterEncounter, goTown],
        text: "You enter the cave. You see the cave splits into two paths.",
        image: "./img/cave.png"
    },
    {
        name: "fight",
        "button text": ["⚔️ Attack", "🛡️ Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster."
    },
    {
        name: "kill monster",
        "button text": [" 🏘️ Go to town square", "🏘️ Go to town square", "🏘️ Go to town square"],
        "button functions": [goTown, goTown, easterEgg],
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.',
        image: "./img/win.png"
    },
    {
        name: "lose",
        "button text": ["🔁 REPLAY?", "🔁 REPLAY?", "🔁 REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You were defeated. ☠️",
        image: "./img/lose.png"
    },
    { 
        name: "win", 
        "button text": ["🏘️ Go to Town square", "🏘️ Go to Town square", "🃏 Go to Town square"], 
        "button functions": [goTown, goTown, easterEgg], 
        text: "You defeat the dragon! YOU WIN THE GAME! 🎉",
        image: "./img/victory.png"
    },
    {
        name: "easter egg",
        "button text": ["2️⃣", "8️⃣", "🏘️ Go to town square?"],
        "button functions": [pickTwo, pickEight, goTown],
        text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!",
        image: "./img/minigame.png"
    },
    {
      name: "sorcerer",
      "button text": ["🪄 Buy Spell (100 Gold)", "⚔️ Enchant Weapon (50 Gold)", "🏘️ Go to town square"],
      "button functions": [buySpell, enchantWeapon, goTown],
      text: "You encounter a sorcerer. He gifts you the fire spell for defeating the dragon.",
      image: "./img/sorcerer.png"
    }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
saveButton.onclick = saveGame;
loadButton.onclick = loadGame;
saveButton.style.display = "inline-block";
loadButton.style.display = "inline-block";
inventoryButton.style.display = "inline-block";

//Inventory Functions
inventoryButton.addEventListener("click", function() {
  updateInventoryList();
  inventoryDiv.style.display = "block";
});

closeInventoryButton.addEventListener("click", function() {
  inventoryDiv.style.display = "none";
});

function updateInventoryList() {
  inventoryList.innerHTML = "";

  inventory.forEach(item => {
    let listItem = document.createElement("li");
    listItem.innerHTML = item.img + ' ' + item.name; 
    inventoryList.appendChild(listItem);
  });

  spells.forEach(spell => {
    let listItem = document.createElement("li");
    listItem.innerHTML = spell.img + ' ' + spell.name; 
    inventoryList.appendChild(listItem);
  });
}
//Function to update the game locations from the array location
function update(location) {
  monsterStats.style.display = "none";
  button1.innerHTML = location["button text"][0];
  button2.innerHTML = location["button text"][1];
  button3.innerHTML = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
  image.src = location.image;
}
//Function to save and load the game 
function saveGame() {
  const gameState = {
      xp: xp,
      health: health,
      gold: gold,
      currentWeapon: currentWeapon,
      inventory: inventory,
      playerspells: playerspells,
      spells: spells,
      gameCounter: gameCounter,
      level: level
  };

  localStorage.setItem('gameState', JSON.stringify(gameState));
  alert('Game saved!');
}
function loadGame() {
  const savedState = localStorage.getItem('gameState');

  if (savedState) {
      const gameState = JSON.parse(savedState);
      xp = gameState.xp;
      health = gameState.health;
      gold = gameState.gold;
      currentWeapon = gameState.currentWeapon;
      inventory = gameState.inventory;
      playerspells = gameState.playerspells;
      spells = gameState.spells;
      gameCounter = gameState.gameCounter;
      level = gameState.level;

      updateUI(); 
      alert('Game loaded!');
  } else {
      alert('No saved game found.');
  }
}
function updateUI() {
  xpText.innerText = xp;
  healthText.innerText = health;
  goldText.innerText = gold;
  levelText.innerText = level;
}

//Function to go to the town square. 
function goTown() {
  update(locations[0]);
  saveButton.style.display = "inline-block";
  loadButton.style.display = "inline-block";
  if (gameCounter >= 1) {
    button4.style.display = "inline-block";
    button4.innerText = "💀 Fight Demon";
    button4.onclick = fightDemon;
    text.innerText = "You see a sorcerer has visited the town.";
    button5.style.display = "inline-block";
    button5.onclick = goSorcerer;
  } else {
    button4.style.display = "none";
    button5.style.display = "none";
  }
}
//Function to go to the store
function goStore() {
  update(locations[1]);
  button4.style.display = "inline-block"; 
  button4.innerText = "Go to town square";
  button4.onclick = goTown;
  button5.style.display = "none";
  saveButton.style.display = "none";
  loadButton.style.display = "none";
}

//Function to go to the cave
function goCave() {
  update(locations[2]); 
  button4.style.display = "none";
  button5.style.display = "none";
  saveButton.style.display = "none";
  loadButton.style.display = "none";
}
//Function to buy health from the store
function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}
//Function to buy mana from the store
function buyMana() {
  if (gold >= 10) {
    gold -= 10;
    playerMana += 10;
    goldText.innerText = gold;
    manaText.innerText = playerMana;
  } else {
    text.innerText = "You do not have enough gold to buy mana.";
  }
}
//Function to buy weapons from the store
function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeaponName = weapons[currentWeapon].name;
      let newWeapon = weapons[currentWeapon];
      text.innerText = "You now have a " + newWeaponName + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: ";
      for (let i = 0; i < inventory.length; i++) {
        text.innerText += inventory[i].name + ", ";
      }
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}
//Function to sell weapons from the store when all weapons are bought
function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}
//Functions to fight various monsters. Picks a random monster from the array monsters
function fightSlime() {
  fighting = 0;
  goFight();
}
function fightGoblin() {
  fighting = 1;
  goFight();
}
function fightBeast() {
  fighting = 2;
  goFight();
}
function fightOgre() {
  fighting = 3;
  goFight();
}
function fightGoblinKing() {
  fighting = 4;
  goFight();
}
function fightDragon() {
  fighting = 5;
  goFight();
}
function fightDemon() {
  fighting = 6;
  goFight();
}
//Function to fight the monster
function goFight() {
  update(locations[3]);
  image.src = monsters[fighting].image;
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  button5.style.display = "none";
  saveButton.style.display = "none";
  loadButton.style.display = "none";
  if (spells.length > 0) {
    button4.style.display = "inline-block";
    button4.onclick = goTown;
    button4.innerText = "🏃 Run";
    button3.style.display = "inline-block";
    button3.onclick = magicAttack;
    button3.innerText = "📕 Magic";
  } else {
    button4.style.display = "none";
  }
}

//Attack Function during fight
function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1 + level*1.5;    
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    fighting >=5 ? winGame() : defeatMonster();
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}
//Function to get the monster attack value
function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  return hit > 0 ? hit : 0;
}
//Function to check if player attack hits
function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}
//Funcktion to dodge attack from monster
function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}
//Function to
function magicAttack() {
  spellSelectionDiv.style.display = "block";
  spellList.innerHTML = "";
  spells.forEach((spell, index) => {
    let listItem = document.createElement("li");
    listItem.innerHTML = spell.img + ' ' + spell.name;
    listItem.addEventListener("click", ()=> useSpell(index));
    spellList.appendChild(listItem);
  });
}
function useSpell(spellIndex) {
  if (playerMana >= magic[spellIndex].mana) {
    playerMana -= magic[spellIndex].mana;
    manaText.innerText = playerMana;
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += "You attack the " + monsters[fighting].name + " with your " + spells[spellIndex].name + ".";
    health -= getMonsterAttackValue(monsters[fighting].level);
    if(isMonsterHit()) {
      monsterHealth -= magic[spellIndex].power + Math.floor(Math.random() * xp) + 1 + level*1.5;
    } else {
      text.innerText += " You miss.";
    }
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (monsterHealth <= 0) {
      fighting >=5 ? winGame() : defeatMonster();
    }
    if (health <= 0) {
      lose();
    } else if (monsterHealth <= 0) {
      fighting >=5 ? winGame() : defeatMonster();
    }
    spellSelectionDiv.style.display = "none";
  } else {
    text.innerText = "You do not have enough mana to cast a spell.";
    spellSelectionDiv.style.display = "none";
  }
}

closeSpellWindowButton.addEventListener("click", function() {
  spellSelectionDiv.style.display = "none";
});

function defeatMonster() {
  update(locations[4]);
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  let levelCap = 10;
  console.log(xp);
  if (xp >= levelCap) {
    level++;
    text.innerText += " You gained " + xp + " xp and leveled up! You are now level " + level + ".";
    xp = xp - levelCap;
    health += 10;
    playerMana+= 50;
    levelCap = Math.floor(levelCap *= 1.5);
  }
  levelText.innerText = level;
  xpText.innerText = xp;
  manaText.innerText = playerMana;
  healthText.innerText = health;
  button4.style.display = "none";
  button5.style.display = "none";
  saveButton.style.display = "none";
  loadButton.style.display = "none";
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
  gameCounter ++;
  button4.style.display = "none";
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  level = 1;
  playerMana = 100;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  manaText.innerText = playerMana;
  healthText.innerText = health;
  xpText.innerText = xp;
  levelText.innerText = level;
  gameCounter = 0;
  button4.style.display = "none";
  button5.style.display = "none";
  goTown();
}

function goSorcerer() {
  update(locations[8]);
  if (spells.length > 1){
    text.innerText = "You visit the sorcerer.";
  }
  button4.style.display = "none";
  button5.style.display = "none";
  saveButton.style.display = "none";
  loadButton.style.display = "none";
  if (spells.length == 0){
    let newSpell = magic[playerspells];
    spells.push(newSpell);
  }
}
function goElement() {
  update(locations[9]);
}
function buySpell() {
  if (playerspells < magic.length - 1) {
    if (gold >= 100) {
      gold -= 100;
      playerspells++;
      goldText.innerText = gold;
      let newSpellName = magic[playerspells].name;
      let newSpell = magic[playerspells];
      text.innerText = "You now have a " + newSpellName + " spell.";
      spells.push(newSpell);
      text.innerText += " In your grimmoire you have: ";
      for (let i = 0; i < spells.length; i++) {
        text.innerText += spells[i].name + ", ";
      }
    } else {
      text.innerText = "You do not have enough gold to buy a spell.";
    }
  } else {
    text.innerText = "You already have the most powerful spell!";
  }
}

function enchantWeapon() {
  if (gold >= 50) {
    weapons[currentWeapon].enchanted = true;
    text.innerText = "Your " + weapons[currentWeapon].name + " is now enchanted!";
    weapons[currentWeapon].power += 50;
    gold -= 50;
    goldText.innerText = gold;
  }else{
    text.innerText = "You do not have enough gold to enchant your weapon.";
    }
  }
function randomMonsterEncounter() {
    const randomIndex = Math.floor(Math.random() * monsterEncounter.length);
    monsterEncounter[randomIndex]();  
  }
  

function easterEgg() {
  update(locations[7]);
  saveButton.style.display = "none";
  loadButton.style.display = "none";
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  let numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.indexOf(guess) !== -1) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}

