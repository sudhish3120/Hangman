


// the game should be compatible (easy to change) any number of word within the categories. categories are fixed, however.
const numOfCategories=5;
var cities, celebrities, movies, athletes, superheroes;
cities=["tokyo","delhi","new york", "shangai", "san francisco"];
celebrities=["daniel radcliffe","dwayne johnson", "hugh jackman", "scarlett johansson", "jim carrey"];
movies=["guardians of the galaxy","thor ragnarok","the imitation game","the martian","how to train your dragon"];
athletes=["roger federer","christiano ronaldo","usain bolt","michael phelps","sachin tendulkar"];
superheroes=["iron man","ant man","black panther","hulk","batman"];

var categories = [cities,celebrities,movies,athletes,superheroes];

//pick a random category and store it in a variable
var randCategoryIndex=Math.floor(Math.random()*5);
//picking a random word from the selected category
var randWordIndex=Math.floor(Math.random()*((categories[randCategoryIndex]).length));
//this string is going to appear as blanks at first then the user will find this word
var selectedString=(categories[randCategoryIndex])[randWordIndex];



//////////////WHEN RELOAD OR PLAY AGAIN IS PRESSED - INITIAL SETTINGS//////////////

//When reloading the page or pressing play again, the chosen category should appear and the dashes
//below should change to represent the number of letters in the word.
if (randCategoryIndex===0){
  var chosenTopic="cities";
  displayTopicAndShowDashes(chosenTopic);
}else if(randCategoryIndex===1) {
  var chosenTopic="celebrities";
  displayTopicAndShowDashes(chosenTopic);
}else if(randCategoryIndex===2){
  var chosenTopic="movies";
  displayTopicAndShowDashes(chosenTopic);
}else if(randCategoryIndex===3){
  var chosenTopic="athletes";
  displayTopicAndShowDashes(chosenTopic);
}else if(randCategoryIndex===4){
  var chosenTopic="superheroes";
  displayTopicAndShowDashes(chosenTopic);
}


//////////////BUTTON REACTIONS & GAMEPLAY//////////////
// 1. if the letter is in the word, then a correct sound should be played and the letter should appear above the dashes
// 2. if the wrong letter is pressed, then a wrong sound should be played and the screen should turn red. the number of lives
//should be reduced to one less.
var livesLeft=10;
//add event listeners to all keys for clicks
$(".alphabet-buttons button").click(function(){

  var clickedKey=this.innerHTML;
  var clickedLetter = clickedKey.toLowerCase();
//if the clicked key is already found, then the wrong sound should be played
var dashedString=document.querySelector(".gameplay .dashes").innerHTML;
var letterAlreadyFound=false;

for (var i=0;i<selectedString.length;i++){
  if (clickedLetter===dashedString.charAt(i)){
    letterAlreadyFound=true;
    break;
  }
}


  if (livesLeft===1){
    setInterval(function(){

      $("body").addClass("wrongLetter");

      setTimeout(function(){
        $("body").removeClass("wrongLetter");
      },500);

    },1000);

    setTimeout(function(){
      var gameOver=new Audio("sounds/gameOver.mp3");
      gameOver.play();
    },500);

    $(".alphabet-buttons button").off("click");
    document.querySelector(".alphabet-buttons").innerHTML="<h1 class='youLose'>YOU LOSE!</h1>";
    $(".alphabet-buttons h1").animate({width:"100%"});
    $(".alphabet-buttons h1").animate({fontSize:"7rem"});
  }

  $(".playAgain").click(function(){
    window.location.reload();
  });


  //run a for loop to see if any letters of the selectedString matches the button pressed
  var i;
  var isLetterInString=false;
  for (i=0;i<(selectedString.length);i++){
    if (clickedLetter===selectedString[i]){
      isLetterInString=true;
      break;
    }
  }

  if (isLetterInString===true) {
    //there is atleast one instance where the button pressed matches the letters of the string
    var dashedString=document.querySelector(".dashes").innerHTML;
    replaceAllInstancesOfLetter(dashedString, clickedLetter);
    if (letterAlreadyFound===true){
      var wrongAnswer=new Audio("sounds/wrongAnswer.mp3")
      wrongAnswer.play();
      $("body").addClass("wrongLetter");
      setTimeout(function(){
        $("body").removeClass("wrongLetter");
      },200)
    } else{
      var correctAnswer=new Audio("sounds/correctAnswer.mp3")
      correctAnswer.play();
    }


    //checking if the word was found
    var wordFound=false;
    var dashesMid=document.querySelector(".dashes").innerHTML;
    for(var i=0;i<(dashesMid.length);i++){
      if (dashesMid.charAt(i)==="_"){
        wordFound=false;
        break;
      }else {
        wordFound=true;
      }
    }

    if (wordFound===true){

      setTimeout(function(){
        var gameWon=new Audio("sounds/gameWon.mp3")
        gameWon.play();
      },500);


      //replace the keys with :"youWin"
      $(".alphabet-buttons").html("");
      document.querySelector(".alphabet-buttons").innerHTML="<h1 class='youWin'>YOU WIN!</h1>";
      $(".alphabet-buttons h1").animate({width:"100%"});
      $(".alphabet-buttons h1").animate({fontSize:"7rem"});
      $(".alphabet-buttons button").off("click");

      setInterval(function(){
        $(".alphabet-buttons h1").addClass("youWinStyle");
        setTimeout(function(){
          $(".alphabet-buttons h1").removeClass("youWinStyle");
        },500);
      },1000);
    }

  } else {
    //reduce a life
    $("body").addClass("wrongLetter");
    setTimeout(function(){
      $("body").removeClass("wrongLetter");
    },200)
    this.classList.add("btnClicked");
    var wrongAnswer=new Audio("sounds/wrongAnswer.mp3")
    wrongAnswer.play();

    livesLeft--;
    $(".gameplay .lives").html("You have "+livesLeft+" lives");
  }


});




















//WHEN THE WORD IS FOUND, CERTAIN EFFECTS WOULD BE IN PLACE
//WHEN THERE ARE 0 CLUES, CERTAIN EFFECTS WOULD BE IN PLACE
// Extra: all keys should be pressable from the keyboard and they should react in the same way as clicking them

function replaceAllInstancesOfLetter(dashedString, clickedLetter){
  //traverse through each dash of oldDashes and the selectedString at the same time. When
  //the selectedString's character matches with the letter pressed, change the dash to the letter in the selectedString
  var i;
  var newDashedString=dashedString;
  var newDashedArr=newDashedString.split("");
  for(i=0;i<selectedString.length;i++){
    //the length of oldDashes is same as length of selectedString
    if (selectedString.charAt(i)===clickedLetter){
        newDashedArr[i]=selectedString.charAt(i);

    }
  }
  newDashedString=newDashedArr.join("");
  $(".gameplay .dashes").html(newDashedString);
}


function displayTopicAndShowDashes(chosenTopic){
  $(".gameplay .category").append(": "+chosenTopic);

  //using a for loop to display the dashes for the selectedString from the categories
  for(var i=0;i<(selectedString.length);i++){
    if (selectedString.charAt(i)===" "){
      $(".gameplay .dashes").append(" ");
    } else {
      $(".gameplay .dashes").append("_");
    }
  }
}
