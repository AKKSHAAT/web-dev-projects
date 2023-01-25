// gets hold of the drum html button
let btn = document.getElementsByClassName("drum");

// sets click event to every button
for (let i = 0; i <= 6; i++) {
  btn[i].addEventListener("click", handelClick);
}

// makes sound when clicked
function handelClick() {
  var btnPressInner = this.innerHTML;
  buttonAnimator(btnPressInner);
  sound(btnPressInner);
}

// sets keydown event to the whole page ,the function passed in makes sound if the write key is pressed
document.addEventListener("keydown", function (event) {
  buttonAnimator(event.key);
  sound(event.key);
});

function sound(key) {
  switch (key) {
    case "w":
      var tom1 = new Audio("sounds/tom-1.mp3");
      tom1.play();
      break;

    case "a":
      var tom2 = new Audio("sounds/tom-2.mp3");
      tom2.play();
      break;

    case "s":
      var tom3 = new Audio("sounds/tom-3.mp3");
      tom3.play();
      break;

    case "d":
      var tom4 = new Audio("sounds/tom-4.mp3");
      tom4.play();
      break;

    case "j":
      var crash = new Audio("sounds/crash.mp3");
      crash.play();
      break;

    case "k":
      var kickBase = new Audio("sounds/kick-bass.mp3");
      kickBase.play();

      break;

    case "l":
      var snare = new Audio("sounds/snare.mp3");
      snare.play();
      break;

    default:
      console.log(key);
  }
}

// animates button press
function buttonAnimator(currentKey) 
{
  var btnactive = document.querySelector("." + currentKey);
  btnactive.classList.add("pressed");

  setTimeout(function(){
    btnactive.classList.remove("pressed");}, 150);
}
