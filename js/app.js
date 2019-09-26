
function selection () {

    let container = document.querySelector('.cards_container');
    let selectNum = 0;
    let array = [];
    container.addEventListener('click', function(eve){
        
        if(eve.target.nodeName === 'DIV' && selectNum < 2){
            selectNum++;
            eve.target.classList.remove('fliiped_card');
            eve.target.classList.add('select');
            array.push(eve.target.firstElementChild);
        }
        if(selectNum === 2){
            countMoves();
            if(array[0].className.split(' ')[1] === array[1].className.split(' ')[1]){
                correctSelection(array, selectNum);
            }else {
                wrongSelection(array, selectNum);
            }selectNum = 0; 
        }
    });
}

function wrongSelection(array,selectNum) {
    for (let index = 0; index < selectNum; index++) {
        let item = array.pop();
        item = item.parentElement;
        item.classList.remove('select');
        item.classList.add('false');
        let timer = setInterval(function(){
            item.classList.remove('false');
            item.classList.add('fliiped_card');
            clearInterval(timer);
        }, 700);
        
    }
}

function correctSelection(array, selectNum) {
    for (let index = 0; index < selectNum; index++) {
        let item = array.pop();
        item = item.parentElement;
        item.classList.remove('select');
        item.classList.add('true');
    }
}

function countMoves() {
    let movesViewer = document.querySelector('.counter');
    let counter = Number(movesViewer.innerText);
    counter++;
    movesViewer.innerText = ` ${counter}`;

    
        
}

selection();
