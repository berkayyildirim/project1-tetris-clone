class Game {
  constructor() {
    this.obstacles = []; //will store instances of the class Obstacle
    this.freezeObstacles = [];
    this.clearedObstacles = [];
    this.chart = null;
    this.score = 0;
    this.level = 1;
    this.lines = 0;
    this.audioOn = true;
    this.gameInterval;
    this.intervalInMs = 500;
    this.gameStopped = false;
  }
  toggleSound() {
    const audio = document.getElementById("game-music");
    const muteButton = document.getElementById("mute-button");
    if (audio && muteButton) {
      if (this.audioOn) {
        audio.pause();
        muteButton.innerHTML = "MUTED";
      }
      if (!this.audioOn) {
        muteButton.innerHTML = "MUTE";
        audio.play();
      }
      this.audioOn = !this.audioOn;
    }
  }
  start() {
    const newObstacle = new Obstacle();
    this.obstacles.push(newObstacle);
    this.attachEventListeners();
    //Time Interval to move obstacle
    this.startGameInterval();
  }

  clearGameInterval() {
    clearInterval(this.gameInterval);
    this.gameStopped = true;
  }

  startGameInterval() {
    const moveInterval = setInterval(() => {
      this.obstacles.forEach((obstacle) => {
        obstacle.moveDown(); //move
        //Game over
        if (
          this.freezeObstacles.length > 1 &&
          this.freezeObstacles[this.freezeObstacles.length - 1].positionY === 80
        ) {
          clearInterval(moveInterval);
          const gameOverElm = document.getElementById("gameover");
          if (gameOverElm) {
            gameOverElm.style.display = "block";
          }
          console.log("gameover");
        }

        //Line point
        if (this.clearedObstacles.length === 6) {
          this.addLinePoint(1);
        } else if (this.clearedObstacles.length === 12) {
          this.addLinePoint(2);
        } else if (this.clearedObstacles.length === 18) {
          this.addLinePoint(3);
        }

        //Stop the obstacle if it reaches the bottom line
        let board = document.getElementById("board");
        let boardStyle = window.getComputedStyle(board);
        let boardHeightInVh = this.convertPXToVH(boardStyle.height);
        const bottomLine = Math.floor(100 - 10 - boardHeightInVh);
        if (obstacle.positionY <= bottomLine) {
          obstacle.domElement.style.bottom = bottomLine + "vh";
          this.freezeObstacle(obstacle);
          this.removeObstacle(obstacle);
          this.createObstacle();
        }
        //Stop the obstacle if there is a collision
        this.freezeObstacles.forEach((freezeObstacle) => {
          if (
            obstacle.positionY ===
              freezeObstacle.positionY + freezeObstacle.height &&
            obstacle.positionX + obstacle.width > freezeObstacle.positionX &&
            obstacle.positionX < freezeObstacle.positionX + obstacle.width
          ) {
            obstacle.domElement.style.bottom =
              freezeObstacle.positionY + freezeObstacle.height + "vh";
            this.freezeObstacle(obstacle);
            this.removeObstacle(obstacle);
            this.createObstacle();
          }
        });

        //Remove bottom line 10 if there are 6 obstacles in the bottom line 10
        let countBottomLine10 = 0;
        for (let i = 0; i < this.freezeObstacles.length; i++) {
          if (this.freezeObstacles[i].positionY === 10) {
            countBottomLine10++;
          }
        }
        // If the count is 6 and the positionY === 10 then remove all those elements
        if (countBottomLine10 === 6) {
          let filteredFreezeArray = this.freezeObstacles.filter(
            (item) => item.positionY === 10
          );

          //From freeze array to remove array
          filteredFreezeArray.forEach((filteredObstacle) => {
            this.clearedObstacles.push(filteredObstacle);
            filteredObstacle.domElement.style.backgroundColor = "#777670";
            filteredObstacle.domElement.remove();
          });
          this.freezeObstacles.forEach((freezeObstacle) => {
            if (freezeObstacle.positionY > 10) {
              freezeObstacle.domElement.style.bottom =
                freezeObstacle.positionY - freezeObstacle.height + "vh";
            }
          });
        }
        //Remove bottom line 15 if there are 6 obstacles in the bottom line 15
        let countBottomLine15 = 0;
        for (let i = 0; i < this.freezeObstacles.length; i++) {
          if (this.freezeObstacles[i].positionY === 15) {
            countBottomLine15++;
          }
        }
        // If the count is 6 and the positionY === 15 then remove all those elements
        if (countBottomLine15 === 6) {
          let filteredFreezeArray = this.freezeObstacles.filter(
            (item) => item.positionY === 15
          );
          //From freeze array to remove array
          filteredFreezeArray.forEach((filteredObstacle) => {
            this.clearedObstacles.push(filteredObstacle);
            filteredObstacle.domElement.style.backgroundColor = "#777670";
            filteredObstacle.domElement.remove();
          });
          this.freezeObstacles.forEach((freezeObstacle) => {
            if (freezeObstacle.positionY > 15) {
              freezeObstacle.domElement.style.bottom =
                freezeObstacle.positionY - freezeObstacle.height + "vh";
            }
          });
        }

        //Remove bottom line 20 if there are 6 obstacles in the bottom line 20
        let countBottomLine20 = 0;
        for (let i = 0; i < this.freezeObstacles.length; i++) {
          if (this.freezeObstacles[i].positionY === 20) {
            countBottomLine20++;
          }
        }
        // If the count is 6 and the positionY === 20 then remove all those elements
        if (countBottomLine20 === 6) {
          let filteredFreezeArray = this.freezeObstacles.filter(
            (item) => item.positionY === 20
          );
          //From freeze array to remove array
          filteredFreezeArray.forEach((filteredObstacle) => {
            this.clearedObstacles.push(filteredObstacle);
            filteredObstacle.domElement.style.backgroundColor = "#777670";
            filteredObstacle.domElement.remove();
          });
          this.freezeObstacles.forEach((freezeObstacle) => {
            if (freezeObstacle.positionY > 20) {
              freezeObstacle.domElement.style.bottom =
                freezeObstacle.positionY - freezeObstacle.height + "vh";
            }
          });
        }

        //Remove bottom line 25 if there are 6 obstacles in the bottom line 25
        let countBottomLine25 = 0;
        for (let i = 0; i < this.freezeObstacles.length; i++) {
          if (this.freezeObstacles[i].positionY === 25) {
            countBottomLine25++;
          }
        }
        // If the count is 6 and the positionY === 25 then remove all those elements
        if (countBottomLine25 === 6) {
          let filteredFreezeArray = this.freezeObstacles.filter(
            (item) => item.positionY === 25
          );
          //From freeze array to remove array
          filteredFreezeArray.forEach((filteredObstacle) => {
            this.clearedObstacles.push(filteredObstacle);
            filteredObstacle.domElement.style.backgroundColor = "#777670";
            filteredObstacle.domElement.remove();
          });
          this.freezeObstacles.forEach((freezeObstacle) => {
            if (freezeObstacle.positionY > 25) {
              freezeObstacle.domElement.style.bottom =
                freezeObstacle.positionY - freezeObstacle.height + "vh";
            }
          });
        }

        //Remove bottom line 30 if there are 6 obstacles in the bottom line 30
        let countBottomLine30 = 0;
        for (let i = 0; i < this.freezeObstacles.length; i++) {
          if (this.freezeObstacles[i].positionY === 30) {
            countBottomLine30++;
          }
        }
        // If the count is 6 and the positionY === 30 then remove all those elements
        if (countBottomLine30 === 6) {
          let filteredFreezeArray = this.freezeObstacles.filter(
            (item) => item.positionY === 30
          );
          //From freeze array to remove array
          filteredFreezeArray.forEach((filteredObstacle) => {
            this.clearedObstacles.push(filteredObstacle);
            filteredObstacle.domElement.style.backgroundColor = "#777670";
            filteredObstacle.domElement.remove();
          });
          this.freezeObstacles.forEach((freezeObstacle) => {
            if (freezeObstacle.positionY > 30) {
              freezeObstacle.domElement.style.bottom =
                freezeObstacle.positionY - freezeObstacle.height + "vh";
            }
          });
        }

        //Remove bottom line 35 if there are 6 obstacles in the bottom line 35
        let countBottomLine35 = 0;
        for (let i = 0; i < this.freezeObstacles.length; i++) {
          if (this.freezeObstacles[i].positionY === 35) {
            countBottomLine35++;
          }
        }
        // If the count is 6 and the positionY === 35 then remove all those elements
        if (countBottomLine35 === 6) {
          let filteredFreezeArray = this.freezeObstacles.filter(
            (item) => item.positionY === 35
          );
          //From freeze array to remove array
          filteredFreezeArray.forEach((filteredObstacle) => {
            this.clearedObstacles.push(filteredObstacle);
            filteredObstacle.domElement.style.backgroundColor = "#777670";
            filteredObstacle.domElement.remove();
          });
          this.freezeObstacles.forEach((freezeObstacle) => {
            if (freezeObstacle.positionY > 35) {
              freezeObstacle.domElement.style.bottom =
                freezeObstacle.positionY - freezeObstacle.height + "vh";
            }
          });
        }

        //Remove bottom line 40 if there are 6 obstacles in the bottom line 40
        let countBottomLine40 = 0;
        for (let i = 0; i < this.freezeObstacles.length; i++) {
          if (this.freezeObstacles[i].positionY === 40) {
            countBottomLine40++;
          }
        }
        // If the count is 6 and the positionY === 40 then remove all those elements
        if (countBottomLine40 === 6) {
          let filteredFreezeArray = this.freezeObstacles.filter(
            (item) => item.positionY === 40
          );
          //From freeze array to remove array
          filteredFreezeArray.forEach((filteredObstacle) => {
            this.clearedObstacles.push(filteredObstacle);
            filteredObstacle.domElement.style.backgroundColor = "#777670";
            filteredObstacle.domElement.remove();
          });
          this.freezeObstacles.forEach((freezeObstacle) => {
            if (freezeObstacle.positionY > 40) {
              freezeObstacle.domElement.style.bottom =
                freezeObstacle.positionY - freezeObstacle.height + "vh";
            }
          });
        }
      });
    }, this.intervalInMs);
    this.gameInterval = moveInterval;
    this.gameStopped = false;
  }

  //Increase lines
  addLinePoint(point) {
    //Add +1 lines if clearing happens
    const linesElm = document.getElementById("lines");
    linesElm.innerHTML = point;
  }

  //Convert px to vw
  convertPXToVW(px) {
    let pxNumber = Number(px.replace("px", ""));
    return Math.round(pxNumber * (100 / document.documentElement.clientWidth));
  }
  //Convert px to vh
  convertPXToVH(px) {
    let pxNumber = Number(px.replace("px", ""));
    return Math.round(pxNumber * (100 / document.documentElement.clientHeight));
  }

  // Freeze the obstacles
  freezeObstacle(obstacle) {
    this.freezeObstacles.push(obstacle);
  }
  // Add the obstacles
  createObstacle() {
    const newObstacle = new Obstacle();
    this.obstacles.push(newObstacle);
  }
  // Remove the obstacles
  removeObstacle(obstacle) {
    this.obstacles.pop(obstacle);
  }

  // Event listener method for right/left/down
  attachEventListeners() {
    document.addEventListener("keydown", (event) => {
      for (let i = 0; i < this.obstacles.length; i++) {
        if (i === this.obstacles.length - 1) {
          //Define boundaries
          let board = document.getElementById("board");
          let boardStyle = window.getComputedStyle(board);
          // Left boundary
          const leftLine = 50 - this.convertPXToVW(boardStyle.width) / 2;
          //Right boundary
          const rightLine =
            50 +
            this.convertPXToVW(boardStyle.width) / 2 -
            this.obstacles[i].width;
          // Move the i object in the obstacles array

          if (
            event.key === "ArrowLeft" &&
            this.obstacles[i].positionX >= leftLine
          ) {
            this.obstacles[i].moveLeft();
          } else if (
            event.key === "ArrowRight" &&
            this.obstacles[i].positionX <= rightLine
          ) {
            this.obstacles[i].moveRight();
          } else if (event.key === "ArrowDown") {
            this.obstacles[i].moveDownKeyboard();
            this.score = this.score + 5;
            //Add +5 score if ArrowDown happens
            const scoreElm = document.getElementById("score");
            scoreElm.innerHTML = this.score;
            //Add +1 level every 50 score
            if (this.score === 250) {
              this.level = this.level + 1;
              const levelElm = document.getElementById("level");
              levelElm.innerHTML = this.level;
            } else if (this.score === 500) {
              this.level = this.level + 1;
              const levelElm = document.getElementById("level");
              levelElm.innerHTML = this.level;
            } else if (this.score === 750) {
              this.level = this.level + 1;
              const levelElm = document.getElementById("level");
              levelElm.innerHTML = this.level;
            } else if (this.score === 1000) {
              this.level = this.level + 1;
              const levelElm = document.getElementById("level");
              levelElm.innerHTML = this.level;
            }
          }
        }
      }
    });
  }
}

