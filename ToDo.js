let input = document.querySelector('.inputAddThings');
let addBtn = document.querySelector('.addBtn');
let liste = document.querySelector('.things');
let foot = document.querySelector('.foot');
let all = document.querySelector('.todo');
let done = document.querySelector('.done')
let index = 0;

function oneMoreThing(){
    let doTh = document.createElement('div');
    doTh.innerHTML = `<input class="radio${index}" type="radio"><span class="objet"></span>`    
    doTh.classList = 'popup';
    if(input.value !== ''){

        
        redraw(all,'bas','bas');                      
        redraw(foot,'low','low');

        liste.appendChild(doTh);
        doTh.classList.add('popOn');    
    
        if(check(doTh,'objet' )){
            let objet = document.querySelectorAll('.objet'); 
            let lastObjet = objet[objet.length-1];     
            objet.forEach( (x) => {            
                lastObjet.innerHTML = input.value;                     
            })        
        }
    
    
        if(check(doTh,'radio')){

            let radio = document.querySelector(`.radio${index}`);               
            radio.addEventListener('click', function(e){  
                let movement = nextuntil(e.target.parentNode);
                for (let index = 0; index < movement.length; index++) {
                    movement[index].classList.remove('popOn');
                    redraw(movement[index],'low','low');                   
                }     

                redraw(foot,'low','low');    
                redraw(doTh,'popOn','popOff');                                  
                          
                doTh.addEventListener('animationend',function(e){                                  
                    e.target.parentNode.removeChild(e.target)
                })
                
            });                
        }
    
        
        input.value = '';
        input.focus();     
        index++; 
    }
}




function check(node,type){   
    
    let result = false 
    node.childNodes.forEach(element => {
        if ( element.className.includes(type)){            
            result = true;
        } 
    });
    return result
}

function nextuntil(elem){
    let siblings = [];      
    elem = elem.nextElementSibling;
    while(elem){

        if (elem.className === null){
            break;
        }

        siblings.push(elem);
        elem = elem.nextElementSibling;
    }
    return siblings;    
}


function redraw(value,animIn,animOut){
    value.classList.remove(animIn)
    void value.offsetWidth;
    value.classList.add(animOut)

}


addBtn.addEventListener('click',oneMoreThing);
window.addEventListener('keydown',function(e){
    if (e.key === 'Enter'){
        oneMoreThing();
    }
});
done.addEventListener('click',function(){
    let enlever = nextuntil(liste.childNodes[0]);
    enlever.push(liste.childNodes[0]);
    for (let index = 0; index < enlever.length; index++) {
        liste.removeChild(enlever[index]);        
    }
})