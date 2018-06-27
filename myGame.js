var puzzlePieces = [
    {name: '1', img: 'seedOfLife01.png', positionIndx: 0, rotationValue: 0},
    {name: '2', img: 'seedOfLife02.png', positionIndx: 1, rotationValue: 0},
    {name: '3', img: 'seedOfLife03.png', positionIndx: 2, rotationValue: 0}, 
    {name: '4', img: 'seedOfLife04.png', positionIndx: 3, rotationValue: 0}, 
    {name: '5', img: 'seedOfLife05.png', positionIndx: 4, rotationValue: 0}, 
    {name: '6', img: 'seedOfLife06.png', positionIndx: 5, rotationValue: 0}, 
    {name: '7', img: 'seedOfLife07.png', positionIndx: 6, rotationValue: 0}, 
    {name: '8', img: 'seedOfLife08.png', positionIndx: 7, rotationValue: 0}, 
    {name: '9', img: 'seedOfLife09.png', positionIndx: 8, rotationValue: 0}, 

];

var myGame;

$(document).ready(function(){
    

var Sageom = function(array) {
        this.pieces = array; //getting access to the array
        var pickedPieces = []; // comparison array
        var totalClicks = 0;
        this.shuffleBoard(this.pieces); // calling the shuffle function
        //assinging correct value for position index of each element
        console.log("pieces before: ", this.pieces);
        

        this.pieces.forEach(function(element, i){
            console.log(element);
            $(element).data("positionIndex", i);
            // var that = this;
            // element.setAttribute("name", i);
            console.log(element);
        });
        console.log(" pieces after: ", this.pieces);
        //displaying each individual picture in the dom
        var html = "";
        this.pieces.forEach(function(pic, index) {
          html += '<div class= "pieces" name ="' + pic.positionIndx + '" id="piece_' + pic.name + '"' ;
          html += ' style="background: url(./images/' + pic.img + '") no-repeat"> ';
          html += "</div>";
          $('#playBoard').html(html);
        }); 
        document.getElementById("playBoard").innerHTML = html;
    }; //end of Sageom


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


Sageom.prototype.checkElement = function (firstClick, secondClick) {
    if(firstClick.attr('name') === (secondClick.attr('name'))) {
      return true;
    }
    return false;
   }




document.getElementById("start-button").onclick = function() {
    myGame = new Sageom(puzzlePieces);
  };


  $('.pieces').on('click', function() {
    totalClicks++;
    var elmntIndex;

    myGame.pickedPieces.push($(this));

    
    // if ( myGame.pickedPieces.length === 2) {
    //     var result = myGame.checkElement(myGame.pickedPieces[0], myGame.pickedPieces[1])
    //     if (!result) {
    //         setTimeout(function() {
    //             //switch position indexes of the elements

    //             myGame.pickedPieces = [];
    //         }, 1000);
    //     }
    //     else {
    //         myGame.pickedPieces = [];

    //     }
   

    // }




  }); //end of on-click pieces



}); //end of doc. ready



