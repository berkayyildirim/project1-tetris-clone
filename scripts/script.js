class Game {
  constructor() {
    this.obstacles = []; //will store instances of the class Obstacle
    this.freezeObstacles = [];
    this.chart = null;
    this.score = 0;
    this.level = 1;
    this.lines = 0;
  }
  start() {
    const newObstacle = new Obstacle();
    this.obstacles.push(newObstacle);
    this.attachEventListeners();

    //Time Interval to move obstacle
    const myInterval = setInterval(() => {
      this.obstacles.forEach((obstacle) => {
        obstacle.moveDown(); //move

        //Game over
        if (
          this.freezeObstacles.length > 1 &&
          this.freezeObstacles[this.freezeObstacles.length - 1].positionY === 80
        ) {
          clearInterval(myInterval);
          console.log("gameover");
        }
        //Stop the obstacle if it reaches the bottom line
        let board = document.getElementById("board");
        let boardStyle = window.getComputedStyle(board);
        let boardHeightInVh = this.convertPXToVH(boardStyle.height);
        const bottomLine = 100 - boardHeightInVh;
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
      });
    }, 1000);
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
    this.width = 5;
    this.height = 5;
    //this.positionX = 50;
    const positionXOptions = [35, 40, 45, 50, 55, 60];
    const random = Math.floor(Math.random() * positionXOptions.length);
    this.positionX = positionXOptions[random];
    console.log(this.positionX);
    this.positionY = 90;
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

const game = new Game();
game.start();
