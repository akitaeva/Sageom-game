var puzzlePieces = [
    {name: '0', img: 'seedOfLife01.png', position: "00", rotationValue: 0},
    {name: '1', img: 'seedOfLife02.png', position: "01", rotationValue: 0},
    {name: '2', img: 'seedOfLife03.png', position: "02", rotationValue: 0}, 
    {name: '3', img: 'seedOfLife04.png', position: "10", rotationValue: 0}, 
    {name: '4', img: 'seedOfLife05.png', position: "11", rotationValue: 0}, 
    {name: '5', img: 'seedOfLife06.png', position: "12", rotationValue: 0}, 
    {name: '6', img: 'seedOfLife07.png', position: "20", rotationValue: 0}, 
    {name: '7', img: 'seedOfLife08.png', position: "21", rotationValue: 0}, 
    {name: '8', img: 'seedOfLife09.png', position: "22", rotationValue: 0}, 

];

var original = [];
    for (var i = 0; i < puzzlePieces.length; i++){
        original.push(puzzlePieces[i].position);
    }
    console.log("blah: ", original);

var myGame;
$(document).ready(function(){
    

var Sageom = function(array) {
        this.pieces = array; //getting access to the array
        this.pickedPieces = []; // comparison array
        this.totalClicks = 0;


    }; //the end of Sageom


Sageom.prototype.drawBoard = function () {
    var that  = this;
   
    this.pieces.forEach(function(row, i) {
        row.forEach(function(piece, j){
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
    this.splitBoard = [];
    while (that.pieces.length) {
      this.splitBoard.push(that.pieces.splice(0, 3));
    }
    this.pieces = this.splitBoard;
  }



Sageom.prototype.checkElement = function (firstClick, secondClick) {
    if(firstClick.attr('name') === (secondClick.attr('name'))) {
      return true;
    }
    return false;
   }; //the end of checkElement


Sageom.prototype.checkIfCompleted = function() {
    var tempArr = [];
    var that  = this;
   
    this.pieces.forEach(function(row, i) {
        row.forEach(function(piece, j){
            // parseInt("09", 10)
            console.log("j ===== ", piece.position);
            tempArr.push(piece.position); 

        })

    })
    if(JSON.stringify(original)==JSON.stringify(tempArr)){
        $('#myModal').modal('show');
    }



    console.log("tempArr: ", tempArr);
} //the end of checkIfCompleted function


Sageom.prototype.switchPieces = function (pieceToAdd){
    this.totalClicks++;

    myGame.pickedPieces.push(pieceToAdd);
    
    if (myGame.pickedPieces.length === 2) {
        if (this.pickedPieces[0] === this.pickedPieces[1]){
            this.pickedPieces = [];
            return;
        }

        var firstRowNum = this.pickedPieces[0][0];
        var firstColNum = this.pickedPieces[0][1];
        var secondRowNum = this.pickedPieces[1][0];
        var secondColNum = this.pickedPieces[1][1];

        var temp = this.pieces[firstRowNum][firstColNum];
        this.pieces[firstRowNum][firstColNum] = this.pieces[secondRowNum][secondColNum];
        this.pieces[secondRowNum][secondColNum] = temp;
        this.pickedPieces = [];
        this.drawBoard();
        this.checkIfCompleted();
                  
       
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

        console.log( 'this the ID----', $(this)[0].id.substr(1,2)   )
        myGame.switchPieces($(this)[0].id.substr(1,2));
        myGame.drawBoard();


      }); //end of on-click pieces
  };

}); //end of doc. ready



