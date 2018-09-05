var puzzlePieces = [  //array of images
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

// var puzzlePieces = puzzles[Math.floor(Math.random()*puzzles.length)];
// console.log("the picked set of puzzles ", puzzlePieces);
var original = [];
for (var i = 0; i < puzzlePieces.length; i++) {
        original.push(puzzlePieces[i].position);
    }
    console.log(puzzlePieces, "the original array: ", original);

var myGame;



$(document).ready(function(){
    

    var Sageom = function(array) {
            this.pieces = array;    //getting access to the array
            this.pickedPieces = []; // comparison array
            this.totalClicks = 0;   //measure for win/lose 


        }; //the end of Sageom


    Sageom.prototype.drawBoard = function () {   //displaying the board after the start and each move
        var that  = this;
    
        this.pieces.forEach(function(row, i) {
            row.forEach(function(piece, j){
                $("#I" + i.toString()+j.toString()).html("<img src=Images/" + that.pieces[i][j].img + " id=" + that.pieces[i][j].position + ">");
            })

        })
    } //the end of drawBoard function


    Sageom.prototype.shuffleBoard = function () {  //shuffling the original array
    
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



    Sageom.prototype.checkElement = function (firstClick, secondClick) { // checking if the tile is double-clicked
        if(firstClick.attr('name') === (secondClick.attr('name'))) {
        return true;
        }
        return false;
    }; //the end of checkElement


    Sageom.prototype.checkIfCompleted = function() {
        var tempArr = [];
    
        this.pieces.forEach(function(row, i) {
            row.forEach(function(piece, j){
                tempArr.push(piece.position); 

            })

        })
        if(JSON.stringify(original)==JSON.stringify(tempArr)){
            $('#winModal').modal('show');
            setTimeout(function() {

                location.reload();
            }, 2000)
            // $('.row').addClass('blocked');
        }


        console.log("tempArr: ", tempArr);
    } //the end of checkIfCompleted function


    Sageom.prototype.switchPieces = function (pieceToAdd){  //function to switch puzzle tiles
        this.totalClicks++;
        $("#clicksLeft").html(25-this.totalClicks);

        if (this.totalClicks<=25) {
            myGame.pickedPieces.push(pieceToAdd);
            
            if (myGame.pickedPieces.length === 2) {
                if (this.pickedPieces[0] === this.pickedPieces[1]){  // !!!place to add the rotation logic
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
                $(".piece").removeClass("picked");          
            
            }

        }
        else {
            $('#loseModal').modal('show');
            setTimeout(function() {

                location.reload();
            }, 2000)

        }

}


document.getElementById("start-button").onclick = function() {
        $(this).hide();
        myGame = new Sageom(puzzlePieces);
        myGame.shuffleBoard();
        myGame.splitBoard();
        myGame.drawBoard();
        $("#puzzleInfo").html("<img src=Images/seedoflifebl.png> <p> The Seed of Life is a universal symbol of creation found at the heart of an ancient pattern called the Flower of Life. <br> <br> The Seed of Life is formed from a relationship of 6 circles around one. In fact, 6 circles will ALWAYS fit exactly around a 7th circle of the same size. Each circle fits into this pattern like a lock and key, forming a dynamic field of possible geometric relationships which reveal the most fundamental shapes of creation. It forms a foundation upon which the infinite, fractal nature of life can be understood.</p>");
        $('.row').removeClass('blocked');
        $('piece').removeClass('unbordered');
        // $('#playBoard').addClass('blocked');
        $('.piece').on('click', function() {
            $(this).toggleClass("picked");
            myGame.switchPieces($(this)[0].id.substr(1,2));
            myGame.drawBoard();

      }); //end of on-click pieces
  };

}); //end of doc. ready



