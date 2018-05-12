class player{
    constructor(name)
    {
        this.playerName = name;
        this.health = 40;
        this.healsRemaining = 2;
        this.wins = 0;
    }
}

class grant{
    constructor()
    {
        this.health = 10;
    }
}

let startButton = document.getElementById("startButton");
startButton.onclick = function ()
{
    document.getElementById("parentContainer").style.display = "none";
    let gameContainer = document.getElementById("gameContainer");
    gameContainer.style.display = "flex";
    gameContainer.style.flexDirection = "column";
    gameContainer.style.flexWrap = "wrap";
}