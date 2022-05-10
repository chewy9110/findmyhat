/*
     JFSD Assessment 03 - Javascript
     Author : Chew KB
     Date   : 10/05/2022

     to run : 
     at Visual Studio Code terminal, run 
         npm run main 
*/

const prompt = require('prompt-sync')({ sigint: true });
const clear = require('clear-screen');

// global 
const fieldCharacter = '░';
const pathCharacter = '*';
const hatCharacter = "^";
const holeCharacter = "o";


class Field {

  field = [];

  // field dimension
  row = 10;
  col = 10;

  // to give output message    
  msgLine = "";

  // current location of the pathCharacter
  star = { x: 0, y: 0 };

  constructor() {
 
    // init Game
    this.generateGame();
  }

  // init game
  generateGame() {
    this.generateField();
    this.placeStar();
    this.generateHat();
    this.generateHole();
  }

  // init Field 
  generateField() {
    const row = this.row;
    const col = this.col;
    const field = this.field;

    for (let a = 0; a < row; a++) {
      field[a] = [];
    }

    for (let y = 0; y < row; y++) {
      for (let x = 0; x < col; x++) {
        // const prod = Math.random();
        field[y][x] = fieldCharacter;
      };
    };
  } // generateField


  // randomise hat position
  generateHat() {
    const row = this.row;
    const col = this.col;

    let hatX = Math.floor(Math.random() * row);
    let hatY = Math.floor(Math.random() * col);

    // place hat if cell is not occupied
    if (this.field[hatX][hatY] == fieldCharacter) {
      this.field[hatX][hatY] = hatCharacter;
    }

  } // generateHat


  // place the pathCharacter
  placeStar() {

    let { x, y } = this.star;
    this.field[x][y] = pathCharacter;
  } // placeStar

  //clear the previous star position
  clearStar() {

    let { x, y } = this.star;
    this.field[x][y] = fieldCharacter;
  }


  // init and randomise holes 
  generateHole() {
    const row = this.row;
    const col = this.col;

    // max holes not greater than field size
    let maxHoles = Math.floor(Math.random() * row * col);
    let holeX = 0;
    let holeY = 0;
    for (let i = 0; i < maxHoles; i++) {
      //    hole may be found on same cell due to randomisation. 
      //    ignore to simplify coding

      holeX = Math.floor(Math.random() * row);
      holeY = Math.floor(Math.random() * col);
      // exclude hat pos and star pos i.e. fieldCharacter = not occupied
      if (this.field[holeX][holeY] == fieldCharacter) {
        this.field[holeX][holeY] = holeCharacter;  //place hole
      };
    }

  } // generateHole

  // checkStarRange - check new star position and give message
  checkStarRange() {
    const row = this.row;
    const col = this.col;
    const field = this.field;

    let { x, y } = this.star;

    let retStat = false;

    // outOfbound
    if (((x < 0) || (x >= row) ||
      (y < 0) || (y >= col))) {
      this.msgLine = "Out of bounds - Game End!"; // msgLine is class var.
      retStat = true; // exit loop indicator
    } else if (field[x][y] == holeCharacter) {
      // fallIntoHole
      this.placeStar(); // place the star
      this.msgLine = "Sorry, you fell down a hole!";  // msgLine is class var.
      retStat = true; // exit loop indicator
    }
    else if (this.field[x][y] == hatCharacter) {
      //foundTheHat
      this.placeStar();  // place the star
      this.msgLine = "Congrats, you found your hat!";   // msgLine is class var.
      retStat = true; //  exit loop indicator
    }
    else {
      // move the star to new position
      this.placeStar();
    }
    return (retStat)
  } // end of checkStarRange

  // check keyboard char
  moveStarPosition(promptChar) {
    // Up = u key, Down = d key, Left = l key, Right = r key
    let retStat = false; // // 'false' to indicate loop prompt
    switch (promptChar) {
      case 'U':
        this.clearStar(); // clear current star position
        this.star.x -= 1;
        retStat = this.checkStarRange(); // check new star position
        break;
      case 'D':
        this.clearStar();  // clear current star position
        this.star.x += 1;
        retStat = this.checkStarRange();  // check new star position
        break;
      case 'L':
        this.clearStar(); // clear current star position
        this.star.y -= 1;
        retStat = this.checkStarRange();  // check new star position
        break;
      case 'R':
        this.clearStar(); // clear current star position
        this.star.y += 1;
        retStat = this.checkStarRange(); // check new star position
        break;
      default:
        this.msgLine = "Enter (u, d, l or r)"; // msgLine is class var.
    }

    return (retStat);

  } // end of moveStarPosition


  runGame() {

    let exitGame = false;
    let promptChar = "";
    let retStat = "";
    this.msgLine = "Enter (u, d, l or r)"; // msgLine is class var.

    while (!exitGame) {
      this.print();
      promptChar = this.askQuestion();

      retStat = this.moveStarPosition(promptChar);
      exitGame = (retStat) ? true : false; // loop if false
    }

    this.print();  // last msg to print out of loop 

  } // end of runGame

  print() {
    clear();
    const displayString = this.field.map(row => {
      return row.join('');
    }).join("\n");

    // console.log("Find your hat game application");
    console.log(displayString); // display field map
    console.log(this.msgLine); // msgLine is class var.

  } // end of print

  askQuestion() {
    const answer = prompt('which way?').toUpperCase();
    return (answer);
  } //  end of askQuestion


} // end of  class Field 


// instantiate Game here
const myField = new Field();
myField.runGame();


