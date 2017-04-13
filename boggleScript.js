var dice = [
    "FAAETG",
    "AKEWYL",
    "AFFWRG",
    "KOCYIB",
    "OLJTOE",
    "FTHNUN",
    "ITPFKE",
    "AEGGKI",
    "LORVMS",
    "OWSZHA",
    "CEJOPT",
    "OWBUOM",
    "VXVDWZ",
    "LCOELF",
    "QVHTJK",
    "YSTMFH",
    "DRLSET",
    "EPTSOP",
    "EPTSIY",
    "EJVALC",
    "FJSVBY",
    "GLXNVN",
    "PTZMRY",
    "NBSLDH",
    "DGOCLX"
];
// variable for total points
var totalPoints = 0;
var totalPointHolder = document.querySelector('#total-points');

// get the entire dice grid
var diceGrid = document.querySelector('.dice');

// empty var for current word
var currentWord = [];

// table reference
var table = document.querySelector('#score-table');

// var for the submit button
var submitBtn = document.querySelector('#submit-btn');
var clearBtn = document.querySelector('#clear-btn')
// get HTML buttons for placement
var allDie = document.querySelectorAll('.dice button');

// get div for current word display
var showCurrentWord = document.querySelector('#current-word');

// build random dice generator
(function randomizer(){
     for( var i=0; i < dice.length; i++){
          // get each die
          var currentDie = dice[i].split('');
          // random die side
          var diceRoll = Math.floor(Math.random() * 6);
          // set die innerHTML to current charactor
          allDie[i].innerHTML = currentDie[diceRoll];
     };
}());

// toggle class and add current letter to word
function selectDie() {
   // toggle selected class for letters
   if(!this.classList.contains('selected')){
       // push letter to array
       this.setAttribute("class","selected");
       currentWord.push(this.innerHTML);
   }else{
       // function to search for already selected letter and remove it
       for(var i = currentWord.length; i >= 0; i--) {
           if(currentWord[i] === this.innerHTML) {
               // unselect button css
               this.removeAttribute("class","selected");
               // remove item
               currentWord.splice(i, 1);
           }
       }
   }
   var wordDisplay = currentWord.join('');
   showCurrentWord.innerHTML = wordDisplay;
}

// apply click event for selection
for (var i = 0; i < allDie.length; i++) {
    allDie[i].addEventListener('click', selectDie);
}
//resets game
function resetGame() {

}
// reset word after submit
function resetWord() {
   var row = table.insertRow(1);
   var cell1 = row.insertCell(0);
   var cell2 = row.insertCell(1);
   cell1.innerHTML = currentWord.join('');
   cell2.innerHTML = points;
   totalPointHolder.innerHTML = totalPoints;

   currentWord = [];
   showCurrentWord.innerHTML = '';
   for(var i = 0; i < allDie.length; i++) {
       allDie[i].removeAttribute("class", "selected");
   }
};

//clear choices
function clearWord() {
  currentWord = [];
  showCurrentWord.innerHTML = '';
  for(var i = 0; i < allDie.length; i++) {
      allDie[i].removeAttribute("class", "selected");
    }
};



// add points
function addPoints() {
     var x = currentWord.length;
     switch(true){
          case (x < 3):
               alert('Your word must be more at least 3 charactors!');
               break;
          case (x > 2):
               points = x * 9;
               totalPoints += points;
               break;
          default:
               points = 0;
     }
     if(currentWord.length > 2){
          resetWord();
     }
};


clearBtn.addEventListener('click', clearWord);

submitBtn.addEventListener('click', addPoints);
