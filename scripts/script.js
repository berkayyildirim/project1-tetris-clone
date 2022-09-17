class Game {
  constructor() {
    this.obstacles = []; //will store instances of the class Obstacle
  }
  start() {
    const newObstacle = new Obstacle();
    this.obstacles.push(newObstacle);

    //Time Interval to move obstacle
    setInterval(() => {
      this.obstacles.forEach((obstacleInstance) => {
        obstacleInstance.moveDown(); //move
      });
    }, 1000);
  }
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
  moveDown() {
    this.positionY--;
    this.domElement.style.bottom = this.positionY + "vh";
  }
}

const game = new Game();
game.start();
