let boton = document.querySelector(".botonTirar");
let numero = document.querySelector( ".numero");
let dado = document.querySelector(".dado");
let girando = false;

function giraDado(){
    if(girando) return;

    dado.classList.add("animDado");
    girando = true;
    let primero = setInterval(()=>{
        numero.innerHTML=Math.floor((Math.random()*6)+1);
    },100)

    setTimeout(()=>{
        clearInterval(primero)
        dado.classList.remove("animDado");
        girando =false;
    },3000)

}

boton.addEventListener("click",(e)=>{
    e.preventDefault();
    giraDado();

});