let xp = 0;
let health = 100;
let gold = 200;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
let playerspells = 0;
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
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText =document.querySelector("#monsterHealth");
const image = document.querySelector("#image");
const weapons = [
  { 
    name: 'stick', 
    power: 5,
    enchanted: false
  },
  { 
    name: 'dagger', 
    power: 30,
    enchanted: false
  },
  { 
    name: 'claw hammer', 
    power: 50,
    enchanted: false
  },
  { 
    name: 'sword', 
    power: 100,
    enchanted: false
  }
];
const magic = [
  {
    name: "fire",
    power: 100
  },
  {
    name: "ice",
    power: 200
  },
  {
    name: "lightning",
    power: 300
  },
  {
    name: "earth",
    power: 400
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
    name: "Fanged Beast",
    level: 8,
    health: 60,
    image: "./img/fangedbeast.png"
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
const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"Store\".",
        image: "./img/town.png"
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store.",
        image: "./img/store.png"

    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters.",
        image: "./img/cave.png"
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster."
    },
    {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, easterEgg],
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.',
        image: "./img/win.png"
    },
    {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You were defeated. ☠️",
        image: "./img/lose.png"
    },
    { 
        name: "win", 
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
        "button functions": [restart, restart, restart], 
        text: "You defeat the dragon! YOU WIN THE GAME! 🎉",
        image: "./img/victory.png"
    },
    {
        name: "easter egg",
        "button text": ["2", "8", "Go to town square?"],
        "button functions": [pickTwo, pickEight, goTown],
        text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!",
        image: "./img/minigame.png"
    },
    {
      name: "sorcerer",
      "button text": ["Buy Spell (100 Gold)", "Enchant Weapon (50 Gold)", "Go to town square"],
      "button functions": [buySpell, enchantWeapon, goTown],
      text: "You encounter a sorcerer. He gifts you the fire spell for defeating the dragon.",
      image: "./img/sorcerer.png"
    }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
  image.src = location.image;
}

function goTown() {
  update(locations[0]);
  if (gameCounter == 1) {
    button4.style.display = "inline-block";
    button4.onclick = fightDemon;
    text.innerText = "You see a sorcerer has visited the town.";
    button5.style.display = "inline-block";
    button5.onclick = goSorcerer;
  }
}

function goStore() {
  update(locations[1]);
  button4.style.display = "none";
  button5.style.display = "none";
}

function goCave() {
  update(locations[2]); 
  button4.style.display = "none";
  button5.style.display = "none";
}

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

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

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

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}
function fightDemon() {
  fighting = 3;
  goFight();
}
function goFight() {
  update(locations[3]);
  image.src = monsters[fighting].image;
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  button5.style.display = "none";
  if (spells.length > 0) {
    button4.style.display = "inline-block";
    button4.onclick = goTown;
    button4.innerText = "Run";
    button3.onclick = magicAttack;
    button3.innerText = "Magic";
  } else {
    button4.style.display = "none";
  }
}

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
    fighting >=2 ? winGame() : defeatMonster();
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function magicAttack() {
  text.innerText = "You attack the " + monsters[fighting].name + " with your " + spells[playerspells] + ".";
  monsterHealth -= magic[playerspells].power;
  monsterHealthText.innerText = monsterHealth;
  if (monsterHealth <= 0) {
    fighting >=2 ? winGame() : defeatMonster();
  }
}

function defeatMonster() {
  update(locations[4]);
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  let levelCap = 10;
  console.log(xp);
  if (xp >= levelCap) {
    level++;
    xp = xp - levelCap;
    text.innerText += " You leveled up to level " + level + "!" + " You gained xp " + xp;
    health += 10;
    levelCap = Math.floor(levelCap *= 1.5);
  }
  levelText.innerText = level;
  xpText.innerText = xp;
  button4.style.display = "none";
  button5.style.display = "none";
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
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  levelText.innerText = level;
  gameCounter = 1;
  goTown();
}

function goSorcerer() {
  update(locations[8]);
  button4.style.display = "none";
  button5.style.display = "none";
  if (spells.length == 0){
    let newSpell = magic[playerspells].name;
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
      let newSpell = magic[playerspells].name;
      text.innerText = "You now have a " + newSpell + " spell.";
      spells.push(newSpell);
      text.innerText += " In your grimmoire you have: " + spells;
  } else {
    text.innerText = "You do not have enough gold to buy a spell.";
    }
  }else {
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


function easterEgg() {
  update(locations[7]);
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