var randomNumber1 = Math.floor( (Math.random() * 6) + 1);

var text="images/dice";
var imgtext =text.concat(randomNumber1,".png");

var dice= (document.getElementsByClassName("img1"))[0];
dice.setAttribute("src", imgtext);
        // dice
var randomNumber2 = Math.floor( (Math.random() * 6)+1);
var imgtext =text.concat(randomNumber2,".png");

var dice2= (document.getElementsByClassName("img2"))[0];
dice2.setAttribute("src", imgtext);

var heading = document.querySelector("h1");
if(randomNumber1>randomNumber2)
{
    heading.innerHTML="player 1 won";
}
else if (randomNumber1<randomNumber2)
{
    heading.innerHTML="player 2 won";
}
else
{
    heading.innerHTML="tie!"
}