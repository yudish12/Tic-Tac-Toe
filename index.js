
let ting = new Audio("./ting.mp3");
let gameover = new Audio("./sfx-defeat6.mp3");
let turn = "X";
let isgameover = false;
//funtion for next turn
const changeTurn = ()=>{
    return turn === "X"?"O": "X"
}

const drawfunc = ()=>{
    let empty = 0;
    let boxtext = document.getElementsByClassName("text");
    for(let i=0;i<boxtext.length;i++){
        
        if(boxtext[i].innerText!=""){
            empty++;
        }
    }
    return empty;
}

//function to check win
const check = ()=>{
    let boxtext = document.getElementsByClassName("text");
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
]

wins.forEach(e=>{
    if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "") ){
        document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won"
        gameover.play();
      isgameover = true;
      document.getElementsByTagName('img')[0].style.width = ("200px");
      document.getElementsByTagName('img')[0].style.height = ("200px");
      const line = document.getElementsByClassName("line");
      line[0].style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`
      line[0].style.width = "30vw";
      line[0].style.height = "3px";
    }
    //check for draw
    const x = drawfunc();
    if(x==9){
        document.querySelector('.info').innerText = "Match Draw"
        gameover.play();
      isgameover = true;
      document.getElementsByTagName('img')[0].style.width = ("200px");
      document.getElementsByTagName('img')[0].style.height = ("200px");
    }
})
}

//Logic
let box = document.getElementsByClassName("box");
Array.from(box).forEach(elem=>{
    let boxtxt = elem.querySelector(".text");
    elem.addEventListener("click",()=>{
        if(boxtxt.innerHTML===''){
            boxtxt.innerHTML = turn;
            turn = changeTurn();
            ting.play();
            check();
            if(!isgameover){
                document.getElementsByClassName("info")[0].innerHTML = `Turn for ${turn}`;
            }

        }
    })
})
const reset = document.getElementById("reset");
reset.addEventListener("click",()=>{
let boxtexts = document.querySelectorAll('.text');
Array.from(boxtexts).forEach(elememt=>{
    elememt.innerText = ""
});
turn = "X";
document.getElementsByTagName('img')[0].style.width = ("0px");
      document.getElementsByTagName('img')[0].style.height = ("0px");
      const line = document.getElementsByClassName("line");
      line[0].style.height = "0";
      turn = "X";
      document.querySelector('.info').innerText = "Turn for X"
})