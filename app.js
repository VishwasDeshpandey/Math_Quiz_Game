let nameSection = document.querySelector(".name-section");
let nameField = document.querySelector("#nameField");
let startGame = document.querySelector("#start");
let rightHeader = document.querySelector(".right-header")
let question = document.querySelector(".question")
let gameArea = document.querySelector(".gameArea");
let optionsDiv = document.querySelector(".right-gameArea");
let QuestionStatus = document.querySelector("#message");
let totalScore = document.querySelector("#score");
let timeLeft = document.querySelector(".timeleft");
let first = document.querySelector(".first");

// when game over this dom properties used
let GameOver = document.querySelector(".GameOver");
let closeIcon = document.querySelector(".closeIcon");
let displayName = document.querySelector(".displayName");
let finalScore = document.querySelector(".finalScore");
let displayStatus = document.querySelector(".displayStatus");
let restartGame = document.querySelector(".restartGame")

// globally declared variables for the complete program..
let userName = "";
let CorrectAnswer = 0;
let OptionIndex = 0;
let updateScore = 0;

// this will start the game for you
startGame.addEventListener('click', () => {
    userName = nameField.value;

    if (userName == "") {
        document.querySelector("#fieldMessage").textContent="please fill your name first"
        nameField.style.borderBottom="1px solid red"
    }else{
        document.querySelector(".left-header").textContent = `Play Quiz as  ${userName}`
        nameField.value="";
        nameSection.style.display="none";

        rightHeader.style.display="flex";
    
        GenrateQuestion();
        gameTimer();
    }
})


// this will genrate a random math question for the user..
function GenrateQuestion(){

    question.style.display="block";


    let n1 = 1 + Math.floor(20 * Math.random());
    let n2 = 1 + Math.floor(20* Math.random());

    CorrectAnswer = n1 * n2;

    question.innerHTML = `${n1} x ${n2}`;

    // Display Options
    DisplayOptions();

}

function DisplayOptions(){
    optionsDiv.style.display="block";

    OptionIndex = 1 + Math.floor(3 * Math.random());

    document.querySelector("#box"+OptionIndex).innerHTML = CorrectAnswer;
    
    // this array will contain all the options
    let Choices = [CorrectAnswer];
    
    let WrongAnswer;

    for (let index = 1; index < 5; index++){
        if (index != OptionIndex) {
            do {
               WrongAnswer = (1 + Math.floor(200*Math.random()));

            } while (Choices.indexOf(WrongAnswer) >-1 );
            document.querySelector("#box"+index).innerHTML=WrongAnswer;
        }
        CheckAns();
    }

    // check the correct answer and display next question else remain on the same question

    function CheckAns() {
        for(let index = 1; index < 5; index++){
           document.getElementById("box"+index).onclick = function () {
            if (this.innerHTML == CorrectAnswer) {
                let status = "correct";
                let bgColor = "green"

                showMessage(status, bgColor);
                updateScore++;
                totalScore.innerHTML = `score ${updateScore}`

                GenrateQuestion();
            }else{
                let status = "wrong"
                let bgColor = "red"
                showMessage(status,bgColor)
            }
           }
        }
    }
}

// based on the output it will display the message of right or wrong answers 
function showMessage(status, bgColor){
    QuestionStatus.innerHTML = status;
    QuestionStatus.style.backgroundColor=bgColor;
    QuestionStatus.style.display="block";

    messageTimer();
}

function messageTimer(){
    setTimeout(() => {
        QuestionStatus.style.display="none";
    }, 1000);
}


function gameTimer(){
    first.style.backgroundColor = "goldenrod";
    let countDownTimer = 60;
    
    let timer = setInterval(() => {
        countDownTimer--;
        timeLeft.innerHTML = `remaining: ${countDownTimer} sec`;

        if(countDownTimer <= 10){
            first.style.backgroundColor = "red";
        }

        if (countDownTimer == 0) {
            clearInterval(timer);
            timeLeft.textContent = "game over!!";
            gameArea.style.visibility = "visible";
            GameOver.style.display = "flex";

            finalScore.textContent = `score: ${updateScore}`;
            if(updateScore >= 15){
                displayName.textContent = `Congratulations: ${userName}`;
                displayStatus.textContent="You Won";
            }else{
                displayName.textContent = `Sorry! ${userName}`;
                displayStatus.textContent="You Lose"
            }

            
            // to again play the game
            restartGame.addEventListener('click', function(){
                gameArea.visibility="visible";
                GameOver.style.display="none";
                updateScore = 0;
                timeLeft.innerHTML = `remaining 00 sec`;
                totalScore.innerHTML = `Score: ${updateScore}`;
                
                gameTimer();
                GenrateQuestion();
            })

        }
    }, 1000);


}