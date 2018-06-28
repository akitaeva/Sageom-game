var puzzlePieces = [
    {name: '0', img: 'seedOfLife01.png', position: "Indx00", rotationValue: 0},
    {name: '1', img: 'seedOfLife02.png', position: "Indx01", rotationValue: 0},
    {name: '2', img: 'seedOfLife03.png', position: "Indx02", rotationValue: 0}, 
    {name: '3', img: 'seedOfLife04.png', position: "Indx10", rotationValue: 0}, 
    {name: '4', img: 'seedOfLife05.png', position: "Indx11", rotationValue: 0}, 
    {name: '5', img: 'seedOfLife06.png', position: "Indx12", rotationValue: 0}, 
    {name: '6', img: 'seedOfLife07.png', position: "Indx20", rotationValue: 0}, 
    {name: '7', img: 'seedOfLife08.png', position: "Indx21", rotationValue: 0}, 
    {name: '8', img: 'seedOfLife09.png', position: "Indx22", rotationValue: 0}, 

];

var myGame;
// console.log(puzzlePieces)
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

            // console.log($("#Indx" +i+j));
            
            $("#I" + i.toString()+j.toString()).html("<img src=Images/" + that.pieces[i][j].img + " id=" + that.pieces[i][j].position + ">");
           

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
    // console.log(this.pieces[0]);

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

    // console.log("the pieces shuffled and split  =====", this.pieces)
    // console.log("pieces being added >>>>>>>>", myGame.pickedPieces[0][0].getElementsByTagName('img')[0].id)
    // console.log("pieace to add ?????????????", pieceToAdd[0]);



    
    
    if (myGame.pickedPieces.length === 2) {
        var result = myGame.checkElement(myGame.pickedPieces[0], myGame.pickedPieces[1])
        // var pickedPieceOneId = myGame.pickedPieces[0][0].getElementsByTagName('img')[0].id;
        // var pickedPieceTwoId = myGame.pickedPieces[1][0].getElementsByTagName('img')[0].id;
        
        
        if (result) {
            setTimeout(function() {
                tempVar1 = myGame.pickedPieces[0][0].getElementsByTagName('img')[0];
                tempVar2 = myGame.pickedPieces[1][0].getElementsByTagName('img')[0];
                // console.log("the temp var %%%%%%%%%%%%%%%%%%%%%% ", tempVar1)
                console.log("before the for loops ****************", myGame.pickedPieces[0][0])
                for ( var i = 0; i < myGame.pickedPieces.length; i++ ) {
                    console.log("first for loop @@@@@@@@@@@@@@@@@@", myGame.pickedPieces.length)
            
                    for ( var j = 0; j = myGame.pickedPieces.length; j++ ) {
                        console.log("puzzle piece array in 2 for loops [][][][][][][][][][][][][]", myGame.pickedPieces[i][j])
            
                        if ( myGame.pickedPieces[i][j].id === tempVar1.id ){
                            console.log("this is the 1st if >>>>", myGame.pickedPieces[i][j].getElementsByTagName('img')[0])
                            myGame.pickedPieces[i][j].getElementsByTagName('img')[0].src = tempVar2.src
                        }
                        if ( myGame.pickedPieces[i][j].id === tempVar2.id ) {
                            console.log("this is the 2nd if =====", myGame.pickedPieces[i][j].getElementsByTagName('img')[0])
                            myGame.pickedPieces[i][j].getElementsByTagName('img')[0].src = tempVar1.src
                        }
                    }
                }
                // console.log(myGame.pickedPieces[0]);
                console.log("picked one  __________________", tempVar1)
                console.log("picked two --------------------", tempVar2)
                // indexOf(this.pieces)


                myGame.pickedPieces = [];
            }, 50);
        }
        else {
            myGame.pickedPieces = [];

        }

        console.log("picked pieces after function >>>>>>>>>>>>>>>>  ",myGame.pickedPieces)
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
        console.log('click event for piece clicked ------------>>>>>>>>>', this);
        myGame.switchPieces($(this));
        myGame.drawBoard();
        // myGame.pickedPieces.push($(this));

        
        // document.getElementById('yourimageID').getElementsByTagName('img')[0].src

      }); //end of on-click pieces
  };

}); //end of doc. ready



