class Game {
  constructor() {
    this.obstacles = []; //will store instances of the class Obstacle
  }
  start() {
    const newObstacle = new Obstacle();
    this.obstacles.push(newObstacle);
    this.attachEventListeners();

    //Time Interval to move obstacle
    const moveInterval = setInterval(() => {
      for (let i = 0; i < this.obstacles.length; i++) {
        if (this.obstacles[i].positionY > 0) {
          this.obstacles[i].moveDown(); //move
          if (this.obstacles[i].positionY === 0) {
            this.obstacles[i].positionY === 0;
            this.createObstacleAfterFirstObstacle();
            break;
          }
        }
      }
    }, 100);
  }

  //Add obstacle when the first obstacle reach to the bottom line
  createObstacleAfterFirstObstacle() {
    const newObstacle = new Obstacle();
    this.obstacles.push(newObstacle);
  }

  // Event listener method for right/left/down
  attachEventListeners() {
    document.addEventListener("keydown", (event) => {
      for (let i = 0; i < this.obstacles.length; i++) {
        if (i === this.obstacles.length - 1) {
          if (event.key === "ArrowLeft") {
            this.obstacles[i].moveLeft();
          } else if (event.key === "ArrowRight") {
            this.obstacles[i].moveRight();
          } else if (event.key === "ArrowDown") {
            this.obstacles[i].moveDown();
          }
        }
      }
    });
  }

  //Clear move interval
  //   stopObstacleIfBottomLine(obstacleInstance) {
  //     if (obstacleInstance.positionY === 0) {
  //       console.log("bottom line");
  //     }
  //   }
}

class Obstacle {
  constructor() {
    this.width = 10;
    this.height = 10;
    this.positionX = Math.floor(Math.random() * (100 - this.width + 1)); // random number between 0 and 100-width
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
