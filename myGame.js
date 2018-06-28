var puzzlePieces = [
    {name: '0', img: 'seedOfLife01.png', position: "Indx00", rotationValue: 0},
    {name: '1', img: 'seedOfLife02.png', position: "Indx01", rotationValue: 0},
    {name: '2', img: 'seedOfLife03.png', position: "Indx02", rotationValue: 0}, 
    {name: '3', img: 'seedOfLife04.png', position: "Indx10", rotationValue: 0}, 
    {name: '4', img: 'seedOfLife05.png', position: "Indx12", rotationValue: 0}, 
    {name: '5', img: 'seedOfLife06.png', position: "Indx13", rotationValue: 0}, 
    {name: '6', img: 'seedOfLife07.png', position: "Indx20", rotationValue: 0}, 
    {name: '7', img: 'seedOfLife08.png', position: "Indx21", rotationValue: 0}, 
    {name: '8', img: 'seedOfLife09.png', position: "Indx22", rotationValue: 0}, 

];

var myGame;
console.log(puzzlePieces)
$(document).ready(function(){
    

var Sageom = function(array) {
        this.pieces = array; //getting access to the array
        this.pickedPieces = []; // comparison array
        this.totalClicks = 0;
        // this.shuffleBoard(); // calling the shuffle function
        // this.drawBoard(); // calling the draw board function

    }; //the end of Sageom


Sageom.prototype.drawBoard = function () {
    // this.splitBoard();
    var that  = this;
   
    this.pieces.forEach(function(row, i) {
        row.forEach(function(piece, j){

            console.log($("#Indx" +i+j));
            
            $("#Indx" + i.toString()+j.toString()).html("<img src=images/" + that.pieces[i][j].img + ">");
           

        })

    })
} //the end of drawBoard function


Sageom.prototype.shuffleBoard = function () {
  
    var newBoard =  this.pieces;
  
    for (var i = this.pieces.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = newBoard[i];
        newBoard[i] = newBoard[j];
        newBoard[j] = temp;
    }
    
    this.pieces = newBoard;
    console.log(this.pieces);

}; //end of shuffleBoard

Sageom.prototype.splitBoard = function() {
    var that = this; 
    var splitBoard = [];
    while (that.pieces.length) {
      splitBoard.push(that.pieces.splice(0, 3));
    }
    this.pieces = splitBoard;
  }



Sageom.prototype.checkElement = function (firstClick, secondClick) {
    if(firstClick.attr('name') === (secondClick.attr('name'))) {
      return true;
    }
    return false;
   }; //the end of checkElement



Sageom.prototype.switchPieces = function (pieceToAdd){
    this.totalClicks++;

    myGame.pickedPieces.push(pieceToAdd);
   

    console.log("im clicking on something!   ====================", document.getElementById(pieceToAdd[0].id).getElementsByTagName('img')[0].src);
    console.log("picked pieces  1  !   ====================", myGame.pickedPieces[0][0].getElementsByTagName('img')[0].src);
    console.log("picked pieces  2  !   ====================", myGame.pickedPieces[1][0].getElementsByTagName('img')[0].src);

    // document.getElementById(pieceToAdd[0].id).getElementsByTagName('img')[0].src);
    if (myGame.pickedPieces.length === 2) {
        var result = myGame.checkElement(myGame.pickedPieces[0], myGame.pickedPieces[1])
        var pickedPieceOneSrc = myGame.pickedPieces[0][0].getElementsByTagName('img')[0].src
        var pickedPieceTwoSrc = myGame.pickedPieces[1][0].getElementsByTagName('img')[0].src

        myGame.pickedPieces[0][0].getElementsByTagName('img')[0].src = pickedPieceTwoSrc
        myGame.pickedPieces[1][0].getElementsByTagName('img')[0].src = pickedPieceOneSrc
        if (!result) {
            setTimeout(function() {
                console.log(myGame.pickedPieces[0]);
               
    //switch the position of the pieces by putting the images into respective ids

                myGame.pickedPieces = [];
            }, 500);
        }
        else {
            myGame.pickedPieces = [];

        }
    }

}


document.getElementById("start-button").onclick = function() {
    myGame = new Sageom(puzzlePieces);
    myGame.shuffleBoard();
    myGame.splitBoard();
    myGame.drawBoard();

    $('.row').removeClass('blocked');
    // $('#playBoard').addClass('blocked');
    $('.piece').on('click', function() {
        myGame.switchPieces($(this));
        myGame.drawBoard();
        // myGame.pickedPieces.push($(this));

        
        // document.getElementById('yourimageID').getElementsByTagName('img')[0].src

      }); //end of on-click pieces
  };

}); //end of doc. ready



