class player{
    constructor(name)
    {
        this.playerName = name;
        this.health = 40;
        this.healsRemaining = 2;
        this.wins = 0;
    }

    heal()
    {
        this.healsRemaining--;
        this.health += this.generateHeal;
    }

    generateHeal()
    {
        return Math.floor(Math.random()*10)+1;
    }

    generateDamage()
    {
        return Math.floor(Math.random()*3)+1;
    }
}

class grant{
    constructor()
    {
        this.name = "Grant";
        this.health = 10;
    }

    generateDamage()
    {
        return Math.floor(Math.random()*5)+1;
    }
}

let thePlayer;
let theEnemy;

let startButton = document.getElementById("startButton");
startButton.onclick = function ()
{
    document.getElementById("parentContainer").style.display = "none";
    let gameContainer = document.getElementById("gameContainer");
    gameContainer.style.display = "flex";
    gameContainer.style.flexDirection = "column";
    gameContainer.style.flexWrap = "wrap";
    let playerName = prompt("What is your name?");
    thePlayer = new player(playerName);
    theEnemy = new grant();    
}

let attackButton = document.getElementById("AttackButton");
attackButton.onclick = function ()
{
    let playerDmg = thePlayer.generateDamage();
    let grantDmg = theEnemy.generateDamage();

    thePlayer.health -= grantDmg;
    let pBar = document.getElementById("healthProgressBar");
    pBar.style.background = `linear-gradient(to right, #ffdd97 0%,#ffdd97 ${thePlayer.health*2.5}%,#97ffd7 ${thePlayer.health*2.5}%,#97ffd7 100%)`;
    pBar.innerText = `Health ${thePlayer.health}/40`;

    theEnemy.health -= playerDmg;
    let pBarGrant = document.getElementById("grantHealthProgressBar");
    pBarGrant.style.background = `linear-gradient(to right, #ffdd97 0%,#ffdd97 ${theEnemy.health*10}%,#97ffd7 ${theEnemy.health*10}%,#97ffd7 100%)`;
    pBarGrant.innerText = `Health ${theEnemy.health}/10`;
    
    if(thePlayer.health < 1)
    {
        updateText(`GRANT HAS CRUSHED ${thePlayer.playerName}`, true);
        return;
    }

    if(theEnemy.health < 1)
    {
        thePlayer.wins++;
        changeWinLevel(thePlayer.wins);
        if(thePlayer.wins > 4)
        {
            updateText(`${thePlayer.playerName} IS VICTORIOUS!`, true);
        }
        else
        {
            updateText(`${thePlayer.playerName} has defeated ${theEnemy.name}!!`)
            updateText(`${theEnemy.name} attacks for ${grantDmg} bringing ${thePlayer.playerName} to ${thePlayer.health}`);
        }
    }
    else
    {
        updateText(`${theEnemy.name} attacks for ${grantDmg} bringing ${thePlayer.playerName} to ${thePlayer.health}`);
        updateText(`${thePlayer.playerName} attacks for ${playerDmg} bringing ${theEnemy.name} to ${theEnemy.health}`);    
    }
};

let healButton = document.getElementById("HealButton");
healButton.onclick = function ()
{
    let totalHealAmount = thePlayer.generateHeal();
    thePlayer.healsRemaining--;
    if(thePlayer.healsRemaining===0)
    {
        healButton.disabled = true;
    }
    thePlayer.health += totalHealAmount;
    let pBar = document.getElementById("healthProgressBar");
    pBar.style.background = `linear-gradient(to right, #ffdd97 0%,#ffdd97 ${thePlayer.health*2.5}%,#97ffd7 ${thePlayer.health*2.5}%,#97ffd7 100%)`;
    pBar.innerText = `Health ${thePlayer.health}/40`;
    updateText(`${thePlayer.playerName} heals for ${totalHealAmount}`);
}

function changeWinLevel(winLevel)
{BarGrant.innerText = `Health ${theEnemy.health}/10`;
    
    let pBarWins = document.getElementById("winsProgressBar");
    pBarWins.style.background = `linear-gradient(to right, #ffdd97 0%,#ffdd97 ${winLevel*20}%,#97ffd7 ${winLevel*20}%,#97ffd7 100%)`;
    pBarWins.innerText = `Wins ${winLevel}/5`;
}

function updateText(msg, final = false)
{
    let tDiv = document.getElementById("gameStatus");
    if(!final)
        tDiv.value = msg + "\n" + tDiv.value + "\n";
    else
    {
        tDiv.style.fontSize = "2em";
        tDiv.value = msg;    
    }
}