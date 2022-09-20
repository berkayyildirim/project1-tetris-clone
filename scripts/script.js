class Game {
  constructor() {
    this.obstacles = []; //will store instances of the class Obstacle
    this.freezeObstacles = [];
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
    }, 100);
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
          let board = document.getElementById("board");
          let boardStyle = window.getComputedStyle(board);
          const leftLine = 50 - this.convertPXToVW(boardStyle.width) / 2;
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
            this.obstacles[i].moveDown();
          }
        }
      }
    });
  }
}

class Obstacle {
  constructor() {
    this.width = 10;
    this.height = 10;
    this.positionX = 50;
    //this.positionX = Math.floor(Math.random() * (100 - this.width + 1)); // random number between 0 and 100-width
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
    this.positionX--;
    this.domElement.style.left = this.positionX + "vw";
  }
  moveRight() {
    this.positionX++;
    this.domElement.style.left = this.positionX + "vw";
  }
  moveDown() {
    this.positionY--;
    this.domElement.style.bottom = this.positionY + "vh";
  }
}

const game = new Game();
game.start();
