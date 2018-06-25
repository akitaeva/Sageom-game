var puzzlePieces = [
    {img: 'seedOfLife01.png'},
    {img: 'seedOfLife02.png'},
    {img: 'seedOfLife03.png'}, 
    {img: 'seedOfLife04.png'}, 
    {img: 'seedOfLife05.png'}, 
    {img: 'seedOfLife06.png'}, 
    {img: 'seedOfLife07.png'}, 
    {img: 'seedOfLife08.png'}, 
    {img: 'seedOfLife09.png'}, 

]
var myCanvas = document.getElementById('theCanvas');
var ctx = myCanvas.getContext('2d');
var myGame;
// var myGame = new Sageom(puzzlePieces);
// myGame.shuffleBoard();


var Sageom  = function (puzzlePieces) {
    this.pieces = puzzlePieces;

  }; //end of Sageom

var placePuzzlePieces = function() {

}; //end of placePuzzlePieces

Sageom.prototype.shuffleBoard = function () {
    var newBoard = this.pieces;

    for (var i = newBoard.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = newBoard[i];
        newBoard[i] = newBoard[j];
        newBoard[j] = temp;
    }
    
    this.pieces = newBoard;


}; //end of shuffleBoard


document.getElementById("start-button").onclick = function() {
    myGame = new Sageom();
    myGame.shuffleBoard();
    
 
    
  };