class Obstacle {
  constructor() {
    //Create random width
    //this.width = 5;
    const widthOptions = [5];
    const randomWidth = Math.floor(Math.random() * widthOptions.length);
    this.width = widthOptions[randomWidth];
    //Create random height
    //this.height = 5;
    const heightOptions = [5];
    const randomHeight = Math.floor(Math.random() * heightOptions.length);
    this.height = heightOptions[randomHeight];
    //Create random position x
    //this.positionX = 50;
    const positionXOptions = [35, 40, 45, 50, 55, 60];
    const random = Math.floor(Math.random() * positionXOptions.length);
    this.positionX = positionXOptions[random];
    //Create position y
    this.positionY = 100 - 10 - this.height;
    //First element is null
    this.domElement = null;

    this.createDomElement();
  }

  createDomElement() {
    // create dom element
    this.domElement = document.createElement("div");

    // set id and css
    this.domElement.className = "obstacle";
    this.domElement.style.width = this.width + "vw";
    this.domElement.style.height = this.height + "vh";
    this.domElement.style.bottom = this.positionY + "vh";
    this.domElement.style.left = this.positionX + "vw";

    // append to the dom
    const boardElm = document.getElementById("board");
    boardElm.appendChild(this.domElement);
  }
  moveLeft() {
    this.positionX = this.positionX - this.width;
    this.domElement.style.left = this.positionX + "vw";
  }
  moveRight() {
    this.positionX = this.positionX + this.width;
    this.domElement.style.left = this.positionX + "vw";
  }
  moveDown() {
    this.positionY = this.positionY - this.height;
    this.domElement.style.bottom = this.positionY + "vh";
  }
  moveDownKeyboard() {
    this.positionY = this.positionY - this.height;
    //this.positionY = this.positionY - this.height * 2;
    this.domElement.style.bottom = this.positionY + "vh";
  }

  //Convert px to vw
  convertPXToVW(px) {
    let pxNumber = Number(px.replace("px", ""));
    return pxNumber * (100 / document.documentElement.clientWidth);
  }
  //Convert px to vh
  convertPXToVH(px) {
    let pxNumber = Number(px.replace("px", ""));
    return pxNumber * (100 / document.documentElement.clientHeight);
  }
}

//To initialize the game
const game = new Game();

//To start the game
const startButton = document.getElementById("start-button");
startButton.onclick = function () {
  game.start();
  startButton.style.display = "none";
};

//To manage the sound
const muteButton = document.getElementById("mute-button");
muteButton.onclick = function () {
  game.toggleSound();
};

//To manage the game
document.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    game.toggleSound();
    if (game.gameStopped) {
      game.startGameInterval();
    } else {
      game.clearGameInterval();
    }
  }
});
