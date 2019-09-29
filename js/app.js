function startGame() {
    createLayout();
    selection();
}

function createLayout(){
    let fragment = document.createDocumentFragment();

    let iconsClassesArray = ["fas fa-anchor", "fas fa-bicycle", "fas fa-paper-plane", "fas fa-car",
                             "fas fa-rocket", "fas fa-shopping-cart", "fas fa-baby-carriage", "fas fa-truck"];

    let cardsArray = [];

    // outer loop to take each iconsClassesArray item.
    for (let i = 0; i < iconsClassesArray.length ; i++) {
        // inner loop that iterate to times, to create 2 divs and 2 icons holders and to put the two identical icons.
        for (let j = 0; j < 2; j++) {
            let card = document.createElement('div');
            card.id = Math.random();
            console.log(card.id);
            card.className = 'card fliiped_card';
            let icon = document.createElement('i');
            icon.className = iconsClassesArray[i];
            card.appendChild(icon);
            cardsArray.push(card);
        }
    }
    // shuffle the array of cards
    cardsArray = shuffle(cardsArray);
    for (const card of cardsArray) {
        fragment.appendChild(card);
    }
    
    // adding the shuffled cards to the card container.
    cardsContainer = document.querySelector('.cards_container');
    cardsContainer.appendChild(fragment);
}

function removeLayout(){
    // remove all cards and re-call createLayout for new game.
    document.querySelector('.cards_container').innerHTML = '';
    createLayout();
}

function shuffle(array) {
    // shuffle function for shuffling the icons classes and return it.
    for (let index = array.length- 1; index > 0; index--) {
        const j = Math.floor(Math.random() * (index + 1));
        [array[index], array[j]] = [array[j], array[index]];
    }
        return array;
}

function selection () {
    selection.startTimer = 0; // static variable to know when to start the game timer.
    let container = document.querySelector('.cards_container');
    let selectNum = 0;
    let array = [];
    container.addEventListener('click', function(eve){

        // the last condition to check if the card is already have been selected as correct card.
        if(eve.target.nodeName === 'DIV' && selectNum < 2 && eve.target.classList.contains('true') === false && eve.target.classList.contains('select') === false){
            // to determine the first time the user select card to start the timer.
            if (selection.startTimer === 0){
                gameTimer()
                selection.startTimer++;
                correctSelection.counter = 0;
            }
            // the process for changing the cards from fliping cards to selected cards with blue highlithing.
            selectNum++;
            eve.target.classList.remove('fliiped_card');
            eve.target.classList.add('select');
            array.push(eve.target.firstElementChild);
        }
        if(selectNum === 2){
            // calling countMoves function to increase the moves counter.
            countMoves();
            // compare between the two selection cards icons classes to check if they equal.
            if(array[0].className.split(' ')[1] === array[1].className.split(' ')[1]){
                // calling the correctSelection function to highlight the cards to green. 
                correctSelection(array, selectNum);
            }else {
                // else, mean it's wrong selection and the function wrongSelection will be called.
                wrongSelection(array, selectNum);
            }
            // reset the selection counter, to identify new two cards selection.
            selectNum = 0; 
        }
    });
}


function wrongSelection(array,selectNum) {
    // when the guess wrong, the cards will change to green based on css classes for 1 seconds and re-fliping the card again.
    for (let index = 0; index < selectNum; index++) {
        let item = array.pop();                     // item = <i> </i> witch is the icon.
        item = item.parentElement;                  // item = <div><i></i></div> which contain the icon.
        item.classList.remove('select');            // remove the blue highlighting.
        item.classList.add('false');                // add the darksalmon highlitghing.
        let timer = setInterval(function(){         // timer to make the wrong color stand for 700 miliseconds.
            item.classList.remove('false');         // remove the darksalmon highlighted after the timer.
            item.classList.add('fliiped_card');     // add the fliiped_card, to reguess.
            clearInterval(timer);                   // stop the timer.
        }, 700);    
        
    }
}

function correctSelection(array, selectNum) {
    // when the guess right, the cards will change to green based on css classes.
     // static variable to check if he win, he will win if the variable become = 8.
    for (let index = 0; index < selectNum; index++) {
        let item = array.pop();
        item = item.parentElement;
        item.classList.remove('select');
        item.classList.add('true');
    }

    correctSelection.counter++;
    console.log(correctSelection.counter);
    if(correctSelection.counter === 8){
        let timer = setInterval(function(){
            // timer to slow down the pop-up wining message.
            winningMessage();
            
            clearInterval(timer);
        },500);
        
    }
    
}

function winningMessage() {
    let time = document.querySelector('.min').innerText + ":" + document.querySelector('.sec').innerText;
    let moves = document.querySelector('.counter').innerText;
    let timerID = gameTimer.ID;
    swal({
        title: "Congratulations!",
        text: "You have win the game\nTime: " + time + ", Moves: " + moves,
        icon: "success",
        buttons: ["No, thanks",'Play Again!'],
        closeOnClickOutside: false
      });
    let playAgain = document.querySelector('.swal-button--confirm');
    playAgain.addEventListener('click', function(){
        location.reload(true);
    });
    
    
    clearInterval(timerID);
}

function countMoves() {
    // counting the moves, 2 selection of cards count ass single move.
    let movesViewer = document.querySelector('.counter');
    let counter = Number(movesViewer.innerText);
    counter++;
    starsGenerator(counter);
    movesViewer.innerText = " " +counter;
}

function starsGenerator(counter) {
    // this method take counter parameter from countMoves() function to perform rating process
    let array = document.querySelectorAll('.fa-star');

    if (counter === 12){
        whichStar(array, 2);
    }else if (counter === 18){
        whichStar(array, 1);
    }else if (counter === 0){
        // to reset the start to default solid stars.
        document.querySelector('.counter').innerText = " " +0;
        solidStars(array);
    }

    function whichStar(array, index) {
        // to change specific star.
        array[index].classList.remove('fas');
        array[index].classList.add('far');
    }
    function solidStars(array) {
        // to change all the stars to solid when replaying the game.
        for (const star of array) {
            star.classList.remove('far');
            star.classList.add('fas');
        }
    }
}

function gameTimer() {
    
    // the timer function represinting the time in minutes and seconds.
        let timerID = setInterval(function() {
        
        let sec = document.querySelector('.sec');
        let min = document.querySelector('.min');
        let secValue = Number(sec.innerText);
        let minValue = Number(min.innerText);
        secValue++;   
        // concatinating process for the time.
        if (secValue < 10){
            sec.innerText = "0" + secValue;
        }if(secValue > 9){
            sec.innerText = secValue;
        }if (secValue === 60){
            minValue++;
            sec.innerText = "00";
        }if (minValue < 10){
            min.innerText = "0" + minValue;
        }if (minValue > 9){
            min.innerText = minValue;
        }
        
    }, 1000);
    
    gameTimer.ID = timerID;
        // send the timer ID to the Replay function to excecute when replay button pressed.
        gameReplay();

}

function gameReplay() {
    // this function responsible for restarting the game (layout, stars, timer).
    let replayButton = document.querySelector('.fa-sync-alt');
    replayButton.addEventListener('click',function (){
        // removing the timer.
        clearInterval(gameTimer.ID )
        // reset the static start timer variable to enable the user to start the game at the first select.
        selection.startTimer = 0;
        document.querySelector('.sec').innerText = '00';
        document.querySelector('.min').innerText = '00';
        // to reset the stars.
        starsGenerator(0);
        removeLayout();
    });
    
    
}

startGame();
