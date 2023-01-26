var buttonColors = ["red", "blue", "green", "yellow"];

var gamePAttern = [];
var userClickedPattern = [];

var level = 0;

var started = false;

$(document).keypress(function(){
    $("h1").text("levle "+level);
    nextSequence();  
    started = true;
})

function startOver(){       //SETS ALL VALUE TO NULL WHEN THE PLAYER LOOSES
    level = 0;
    gamePAttern = [];
    userClickedPattern = [];
    started = false;

}

function checkAnswer(level)
{
    console.log("gamePAttern: "+gamePAttern +"\nuserClicked: "+ userClickedPattern);
    console.log("level: " + level);

    if (gamePAttern[level] === userClickedPattern[level]) {     //checks if user input is correct
        console.log("success!!!!");

        if (userClickedPattern.length === gamePAttern.length)   // checks if the user array is long enough
        {
            console.log(userClickedPattern.length +","+ gamePAttern.length)   
            setTimeout(function(){
                nextSequence();
                userClickedPattern=[];
            },1000);
        }
    }

    else{
        console.log("wrong");
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();

        $("h1").text("Game Over, Press Any Key to Restart");

        $("body").addClass("game-over");            //makes background red
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        startOver()
    }
}


function nextSequence()
{
    level++;
    $("h1").text("level "+level);

    var randomnumber = Math.floor( Math.random()*4 );

    var randomChosenColor = buttonColors[randomnumber];
    gamePAttern.push(randomChosenColor);    //stores the selected pattern   

    $("#"+randomChosenColor).fadeOut(50).fadeIn(50);    // adds flash animation to the selected button
    playSound(buttonColors[randomnumber]);              //plays sound 
    animatePress("#"+randomChosenColor);
}

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");      //gets id of user click
    userClickedPattern.push(userChosenColor);  //stores id of user click

    playSound(userChosenColor);        //sound
    $(this).fadeOut(50).fadeIn(50);    //animation
    animatePress("#"+userChosenColor); //css animatoin

    checkAnswer(userClickedPattern.length-1);
});



function playSound(id){
    var soundname = "sounds/"+id+".mp3";
    var audio = new Audio(soundname);
    audio.play();
}

function animatePress(currentColour){
    $(currentColour).addClass("pressed");
    
    setTimeout(function(){
        $(currentColour).removeClass("pressed");
    }, 100);
}


