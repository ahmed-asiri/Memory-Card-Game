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
            if(array[0].className.split(' ')[1] === array[1].className.split(' ')[1]){
                for (let index = 0; index < selectNum; index++) {
                    let item = array.pop();
                    item = item.parentElement;
                    item.classList.remove('select');
                    item.classList.add('true');
                }
                
               
            }else {
                for (let index = 0; index < selectNum; index++) {
                    let item = array.pop();
                    item = item.parentElement;
                    item.classList.remove('select');
                    item.classList.add('false');
                    let timer = setInterval(function(){
                        item.classList.remove('false');
                        item.classList.add('fliiped_card');
                        clearInterval(timer);
                    }, 500);
                    
                }
            }selectNum = 0;
            
        }
        
    });
}

selection();