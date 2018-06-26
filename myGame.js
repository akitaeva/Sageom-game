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
// var myCanvas = document.getElementById('theCanvas');
// var ctx = myCanvas.getContext('2d');
// console.log(myCanvas)
// var myGame = new Sageom(puzzlePieces);
var myGame;
// myGame.shuffleBoard();


$(document).ready(function(){




var Sageom  = function (array) {
    this.pieces = array;

  }; //end of Sageom

// calling sageom cf
  Sageom(puzzlePieces)

var placePuzzlePieces = function() {
    this.pieces.forEach(function (){

    }


)

}; //end of placePuzzlePieces

Sageom.prototype.shuffleBoard = function () {
  
    var newBoard =  this.pieces;
  

    for (var i = this.pieces.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = newBoard[i];
        newBoard[i] = newBoard[j];
        newBoard[j] = temp;
    }
    
    this.pieces = newBoard;
    console.log(this.pieces)


}; //end of shuffleBoard


document.getElementById("start-button").onclick = function() {
    myGame = new Sageom(puzzlePieces);
    myGame.shuffleBoard(puzzlePieces);
    
 
    
  };


});



