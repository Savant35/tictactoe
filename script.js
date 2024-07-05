window.addEventListener('load', function() {
  tictactoe.start();
});

const tictactoe = {
  board: [],
  htmlBoard: [],

  start(){
    this.board = this.buildBoard();
    this.htmlBoard = this.buildBoard();
    this.buildHtmlBoard();
  },

  buildBoard(){
    const board = [];
    for(let y = 0; y < 3; y++){
      board.push([]);
      for (let x = 0; x < 3; x++) board[y].push(' ');
    }
    return board;
  },

  buildHtmlBoard(){
    const divBoard = document.querySelector('#board'); // Select the HTML element
    divBoard.innerHTML = ''; // Clear any existing content inside the board element

    for (let y = 0; y < 3; y++){
      for (let x = 0; x < 3; x++){
        let field = document.createElement('div'); // Create a div element and assign it to field

        field.classList.add('field'); // Add CSS class field to the div element
        field.setAttribute('data-x', x); // Create custom attributes to store the cell's coordinates
        field.setAttribute('data-y', y);

        field.addEventListener('click', event => this.onClick(event)); // Add event listener for click
        divBoard.appendChild(field); // Add the new element to the parent element
        this.htmlBoard[x][y] = field; // Assign the field to the board array
      }
    }
  },

  onClick(event){
    const clickedField = event.target;
    const x = clickedField.getAttribute('data-x');
    const y = clickedField.getAttribute('data-y');

    if (this.board[x][y] !== ' ') return;

    if (this.isWin(x, y, 'x')) {
      setTimeout(() =>{
 if (confirm('player Wins')); this.start();
      }, 200);
      return;
  }
    
    this.setField(x,y, 'x');

    if (this.boardFull()){
      setTimeout(() =>{
        if (confirm('gameTied')); this.start();
      }, 200);
      return;
    }

   if (this.makeMove() ){
      setTimeout(() =>{
   if (confirm('Computer wins')); this.start();
      }, 200);
      return;
    }
  },

  setField(x,y,val) {
    this.board[x][y] = val;
    this.htmlBoard[x][y].classList.add(val);

  },
  makeMove(player){
    const {maxX, maxY} = this.findBestMove('o')
    this.setField(maxX, maxY, 'o');
    if (this.isWin(maxX, maxY, 'o'))
      return this.isWin(maxX, maxY, 'o');

  },
  findBestMove(player){
    let maxScore = -Number.MAX_VALUE;
    let maxX = 0;
    let maxY =0

    for (let y = 0; y < 3; y++){
      for (let x =0; x <3; x++){
        if (this.board[x][y] !== ' ') continue;

        const {maxScore: score} =  this.simulateMove(x,y, player);
        if (score > maxScore) {
          maxScore = score;
          maxX = x;
          maxY = y;
          if (score ===1) return{maxScore,maxX,maxY};
        }
      }
    } 
    if (maxScore == -Number.MAX_VALUE) maxScore = 0;
    return {maxScore,maxX,maxY };
  },
  simulateMove(x,y,player) {
    if(this.isWin(x,y, player))
      return { maxScore: 1, maxX: x, maxY: y};

    this.board[x][y] = player;
    const {maxScore,maxX,maxY} = this.findBestMove(player == 'o'? 'x': 'o')
    this.board[x][y] = ' ';
    return {maxX, maxY, maxScore: -maxScore}
  },
  isWin(x,y, player) {
    const previous = this.board[x][y];
    this.board[x][y] = player;

    if (this.winHorizontal(y, player)){
      this.board[x][y] = previous;
      return true;
    }

    if (this.winVertical(x, player)){
      this.board[x][y] = previous;
      return true;
    }
    if (this.winDiagnalL(player)){
      this.board[x][y] = previous;
      return true;
    }

    if (this.winDiagnalR(player)){
      this.board[x][y] = previous;
      return true;
    }


    this.board[x][y] = previous;
    return false;
  },
  winHorizontal(y,player){
    for(let x = 0; x < 3; x++)
      if (this.board[x][y] != player)
        return false;
    return true;
  },
  winVertical(x,player){
    for(let y = 0; y < 3; y++)
      if (this.board[x][y] != player)
        return false;
    return true;
  },
  winDiagnalL(player){
    for(let p = 0; p < 3; p++)
      if (this.board[p][p] != player)
        return false;
    return true;
  },
  winDiagnalR(player){
    for(let p = 0; p < 3; p++)
      if (this.board[2-p][p] != player)
        return false;
    return true;
  },
  boardFull(){
    for (let y = 0; y <3; y++){
      for (let x =0; x <3; x++){
        if (this.board[x][y] === ' ') return false;
      }
    }
    return true;
  },



};
